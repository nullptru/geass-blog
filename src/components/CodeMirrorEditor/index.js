import CodeMirror from 'codemirror';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/xml/xml';
import 'codemirror/theme/monokai.css';
import 'codemirror/lib/codemirror.css';

export default class CodeMirrorEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getEditor = this.getEditor.bind(this);
  }

  componentDidMount() {
    const { value, lineNumbers, ...editorProps } = this.props;
    // find the textarea node
    /* eslint-disable */
    const doms = ReactDOM.findDOMNode(this);
    const [dom] = doms.getElementsByTagName('textarea');
    // generator the codemirrorEditor
    this.editor = CodeMirror.fromTextArea(dom, editorProps);
    this.editor.on('change', this.handleChange);
    setTimeout(() => { this.editor.setOption('lineNumbers', lineNumbers)}, 0); // 直接设置会导致奇怪的样式错位
    this.props.getEditor(this.getEditor());
  }

  componentWillReceiveProps(nextProps) {
    console.log('enter')
    if(nextProps.value !== this.props.value) {
      console.log('changeValue')
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(editor) {
    const value = editor.getValue(); // 得到最新值
    if (value !== this.state.value) {
      this.props.onChange(value);
      this.setState({ value });
    }
  }

  /**
   * return editor instantant for custom design
   */
  getEditor() {
    return this.editor;
  }

  render() {
    const {
      style, className,
    } = this.props;
    return (
      <div className="ReactCodeMirror">
        <textarea
          defaultValue={this.props.value}
          autoComplete="off"
          autoFocus={this.props.autoFocus}
        />
      </div>
    );
  }
}


CodeMirrorEditor.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  lineNumbers: PropTypes.bool,
  onChange: PropTypes.func,
  getEditor: PropTypes.func,
};

CodeMirrorEditor.defaultProps = {
  value: '',
  defaultValue: '',
  style: {},
  className: '',
  autoFocus: true,
  lineNumbers: true,
  onChange: () => {},
  getEditor: () => {},
};


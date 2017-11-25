import CodeMirror from 'codemirror';
import React from 'react';
import PropTypes from 'prop-types';

class CodeMirrorEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isControlled: this.props.value != null };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    if (this.editor) {
      if (this.props.value != null) {
        if (this.editor.getValue() !== this.props.value) {
          this.editor.setValue(this.props.value);
        }
      }
    }
  }

  handleChange() {
    if (this.editor) {
      const value = this.editor.getValue();
      if (value !== this.props.value) {
        this.props.onChange({ target: { value } });
        if (this.editor.getValue() !== this.props.value) {
          if (this.state.isControlled) {
            this.editor.setValue(this.props.value);
          } else {
            this.props.value = value;
          }
        }
      }
    }
  }

  editor(node) {
    this.editor = CodeMirror.fromTextArea(node, this.props);
    this.editor.on('change', this.handleChange);
  }

  render() {
    const {
      textAreaStyle, textAreaClass, style, className, ...rest
    } = this.props;
    return (
      <div style={style} className={className}>
        <textarea ref={this.editor} style={textAreaStyle} className={textAreaClass} {...rest} />
      </div>
    );
  }
}


CodeMirrorEditor.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

CodeMirrorEditor.defaultProps = {
  value: '',
  defaultValue: '',
  style: {},
  className: '',
  onChange: () => {},
};


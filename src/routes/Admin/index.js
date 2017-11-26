import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeMirrorEditor from 'components/CodeMirrorEditor';
import HighLight from 'components/HighLight';
import 'themes/index.less';
import styles from './index.less';

class AdminIndex extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorText: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
    };
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange = text => this.setState({ editorText: text });
  render() {
    const props = {
      mode: 'markdown',
      theme: 'monokai',
      onChange: this.onEditorChange,
      value: this.state.editorText,
    };
    return (
      <div>
        <CodeMirrorEditor {...props} />

        <HighLight className={styles.markdownContainer}>
          <ReactMarkdown source={this.state.editorText} escapeHtml={false} />
        </HighLight>
      </div>
    );
  }
}

export default AdminIndex;

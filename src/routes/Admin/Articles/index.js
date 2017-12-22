import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import ReactMarkdown from 'react-markdown';
import Select, { Option } from 'rc-select';
import { createForm } from 'rc-form';
import Upload from 'rc-upload';
import { Input, Icon, HighLight, CodeMirrorEditor } from 'components';
import 'themes/index.less';
import 'rc-select/assets/index.css';
import styles from './index.less';

/* eslint-disable */
class Article extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorText: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
    };
    this.uploaderProps = {
      multiple: true,
      customRequest(upload) {
        /* eslint-disable no-undef */
        const formData = new FormData();
        formData.append('titleImage', upload.file);
        props.dispatch({
          type: 'articles/uploadImage',
          payload: formData,
        });
      },
    };
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange = text => this.setState({ editorText: text });

  onSubmit = () => {
    const { getFieldsValue } = this.props.form;
    const data = {
      ...getFieldsValue(),
      content: this.state.editorText,
    };
    console.log(data);
  }

  getFieldDecorator = (name) => {
    const { getFieldDecorator } = this.props.form;
    return (child) => {
      const input = React.cloneElement(child, { id: name, className: 'col-md-2' });
      return (<div className="row margin-base">
        <label htmlFor={name} className="col-md-1" >{name}:</label>
        {getFieldDecorator(name)(input)}
      </div>);
    };
  }

  render() {
    const markdownProps = {
      mode: 'markdown',
      theme: 'monokai',
      onChange: this.onEditorChange,
      value: this.state.editorText,
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.markdownArticlePanel}>
        <form>
          <div className={styles.articlePanel}>
            {/* common form item */}
            {getFieldDecorator('title')(<Input className={styles.title} />)}
            <div className={styles.toolPanel}>
              <Upload {...this.uploaderProps} className={styles.upload}>
                <Icon type="upload" />
              </Upload>
              <Icon type="save" onClick={this.onSubmit} className={styles.iconBtn} />
              <div className={styles.right}>
                {getFieldDecorator('tags')(<Select multiple className={styles.tagSelect} placeholder="选择所属分类" >
                  <Option value="a" key="a">a</Option>
                  <Option value="b" key="b">b</Option>
                  <Option value="c" key="c">c</Option>
                </Select>)}
              </div>
            </div>
            {getFieldDecorator('abstraction')(<Input className={styles.abstraction} multiple />)}
            {/* markdown */}
            <div className={styles.codePanel}>
              <CodeMirrorEditor {...markdownProps} />

              <HighLight className={styles.markdownContainer}>
                <ReactMarkdown source={this.state.editorText} escapeHtml={false} />
              </HighLight>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Article.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(createForm()(Article));

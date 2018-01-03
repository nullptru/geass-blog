import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import ReactMarkdown from 'react-markdown';
import Select, { Option } from 'rc-select';
import copy from 'copy-to-clipboard';
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
      editorText: props.article.content || '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
    };
    this.uploaderProps = {
      multiple: true,
      customRequest(upload) {
        /* eslint-disable no-undef */
        const formData = new FormData();
        formData.append('avatar', upload.file);
        props.dispatch({
          type: 'articles/uploadImage',
          payload: {
            formData,
            type: 'avatar',
          },
        });
      },
    };
    this.uploaderContentProps = {
      multiple: true,
      customRequest(upload) {
        /* eslint-disable no-undef */
        const formData = new FormData();
        formData.append('gallery', upload.file);
        props.dispatch({
          type: 'articles/uploadImage',
          payload: {
            formData,
            type: 'gallery',
          },
        });
      },
    };
    this.onEditorChange = this.onEditorChange.bind(this);
  }

  onEditorChange = text => this.setState({ editorText: text });

  onSubmit = (status) => {
    const { getFieldsValue } = this.props.form;
    const data = {
      ...getFieldsValue(),
      content: this.state.editorText,
      imageUrl: this.props.updatedTitleImage,
      author: 'Geass',
      status,
    };
    this.props.dispatch({
      type: 'articles/updateArticle',
      payload: { ...data },
    })
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
      lineWrapping: true,
      onChange: this.onEditorChange,
      value: this.state.editorText,
    };
    const { getFieldDecorator } = this.props.form;
    const { updatedTitleImage, articleImages, list, article } = this.props;
    const tagIds = (article.tags || []).map(tag => tag.id);
    return (
      <React.Fragment>
        <div>
          test
        </div>
        <div className={styles.markdownArticlePanel}>
          <form>
            <div className={styles.articlePanel}>
              {/* common form item */}
              {getFieldDecorator('title', { initialValue: article.title })(<Input className={styles.title} />)}
              <div className={styles.toolPanel}>
                <Upload {...this.uploaderProps} className={styles.upload}>
                  <Icon type="upload" />
                </Upload>
                <Icon type="save" onClick={this.onSubmit.bind(this, 0)} className={styles.iconBtn} />
                <Icon type="export" onClick={this.onSubmit.bind(this, 1)} className={styles.iconBtn} />
                <div className={styles.right}>
                  <Upload {...this.uploaderContentProps} className={styles.upload} style={{ marginRight: '4px' }}>
                    <Icon type="upload" /><span>上传文章图片</span>
                  </Upload>
                  {getFieldDecorator('tagIds',  { initialValue: tagIds })(<Select multiple optionLabelProp='children' className={styles.tagSelect} placeholder="选择所属分类" >
                    {list.map(tag =><Option key={tag.id} title={tag.name}>{tag.name}</Option>)}
                  </Select>)}
                </div>
              </div>
              {getFieldDecorator('abstraction', { initialValue: article.title })(<Input className={styles.abstraction} multiple />)}
              <div className={styles.imgPanel}>
                { updatedTitleImage.length > 0 &&
                  <span>标题图片: <img src={updatedTitleImage} alt="标题图片" className={styles.pasterImage} onClick={(i) => copy(i.target.src)} /></span>
                }
                { articleImages.length > 0 && 
                  <span>文章图片: {articleImages.map(img =>
                    <img src={img} alt="文章图片" key={img} className={styles.pasterImage} onClick={(i) => copy(i.target.src)} />)}
                  </span>
                }
              </div>
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
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tags: PropTypes.object,
};

Article.defaultProps = {
  tags: {},
};

export default connect(({ tags: { list }, articles: { updatedTitleImage, articleImages, article } }) =>
({ list, updatedTitleImage, articleImages, article }))(createForm()(Article));

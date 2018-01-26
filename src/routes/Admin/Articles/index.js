import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import ReactMarkdown from 'react-markdown';
import Select, { Option } from 'rc-select';
import copy from 'copy-to-clipboard';
import { createForm } from 'rc-form';
import { throttle } from 'utils';
import Upload from 'rc-upload';
import { Input, Icon, HighLight, CodeMirrorEditor, Dialog } from 'components';
import 'themes/index.less';
import 'rc-select/assets/index.css';
import ArticlesItem from './ArticleListItem';
import { isObjEqual } from '../../../utils';
import styles from './index.less';

class Article extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editorText: props.article.content || '',
      articleId: props.article.id,

      confirmModalVisible: false,
      confirmDeleteModalVisible: false,
      confirmModalSuccess: () => {},
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

    // update token every 5 min;
    this.updateToken = throttle(1000 * 60 * 5, () => {
      this.props.dispatch({
        type: 'login/isLogin',
      });
    });

    this.onEditorChange = this.onEditorChange.bind(this);
    this.querySingle = this.querySingle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    // dialogContainer
    this.dialogContainer = document.getElementById('dialog');
    this.cachedArticleId = undefined;
  }

  onSubmit = (status) => {
    const { getFieldsValue } = this.props.form;
    const data = {
      ...getFieldsValue(),
      id: this.props.article.id,
      content: this.state.editorText,
      imageUrl: this.props.article.imageUrl,
      author: this.props.author,
      status,
    };
    this.props.dispatch({
      type: 'articles/updateArticle',
      payload: { ...data },
    });
  }

  // getFieldDecorator = (name) => {
  //   const { getFieldDecorator } = this.props.form;
  //   return (child) => {
  //     const input = React.cloneElement(child, { id: name, className: 'col-md-2' });
  //     return (<div className="row margin-base">
  //       <label htmlFor={name} className="col-md-1" >{name}:</label>
  //       {getFieldDecorator(name)(input)}
  //     </div>);
  //   };
  // }

  onEditorChange = (text) => {
    // update token
    this.updateToken();
    this.setState({ editorText: text });
  }

  checkEditStatus = () => {
    let isEdit = false;
    const { getFieldsValue } = this.props.form;
    const currentArticle = {
      ...getFieldsValue(),
      content: this.state.editorText,
    };
    const originalArticle = {
      abstraction: this.props.article.abstraction || '',
      title: this.props.article.title || '',
      tagIds: this.props.article.tags ? this.props.article.tags.map(tag => tag.id) : [],
      content: this.props.article.content || '',
    };
    isEdit = !isObjEqual(originalArticle, currentArticle);
    return isEdit;
  }

  listItemSelect = (article) => {
    // confirm if article is edited
    const isEdit = this.checkEditStatus();
    if (!isEdit) {
      this.querySingle(article.id);
    } else {
      this.setState({
        confirmModalVisible: true,
        confirmModalSuccess() {
          this.querySingle(this.cachedArticleId, () => {
            this.setState({ confirmModalVisible: false });
          });
        },
      });
      this.cachedArticleId = article.id;
    }
  }

  querySingle = (id, cb) => {
    this.props.dispatch({
      type: 'articles/querySingleArticleAdmin',
      payload: { id },
    }).then(() => {
      this.props.form.setFieldsValue({
        title: this.props.article.title,
        abstraction: this.props.article.abstraction,
        tagIds: this.props.article.tags.map(tag => tag.id),
      });
      this.setState({ editorText: this.props.article.content, articleId: id });
      if (cb) cb();
    });
  }

  addNewArticle = () => {
    const reset = () => {
      this.props.dispatch({
        type: 'articles/updateState',
        payload: { article: {} },
      });
      this.props.form.setFieldsValue({
        title: '',
        abstraction: '',
        tagIds: [],
      });
    };
    const isEdit = this.checkEditStatus(true);
    if (isEdit) {
      this.setState({
        confirmModalVisible: true,
        confirmModalSuccess() {
          reset();
          this.setState({ editorText: '', articleId: undefined, confirmModalVisible: false });
        },
      });
    } else { // if article isn't edit
      reset();
      this.setState({ editorText: '', articleId: undefined });
    }
  };

  removeArticle = (id) => {
    this.setState({
      confirmDeleteModalVisible: true,
      confirmModalSuccess() {
        this.props.dispatch({
          type: 'articles/removeArticle',
          payload: { id },
        }).then(() => {
          if (!this.props.article.id) {
            this.props.form.setFieldsValue({
              title: '',
              abstraction: '',
              tagIds: [],
            });
          }
          this.setState({ articleId: undefined, editorText: '', confirmDeleteModalVisible: false });
        });
      },
    });
  };

  render() {
    const {
      articleImages, tagList, article, articleList, form: { getFieldDecorator },
    } = this.props;
    const {
      editorText, articleId, confirmModalVisible, confirmDeleteModalVisible, confirmModalSuccess,
    } = this.state;

    const tagIds = (article.tags || []).map(tag => tag.id);
    const markdownProps = {
      mode: 'markdown',
      theme: 'monokai',
      lineWrapping: true,
      onChange: this.onEditorChange,
      value: editorText,
      articleId,
      shouldUpdate(nextProps, props) {
        return ((nextProps.articleId !== props.articleId || (!nextProps.articleId && nextProps.value === '')) && nextProps.value !== props.value);
      },
    };

    const dialogs = [];
    if (confirmModalVisible) {
      dialogs.push(ReactDOM.createPortal(<Dialog
        onConfirm={confirmModalSuccess.bind(this)}
        onCancel={() => this.setState({ confirmModalVisible: false })}
        visible={confirmModalVisible}
        title="警告"
      >
        当前文章已被更改，是否放弃更改离开。
      </Dialog>, this.dialogContainer));
    }

    if (confirmDeleteModalVisible) {
      dialogs.push(ReactDOM.createPortal(<Dialog
        onConfirm={confirmModalSuccess.bind(this)}
        onCancel={() => this.setState({ confirmDeleteModalVisible: false })}
        visible={confirmDeleteModalVisible}
        title="警告"
      >
        确认删除文章
      </Dialog>, this.dialogContainer));
    }

    return (
      <div className={styles.articleAdminContainer}>
        {dialogs}
        {/* article list */}
        <div className={styles.articleList}>
          <div className={styles.addNewArticleContainer} onClick={this.addNewArticle}>
            <Icon type="add" />
          </div>
          {articleList.map(item => (
            <ArticlesItem
              key={item.id}
              article={item}
              onRemove={this.removeArticle.bind(this, item.id)}
              onClick={this.listItemSelect.bind(this, item)}
              className={item.id === article.id ? styles.active : ''}
            />
          ))}
        </div>
        <div className={styles.markdownArticlePanel}>
          <form>
            <div className={styles.articlePanel}>
              {/* common form item */}
              {getFieldDecorator('title', { initialValue: article.title || '' })(<Input className={styles.title} />)}
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
                  {getFieldDecorator('tagIds', { initialValue: tagIds })(<Select multiple optionLabelProp="children" className={styles.tagSelect} placeholder="选择所属分类" >
                    {tagList.map(tag => <Option key={tag.id} title={tag.name}>{tag.name}</Option>)}
                  </Select>)}
                </div>
              </div>
              {getFieldDecorator('abstraction', { initialValue: article.abstraction || '' })(<Input className={styles.abstraction} multiple />)}
              { (article.imageUrl || articleImages.length > 0) && <div className={styles.imgPanel}>
                { article.imageUrl &&
                  <span>标题图片: <img src={article.imageUrl} alt="标题图片" className={styles.pasterImage} onClick={i => copy(i.target.src)} /></span>
                }
                { articleImages.length > 0 &&
                  <span>文章图片: {articleImages.map(img =>
                    <img src={img} alt="文章图片" key={img} className={styles.pasterImage} onClick={i => copy(i.target.src)} />)}
                  </span>
                }
              </div>}
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
      </div>
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

export default connect(({
  tags: { list: tagList },
  login: { author },
  articles: {
    articleImages, article, list: articleList,
  },
}) => ({
  tagList, articleImages, article, articleList, author,
}))(createForm()(Article));

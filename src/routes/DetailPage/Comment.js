import React from 'react';
import { connect } from 'dva';
import { Input, ThrottleButton } from 'components';
import { createForm } from 'rc-form';
import styles from './index.less';

class Comment extends React.PureComponent {
  componentWillMount() {
    const { articleId, dispatch } = this.props;
    dispatch({
      type: 'comments/query',
      payload: {
        articleId,
      },
    });
  }

  handleCommentCreate = () => {
    const { dispatch, form: { validateFields, getFieldsValue, setFieldsValue } } = this.props;
    validateFields((errors) => {
      if (errors) {
        dispatch({
          type: 'comments/updateState',
          payload: {
            createErr: true,
          },
        });
        return;
      }
      dispatch({
        type: 'comments/create',
        payload: {
          ...getFieldsValue(),
        },
      }).then(() => {
        if (!this.props.comments.createErr) {
          setFieldsValue({
            author: '',
            message: '',
          });
        }
      });
    });
  };

  render() {
    const { comments: { list, createErr }, form: { getFieldDecorator } } = this.props;
    const tmp = [{
      id: '1',
      message: 'test1',
      ip: '123.**.**.93',
      commentTime: '2017-12-15',
    }, {
      id: '2',
      message: 'test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2',
      ip: '123.**.**.93',
      commentTime: '2017-12-15',
    }, {
      id: '3',
      message: 'test3',
      ip: '123.**.**.93',
      commentTime: '2017-12-15',
    }];
    const comments = list.length > 0 ? list : tmp;
    return (
      <div className={styles.commentContainer}>
        {comments.length > 0 && (
          <React.Fragment>
            <div className={styles.header}>评论区：</div>
            <div className={styles.list}>
              {comments.map(comment => (
                <section key={comment.id} className={styles.commentItem}>
                  <header>
                    <span className={styles.name}>{comment.ip}</span>
                    <span className={styles.time}>{comment.commentTime}</span>
                  </header>
                  <div className={styles.commentMessage}><span>{comment.message}</span></div>
                </section>
                ))}
            </div>
          </React.Fragment>
        )}
        <div>
          <div className={styles.subHeader}>发表评论：</div>
          {getFieldDecorator('author', {
             rules: [{
               required: true,
               type: 'string',
               message: '请输入您的评论昵称～',
              }],
          })(<Input className={styles.editAuthor} placeholder="你的评论昵称～" />)}
          {getFieldDecorator('message', {
             rules: [{
               required: true,
               type: 'string',
               message: '请不要让我空着哦～',
              }],
          })(<Input multiple className={styles.editComment} />)}
          <ThrottleButton
            ref={(target) => { this.submitBtn = target; }}
            text="发表"
            throttleTime={1000 * 60}
            onClick={this.handleCommentCreate}
            clear={createErr}
          />
        </div>
      </div>
    );
  }
}

export default connect(({ comments }) => ({ comments }))(createForm()(Comment));

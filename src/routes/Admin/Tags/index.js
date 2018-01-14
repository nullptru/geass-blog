import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { Icon, Card, Dialog, Input } from 'components';
import { createForm } from 'rc-form';
import TagCard from './AdminTagCard';
import styles from './index.less';

class TagAdmin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deleteConfirmDialogVisible: false,
      editDialogVisible: false,
      dialogModel: 'create',
      deleteId: undefined,
    };
    /* eslint-disable no-undef */
    this.dialogContainer = document.getElementById('dialog');
  }
  editTag = (type) => {
    const data = this.props.form.getFieldsValue();
    if (type !== 'create') {
      data.id = this.props.tag.id;
    }
    this.props.dispatch({
      type: `tags/${type}`,
      payload: { ...data },
    }).then(() => {
      this.setState({ editDialogVisible: false });
    });
  };

  deleteTag = () => {
    this.props.dispatch({
      type: 'tags/remove',
      payload: { id: this.state.deleteId },
    }).then(() => {
      this.setState({ deleteConfirmDialogVisible: false });
    });
  };

  showAddDialog = () => {
    this.setState({ editDialogVisible: true, dialogModel: 'create' });
    this.props.dispatch({
      type: 'tags/updateState',
      payload: { tag: {} },
    });
  };

  showEditDialog = (tag) => {
    this.setState({ editDialogVisible: true, dialogModel: 'update' });
    this.props.dispatch({
      type: 'tags/updateState',
      payload: { tag },
    });
  };

  showDeleteDialog = (tag) => {
    this.setState({ deleteConfirmDialogVisible: true, deleteId: tag.id });
  };

  render() {
    const { tagList, tag, form: { getFieldDecorator } } = this.props;
    const addTagClassList = [styles.tagCard, styles.addContainer];
    const dialog = [];
    if (this.state.editDialogVisible) {
      dialog.push(ReactDOM.createPortal(<Dialog
        title={this.state.dialogModel === 'create' ? '新增' : '修改'}
        onConfirm={this.editTag.bind(this, this.state.dialogModel)}
        onCancel={() => this.setState({ editDialogVisible: false })}
      >
        <div className={styles.formItem}>
          <label>标签名：</label>
          {getFieldDecorator('name', { initialValue: tag.name })(<Input className={styles.smallImput} />)}
        </div>
        <div className={styles.formItem}>
          <label>标签值：</label>
          {getFieldDecorator('value', { initialValue: tag.value })(<Input className={styles.smallImput} />)}
        </div>
      </Dialog>, this.dialogContainer));
    }

    if (this.state.deleteConfirmDialogVisible) {
      dialog.push(ReactDOM.createPortal(<Dialog
        title="警告"
        onConfirm={this.deleteTag.bind(this, this.state.deleteId)}
        onCancel={() => this.setState({ deleteConfirmDialogVisible: false })}
      >
        确认删除？
      </Dialog>, this.dialogContainer));
    }

    return (
      <div className={styles.tagsContainer}>
        {dialog}
        { tagList.map(item => (<TagCard
          onEdit={this.showEditDialog.bind(this, item)}
          onDelete={this.showDeleteDialog.bind(this, item)}
          key={item.id}
          tag={item}
        />))}
        <Card className={addTagClassList.join(' ')} onClick={this.showAddDialog}>
          <Icon type="plus" />
        </Card>
      </div>
    );
  }
}

export default connect(({ tags: { list: tagList, tag } }) => ({ tagList, tag }))(createForm()(TagAdmin));

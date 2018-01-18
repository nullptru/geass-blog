import React from 'react';
import { Card } from 'components';
import styles from './index.less';

const AdminTagCard = ({ tag, onEdit, onDelete }) => {
  return (
    <Card
      className={styles.tagCard}
      footer={
        <div className={styles.buttonGrp}>
          <a onClick={onEdit}>编辑</a>
          <a onClick={onDelete}>删除</a>
        </div>
      }
    >
      <div className={styles.tagName}>标签名称：{ tag.name }</div>
      <div className={styles.tagValue}>标 签 值：{ tag.value }</div>
    </Card>
  );
};

export default AdminTagCard;

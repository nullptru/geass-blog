import React from 'react';
import { Card } from 'components';
import styles from './index.less';

const AdminTagCard = ({ tag }) => {
  return (
    <Card
      className={styles.tagCard}
      footer={
        <div className={styles.buttonGrp}>
          <button>编辑</button>
          <button>删除</button>
        </div>
      }
    >
      <div className={styles.tagName}>标签名称：{ tag.name }</div>
      <div className={styles.tagValue}>标 签 值：{ tag.value }</div>
    </Card>
  );
};

export default AdminTagCard;

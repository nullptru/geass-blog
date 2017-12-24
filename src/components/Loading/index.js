import React from 'react';
import styles from './index.less';

export default (props) => {
  const { spinning = false } = props;

  return spinning ? (
    <div className={styles.wrap}>
      <div className={styles.spinner}>
        <div className={styles.rect1} />
        <div className={styles.rect2} />
        <div className={styles.rect3} />
        <div className={styles.rect4} />
        <div className={styles.rect5} />
      </div>
    </div>
  ) : <div />;
};

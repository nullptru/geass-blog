import React from 'react';
import styles from 'index.less';

export default ({ article }) => {
  return (
    <div className={styles.listItem}>
      <div>{article.title}</div>
      <div><span>{article.createdTime}</span><span>{article.author}</span></div>
    </div>
  );
};

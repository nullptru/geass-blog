import React from 'react';
import styles from './index.less';

export default ({ article, className, ...props }) => {
  const classList = [styles.listItem].concat(className || '');
  return (
    <div className={classList.join(' ')} {...props}>
      <div className={styles.title}>{article.title}</div>
      <div><span>{article.createdTime}</span><span>{article.author}</span></div>
    </div>
  );
};

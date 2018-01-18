import React from 'react';
import { Icon } from 'components';
import styles from './index.less';

export default ({
  article, className, onRemove, ...props
}) => {
  const classList = [styles.listItem].concat(className || '');
  return (
    <div className={classList.join(' ')} {...props}>
      <div className={styles.itemTitle}>{article.title}</div>
      <div className={styles.remove} onClickCapture={onRemove}><Icon type="delete" /></div>
      <div className={styles.meta}><span>{article.createdTime}</span><span>{article.author}</span></div>
    </div>
  );
};

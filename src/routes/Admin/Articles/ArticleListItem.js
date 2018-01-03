import React from 'react';
import styles from 'index.less';

export default ({ article }) => {
  return (
    <div>
      <div>{article.title}</div>
      <div><span>{article.createdTime}</span><span>{article.author}</span></div>
    </div>
  );
}

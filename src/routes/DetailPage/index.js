import React from 'react';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import styles from './index.less';

const Detail = ({ article }) => {
  const type = article.type || {};
  const tags = article.tags || [];
  return (
    <div className={styles.detailContainer}>
      <article className={styles.detail}>
        <header>
          <div className={styles.title}>{ article.title }</div>
          <div className={styles.meta}>
            <span className={styles.time}>{ article.createdTime }</span>
            <Link className={styles.type} to={`/types/${type.value}`}>{ type.label }</Link>
          </div>
        </header>
        <section className={styles.content}>
          { article.content }
        </section>
        <section className={styles.tags}>
          <i className={`icon iconfont icon-tag ${styles.tagIcon}`} />
          { tags.map(tag =>
            <Link className={styles.tag} key={tag.value} to={`/tags/${tag.value}`}>{ tag.label }</Link>) }
        </section>
      </article>
      <div className={styles.btnGroup}>
        {article.pre ? <Link to={`/article/${article.pre}` || '/'} className={styles.pre}><span>Previous Post</span></Link> : <span className={styles.noMore}>没有更多</span>}
        {article.next ? <Link to={`/article/${article.next}` || '/'} className={styles.next}><span>Next Post</span></Link> : <span className={styles.noMore}>没有更多</span>}
      </div>
    </div>
  );
};

Detail.propTypes = {
  article: PropTypes.object,
};

Detail.defaultProps = {
  article: { type: {}, tags: [] },
};

export default Detail;


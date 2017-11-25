import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './index.less';

const Detail = ({ article }) => {
  return (
    <div>
      <article className={styles.detail}>
        <header>
          <div className={styles.title}>{ article.title }</div>
          <div className={styles.meta}>
            <span className={styles.time}>{ article.createdTime }</span>
            <span className={styles.type}>{ article.type.label }</span>
          </div>
        </header>
        <section className={styles.content}>
          { article.content }
        </section>
        <section className={styles.tags}>
          <i className={`icon iconfont icon-tag ${styles.tag}`} />
          { article.tags.map(tag =>
            <a className={styles.tag} key={tag.value} href="#">{ tag.label }</a>) }
        </section>
      </article>
      <div className={styles.btnGroup}>
        <Link to={article.pre || ''} className={styles.pre}><span>Previous Post</span></Link>
        <Link to={article.next || ''} className={styles.next}><span>Next Post</span></Link>
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


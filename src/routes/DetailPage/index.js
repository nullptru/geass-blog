import React from 'react';
import { Link } from 'dva/router';
import PropTypes from 'prop-types';
import styles from './index.less';

const Detail = ({ article }) => {
  return (
    <div>
      <article className="detail">
        <header>
          <div className={styles.title}>{ article.title }</div>
          <div className={styles.meta}>
            <span className={styles.type}>{ article.type.label }</span>
            <span className={styles.time}>{ article.createdTime }</span>
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
      <div>
        <Link to="">Previous Post</Link>
        <Link to="">Next Post</Link>
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

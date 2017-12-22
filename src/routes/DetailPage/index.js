import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { HighLight, Icon } from 'components';
import styles from './index.less';

class Detail extends React.PureComponent {
  render() {
    const { article } = this.props;
    const tags = article.tags || [];
    return (
      <div className={styles.detailContainer}>
        <article className={styles.detail}>
          <header>
            <div className={styles.title}>{ article.title }</div>
            <div className={styles.meta}>
              <span className={styles.time}>{ article.createdTime }</span>
            </div>
          </header>
          <HighLight className={styles.content}>
            <ReactMarkdown source={article.content} escapeHtml={false} />
          </HighLight>
          {tags && tags.length > 0 && <section className={styles.tags}>
            <Icon type="tags" />
            { tags.map(tag =>
              <Link className={styles.tag} key={tag.id} to={`/tags/${tag.value}`}>{ tag.name }</Link>) }
          </section>}
        </article>
        <div className={styles.btnGroup}>
          {article.pre ? <Link to={`/article/${article.pre.id}` || '/'} className={styles.pre}><span>Previous</span><span className={styles.title}>{article.pre.title}</span></Link> : <span className={styles.noMore}>没有更多</span>}
          {article.next ? <Link to={`/article/${article.next.id}` || '/'} className={styles.next}><span>Next</span><span className={styles.title}>{article.next.title}</span></Link> : <span className={styles.noMore}>没有更多</span>}
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  article: PropTypes.object,
};

Detail.defaultProps = {
  article: { type: {}, tags: [] },
};

export default connect(({ articles: { article } }) => ({ article }))(Detail);

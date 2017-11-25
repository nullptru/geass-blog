import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';
import logo from '../../assets/logo.png';

export default class ArticleItem extends React.PureComponent {
  onClick(articleId) {
    this.props.onClick(articleId);
  }

  render() {
    const { article } = this.props;
    return (
      <section className={`${styles.article}`} onClick={this.onClick.bind(this, article.id)}>
        <header className={styles.headerContainer}>
          <img className={styles.image} src={logo} alt="article" />
          <div className={styles.header}>
            <div>
              <span className={styles.title}>{ article.title }</span>
              <span className={styles.time}>{ article.createdTime }</span>
            </div>
          </div>
        </header>
        <div className={styles.contentContainer}>
          <div className={styles.abstraction}>{ article.abstraction }</div>
          <div className={styles.tags}>
            <i className={`icon iconfont icon-tag ${styles.tag}`} />
            { article.tags.map(tag =>
              <a className={styles.tag} key={tag.value} href="#">{ tag.label }</a>) }
          </div>
        </div>
      </section>
    );
  }
}

ArticleItem.propTypes = {
  article: PropTypes.object,
  onClick: PropTypes.func,
};

ArticleItem.defaultProps = {
  article: {},
  onClick: () => {},
};


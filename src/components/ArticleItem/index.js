import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Icon } from 'components';
import styles from './index.less';
import logo from '../../assets/logo.png';

export default class ArticleItem extends React.PureComponent {
  onClick(articleId) {
    this.props.onClick(articleId);
  }

  render() {
    const { article } = this.props;
    return (
      <section className={`${styles.article}`}>
        <header className={styles.headerContainer} onClick={this.onClick.bind(this, article.id)}>
          <img className={styles.image} src={article.imageUrl ? article.imageUrl : logo} alt="article" />
          <div className={styles.header}>
            <div>
              <span className={styles.title}>{ article.title }</span>
              <span className={styles.time}>{ article.createdTime }</span>
            </div>
          </div>
        </header>
        <div className={styles.abstraction}>{ article.abstraction }</div>
        {article.tags && article.tags.length > 0 && <div className={styles.tags}>
          <Icon type="tags" />
          { article.tags.map(tag =>
            <Link className={styles.tag} key={tag.id} to={`/tags/${tag.value}`}>{ tag.name }</Link>) }
        </div>}
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


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
        <div className="row">
          <header className={`col-md-10 ${styles.header}`}>
            <span className={styles.title}>{ article.title }</span>
            <span className={styles.time}>{ article.createdTime }</span>
          </header>
        </div>
        <div className="row">
          <div className="col-md-8 col-sm-8">
            <div className={styles.abstraction}>{ article.abstraction }</div>
            <div className={styles.tags}>
              <i className={`icon iconfont icon-tag ${styles.tag}`} />
              { article.tags.map(tag =>
                <a className={styles.tag} key={tag.value} href="#">{ tag.label }</a>) }
            </div>
          </div>
          <div className="col-md-4 col-sm-4">
            <img className={styles.roundImage} src={logo} alt="article" />
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


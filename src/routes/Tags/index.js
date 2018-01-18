import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, TypeButton } from 'components';
import styles from './index.less';

class Tags extends React.PureComponent {
  handleArticleClick(id) {
    this.props.dispatch(routerRedux.push({
      pathname: `/article/${id}`,
    }));
  }

  render() {
    const { tags: { list: taglist = [] }, tagsArticles: { tags2Articles } } = this.props;
    return (
      <div className="row">
        <div className="col-md-8 col-sm-12 col-md-push-2">
          <section className={styles.tagsPanel}>
            { taglist.map(item => (
              <TypeButton key={item.value} item={item} to={`#${item.value}`} type="tag" commonLink />
            ))}
          </section>
          { taglist.map((item) => {
            const articles = tags2Articles[item.value] || [];
            return (
              <div id={item.value} key={item.value} className={styles.articlesPanel}>
                <span className={styles.tag}>
                  <Icon type="tag" />
                  <span>{item.name}</span>
                </span>
                {articles.map((article) => {
                  return (
                    <div onClick={this.handleArticleClick.bind(this, article.id)} key={article.id} className={styles.article} >
                      <div className={styles.title}>{article.title}</div>
                      <div>{article.abstraction}</div>
                    </div>
                  );
                })}
              </div>
            );
        })}
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  tags: state.tags,
  tagsArticles: state.tagsArticles,
}))(Tags);

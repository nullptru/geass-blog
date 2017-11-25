import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Article from 'components/ArticleItem';
import Search from 'components/Search';
import Pagination from 'components/Pagination';
import LatestPostCard from './components/LatestPostCard';
import TagsCard from './components/TagsCard';
import styles from './index.less';

const Home = ({ dispatch, articles, tagList }) => {
  const { list, latestPosts, pagination } = articles;

  const onArticleClick = (id) => {
    dispatch(routerRedux.push({
      pathname: `/article/${id}`,
    }));
  };

  return (
    <div className="row">
      <div className="col-md-8 col-sm-12">
        {list.map(article =>
          <Article article={article} key={article.id} onClick={onArticleClick.bind(null, article.id)} />)}
        <Pagination pagination={pagination} />
      </div>
      <div className="col-md-4 col-sm-12">
        <Search withBox />
        <LatestPostCard latestPosts={latestPosts} />
        <TagsCard tags={tagList} />
      </div>
    </div>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  articles: PropTypes.object.isRequired,
  tagList: PropTypes.array,
};

Home.defaultProps = {
  tagList: [],
};

export default connect(({ dispatch, articles, tags: { list: tagList } }) =>
  ({ dispatch, articles, tagList }))(Home);

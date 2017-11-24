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

const Home = ({ dispatch }) => {
  const pagination = {
    current: 1,
    total: 51,
    pageSize: 10,
  };

  const onArticleClick = () => {
    dispatch(routerRedux.push({
      pathname: '/article/test',
    }));
  };

  return (
    <div className="row">
      <div className={`col-md-8 col-sm-12 ${styles.colLt8}`}>
        {[1, 2, 3, 4, 5].map(i =>
          <Article article={article} key={i} onClick={onArticleClick} />)}
        <Pagination pagination={pagination} />
      </div>
      <div className="col-md-4 col-sm-12">
        <Search withBox />
        <LatestPostCard latestPosts={latestPosts} />
        <TagsCard tags={tags} />
      </div>
    </div>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ dispatch }) => ({ dispatch }))(Home);

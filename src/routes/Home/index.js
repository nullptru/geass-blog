import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Article from 'components/ArticleItem';
import { Search, Pagination } from 'components';
import LatestPostCard from './components/LatestPostCard';
import TagsCard from './components/TagsCard';
import './index.less';

const Home = ({
  dispatch, articles, tagList,
}) => {
  const { list, latestPosts, pagination } = articles;

  const onArticleClick = (id) => {
    dispatch(routerRedux.push({
      pathname: `/article/${id}`,
    }));
  };

  const onSearch = (query) => {
    dispatch(routerRedux.push({
      pathname: '/',
      search: `search=${query}`,
    }));
  };

  // const getTypeButtons = () => {
  //   const typeBtns = [{
  //     text: '所有',
  //     to: '/',
  //   }, {
  //     text: '充电站',
  //     to: '/type/charging',
  //   }, {
  //     text: '储藏室',
  //     to: '/type/storeroom',
  //   }, {
  //     text: '心情随想',
  //     to: '/type/motions',
  //   }];
  //   const dom = typeBtns.map(btn => <TypeButton key={btn.to} text={btn.text} to={btn.to} type={btn.to === location.pathname ? 'active' : ''} />);
  //   return dom;
  // };
  return (
    <div>
      {/* <div className="center">
        {getTypeButtons()}
      </div> */}
      <div className="row">
        <div className="col-md-8 col-sm-12">
          {list.map(article =>
            <Article article={article} key={article.id} onClick={onArticleClick.bind(null, article.id)} />)}
          <Pagination pagination={pagination} />
        </div>
        <div className="col-md-4 col-sm-12">
          <Search withBox onSearch={onSearch} />
          <LatestPostCard latestPosts={latestPosts} />
          <TagsCard tags={tagList} />
        </div>
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

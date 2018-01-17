import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import queryString from 'query-string';
import Article from 'components/ArticleItem';
import { Search, Pagination, Loading } from 'components';
import LatestPostCard from './components/LatestPostCard';
import TagsCard from './components/TagsCard';
import './index.less';

/* eslint-disable no-extra-boolean-cast */
const Home = ({
  dispatch, articles, tagList, location, loading,
}) => {
  const { list, latestPosts, pagination } = articles;
  const queryParams = queryString.parse(location.search);

  const onArticleClick = (id) => {
    dispatch(routerRedux.push({
      pathname: `/article/${id}`,
    }));
  };

  const onSearch = (query) => {
    let searchStr = '';
    if (!!query) {
      searchStr = `search=${query}`;
    }
    dispatch(routerRedux.push({
      pathname: '/',
      search: searchStr,
    }));
  };

  const handlePaginationChange = ({ current }) => {
    let searchStr = '';
    if (!!queryParams.search) {
      searchStr += `search=${queryParams.search}&`;
    }
    dispatch(routerRedux.push({
      pathname: '/',
      search: `${searchStr}page=${current}`,
    }));
  };

  return (
    <div>
      <div className="row" style={{ marginTop: '4px' }} >
        <div className="col-md-8 col-sm-12">
          <div style={{ position: 'relative', minHeight: '300px' }}>
            <Loading spinning={loading.effects['articles/queryArticles']} />
            {list.map(article =>
              <Article article={article} key={article.id} onClick={onArticleClick.bind(null, article.id)} />)}
          </div>
          <Pagination pagination={pagination} onSelect={handlePaginationChange} />
        </div>
        <div className="col-md-4 col-sm-12">
          <Search withBox onSearch={onSearch} query={queryParams.search} />
          <LatestPostCard latestPosts={latestPosts} />
          <TagsCard tags={tagList} />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired,
  tagList: PropTypes.array,
};

Home.defaultProps = {
  tagList: [],
};

export default connect(({ loading, articles, tags: { list: tagList } }) =>
  ({ loading, articles, tagList }))(Home);

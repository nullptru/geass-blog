import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { decrypt, encrypt } from 'utils/crypto';
import queryString from 'query-string';
import Article from 'components/ArticleItem';
import { Search, Pagination, Loading } from 'components';
import LatestPostCard from './components/LatestPostCard';
import TagsCard from './components/TagsCard';
import styles from './index.less';

/* eslint-disable no-extra-boolean-cast */
const Home = ({
  dispatch, articles, tagList, location, loading,
}) => {
  const { list, latestPosts, pagination } = articles;
  const queryParams = decrypt(queryString.parse(location.search).params) || {};

  const onArticleClick = (id) => {
    dispatch(routerRedux.push({
      pathname: `/article/${id}`,
    }));
  };

  const onSearch = (query) => {
    const searchData = {};
    if (!!query) {
      searchData.search = query;
    }
    dispatch(routerRedux.push({
      pathname: '/',
      search: `params=${encrypt(searchData)}`,
    }));
  };

  const handlePaginationChange = ({ current }) => {
    const searchData = { current };
    if (!!queryParams.search) {
      searchData.search = queryParams.search;
    }
    dispatch(routerRedux.push({
      pathname: '/',
      search: `params=${encrypt(searchData)}`,
    }));
  };

  return (
    <div>
      <div className="row" style={{ marginTop: '4px' }} >
        <div className="col-md-8 col-sm-12">
          <div style={{ position: 'relative', minHeight: '300px' }}>
            <Loading spinning={loading.effects['articles/queryArticles']} />
            {list.length === 0 && !loading.effects['articles/queryArticles'] ? (
              <div className={styles.vacantContainer}>
                这个区域暂时没有内容呢QAQ，请去其它地方看看吧～
              </div>
            ) : list.map(article =>
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

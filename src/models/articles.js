import {
  queryArticles,
  querySingleArticle,
  queryLatestArticles,
  search,
} from 'services/articles';

export default {

  namespace: 'articles',

  state: {
    article: {},
    latestPosts: [],
    list: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 1,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') { // 主页面
          dispatch({ type: 'queryArticles' }); // 获取文章列表
          dispatch({ type: 'queryLatestArticles' }); // 获取最新文章
        }
      });
    },
    detail({ dispatch, history }) {
      history.listen((location) => {
        let match;
        if ((match = location.pathname.match(/\/article\/(\w+)/)) !== null) { // 主页面
          dispatch({ type: 'querySingleArticle', payload: { id: match[1] } }); // 获取文章列表
        } else {
          dispatch({ type: 'updateState', payload: { article: {} } });
        }
      });
    },
  },

  effects: {
    *queryArticles({ payload = {} }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryArticles, payload);
      if (response.status === 200) { // success
        yield put({
          type: 'updateState',
          payload: {
            pagination: {
              current: response.current || 1,
              pageSize: response.pageSize || 10,
              total: response.total || 1,
            },
            list: response.data,
          },
        });
      }
    },

    *queryLatestArticles({ payload = {} }, { select, call, put }) {
      const { latestPosts } = yield select(({ articles }) => articles);
      if (latestPosts.length !== 0) return; // 如果已获取过，则不再获取
      const response = yield call(queryLatestArticles, payload);
      if (response.status === 200) {
        yield put({ type: 'updateState', payload: { latestPosts: response.data } });
      }
    },

    *querySingleArticle({ payload = {} }, { call, put }) {
      const response = yield call(querySingleArticle, payload);
      if (response.status === 200) {
        yield put({ type: 'updateState', payload: { article: response.data } });
      }
    },

    *search({ payload = {} }, { call, put }) {
      const response = yield call(search, payload);
      if (response.status === 200) {
        yield put({
          type: 'updateState',
          payload: {
            pagination: {
              current: response.current || 1,
              pageSize: response.pageSize || 10,
              total: response.total || 1,
            },
            list: response.data,
          },
        });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

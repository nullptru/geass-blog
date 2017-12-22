import {
  queryArticles,
  querySingleArticle,
  queryLatestArticles,
  queryByTag,
  search,
  upload,
} from 'services/articles';
import queryString from 'query-string';

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
          const { search: searchStr } = queryString.parse(location.search);
          dispatch({ type: 'queryArticles', payload: { search: searchStr } }); // 获取文章列表
          dispatch({ type: 'queryLatestArticles' }); // 获取最新文章
          dispatch({ type: 'updateState', payload: { article: {} } }); // 置空文章
        }
      });
    },
    detail({ dispatch, history }) {
      history.listen((location) => {
        const match = location.pathname.match(/\/article\/(\w+)/);
        if (match !== null) { // 主页面
          dispatch({ type: 'querySingleArticle', payload: { id: match[1] } }); // 获取文章列表
        }
      });
    },
    tags({ dispatch, history }) {
      history.listen((location) => {
        const match = location.pathname.match(/\/tags\/(\w+)/);
        if (match !== null) { // 主页面
          dispatch({ type: 'queryByTag', payload: { tag: match[1] } }); // 获取文章列表
          dispatch({ type: 'queryLatestArticles' }); // 获取最新文章
          dispatch({ type: 'updateState', payload: { article: {} } }); // 置空文章
        }
      });
    },
  },

  effects: {
    *queryArticles({ payload = {} }, { call, put }) {  // eslint-disable-line
      const response = yield call(queryArticles, payload);
      if (response.success) { // success
        yield put({
          type: 'updateState',
          payload: {
            pagination: {
              current: payload.current || 1,
              pageSize: payload.pageSize || 10,
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
      if (response.success) {
        yield put({ type: 'updateState', payload: { latestPosts: response.data } });
      }
    },

    *queryByTag({ payload = {} }, { call, put }) {
      const response = yield call(queryByTag, payload);
      if (response.success) {
        yield put({
          type: 'updateState',
          payload: {
            pagination: {
              current: payload.current || 1,
              pageSize: payload.pageSize || 10,
              total: response.total || 1,
            },
            list: response.data,
          },
        });
      }
    },

    *querySingleArticle({ payload = {} }, { call, put }) {
      const response = yield call(querySingleArticle, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { article: response.data } });
      }
    },

    // eslint-disable-next-line
    *uploadImage({ payload = {} }, { call, put }) {
      // eslint-disable-next-line
      console.log(payload, 'enter upload');
      const response = yield call(upload, payload);
      // eslint-disable-next-line
      console.log(response);
    },

    *search({ payload = {} }, { call, put }) {
      const response = yield call(search, payload);
      if (response.success) {
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

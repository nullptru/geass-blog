import {
  queryArticles,
  querySingleArticle,
  queryLatestArticles,
  queryByTag,
  create,
  update,
  search,
  upload,
} from 'services/articles';
import queryString from 'query-string';
import { message } from 'components';

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
    // create
    updatedTitleImage: '',
    articleImages: [],
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

    *uploadImage({ payload = {} }, { select, call, put }) {
      const { articleImages } = yield select(({ articles }) => articles);
      const { type, formData } = payload;
      const response = yield call(upload, formData);
      if (response.success) {
        message.info('图片上传成功');
        if (type === 'avatar') {
          yield put({ type: 'updateState', payload: { updatedTitleImage: response.data.filename } });
        } else {
          const newImages = [...articleImages];
          newImages.push(response.data.filename);
          yield put({ type: 'updateState', payload: { articleImages: newImages } });
        }
      } else {
        message.info('图片上传失败');
      }
    },

    *updateArticle({ payload = {} }, { call, put }) {
      const { status, id } = payload;
      let response;
      if (id) {
        response = yield call(update, payload);
      } else {
        response = yield call(create, payload);
      }
      if (response.success) {
        message.info(status === 0 ? '草稿保存成功' : '文章创建成功');
        yield put({ type: 'updateState', payload: { article: response.data } });
      } else {
        message.info('创建失败');
      }
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

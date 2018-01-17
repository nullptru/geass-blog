import { query, create } from 'services/comments';

export default {
  namespace: 'comments',

  state: {
    list: [],
    createErr: false,
  },
  subscriptions: {
    detail({ dispatch, history }) {
      history.listen((location) => {
        const match = location.pathname.match(/\/article\/(\w+)/);
        if (match !== null) {
          dispatch({ type: 'query', payload: { id: match[1] } }); // 获取文章评论
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const response = yield call(query, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { list: response.data } });
      }
    },
    *create({ payload = {} }, { call, put }) {
      const response = yield call(create, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { createErr: false } });
        yield put({ type: 'query', payload: { id: payload.id } });
      } else {
        yield put({ type: 'updateState', payload: { createErr: true } });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

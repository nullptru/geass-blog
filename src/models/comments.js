import { query, create } from 'services/comments';

export default {
  namespace: 'comments',

  state: {
    list: [],
    createErr: false,
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
        yield put({ type: 'query', payload: { list: response.data, createErr: false } });
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

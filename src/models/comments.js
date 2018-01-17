import { query, create } from 'services/comments';
import { message } from 'components';

export default {
  namespace: 'comments',

  state: {
    list: [],
    createErr: false,
    inputErr: false,
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
        yield put({ type: 'updateState', payload: { createErr: false, inputErr: false } });
        yield put({ type: 'query', payload: { id: payload.id } });
      } else {
        yield put({ type: 'updateState', payload: { createErr: true } });
        message.info('评论创建失败了欸(///▽///)');
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

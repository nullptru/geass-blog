import { queryLogin, queryLoginStatus } from 'services/login';
import { message } from 'components';
import { hexSha1 } from 'utils/sha1.js';

export default {
  namespace: 'login',

  state: {
    isLogin: false,
    name: 'Geass',
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(queryLogin, { name: payload.name, password: hexSha1(payload.password) });
      if (response.success) {
        yield put({ type: 'updateState', payload: { isLogin: true, name: payload.name } });
      } else {
        message.info('用户名密码错误');
      }
    },
    *isLogin({ payload }, { call, put }) {
      const response = yield call(queryLoginStatus, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { isLogin: response.data.isLogin, name: response.data.name } });
      } else {
        yield put({ type: 'updateState', payload: { isLogin: false } });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

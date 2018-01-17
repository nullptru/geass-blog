/* eslint-disable */
import { queryLogin, queryLoginStatus } from 'services/login';
import { message } from 'components';
import { hexSha1 } from 'utils/sha1.js';

export default {
  namespace: 'login',

  state: {
    isLogin: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      payload.password = hexSha1(payload.password);
      const response = yield call(queryLogin, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { isLogin: true } });
      } else {
        message.info('用户名密码错误');
      }
    },
    *isLogin({ payload }, { call, put }) {
      const response = yield call(queryLoginStatus, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { isLogin: response.data.isLogin } });
      } else {
        yield put({ type: 'updateState', payload: { isLogin: false } });
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

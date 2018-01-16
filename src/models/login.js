/* eslint-disable */
import { queryLogin } from 'services/login';
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
        window.sessionStorage.setItem('isLogin', true);
      } else {
        message.info('用户名密码错误');
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

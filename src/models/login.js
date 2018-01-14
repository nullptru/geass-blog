/* eslint-disable */
import { hex_sha1 } from 'utils/sha1.js';

export default {

  namespace: 'login',

  state: {
    isLogin: false,
  },

  effects: {
    /* eslint-disable */
    *login({ payload }, { call, put }) {
      console.log(payload)
      console.log(payload.name === 'geass', hex_sha1(1) === hex_sha1(1), hex_sha1(payload.password) === hex_sha1(1))
      if (payload.name === 'geass' && hex_sha1(payload.password) === hex_sha1('1')) {
        yield put({ type: 'updateState', payload: { isLogin: true } });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

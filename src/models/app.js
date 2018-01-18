import { errorHandle } from 'services/error';

export default {
  namespace: 'app',
  state: {},
  effects: {
    *errorHandle({ payload }, { call }) {
      yield call(errorHandle, payload);
    },
  },
};

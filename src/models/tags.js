import { queryTags } from 'services/tags';

export default {

  namespace: 'tags',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') { // 主页面
          dispatch({ type: 'queryTags' }); // 获取标签
        }
      });
    },
  },

  effects: {
    *queryTags({ payload }, { call, put }) {
      const response = yield call(queryTags, payload);
      if (response.status === 200) {
        yield put({ type: 'updateState', payload: { list: response.data } });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
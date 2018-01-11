import { queryTags } from 'services/tags';

export default {

  namespace: 'tags',

  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/' || location.pathname.match(/\/tags\/(\w+)/) !== null
        || location.pathname === '/tagslist' || location.pathname.includes('/admin')) { // 主页面
          dispatch({ type: 'queryTags' }); // 获取标签
        }
      });
    },
  },

  effects: {
    *queryTags({ payload }, { select, call, put }) {
      const { list } = yield select(({ tags }) => tags);
      if (list.length !== 0) return; // 如果已获取过，则不再获取
      const response = yield call(queryTags, payload);
      if (response.success) {
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

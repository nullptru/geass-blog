import { queryTagsArticles } from 'services/articles';

export default {

  namespace: 'tagsArticles',

  state: {
    tags2Articles: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/tagslist') { // 标签页面
          dispatch({ type: 'queryTagsArticles' }); // 获取标签和对应的文章
        }
      });
    },
  },

  effects: {
    *queryTagsArticles({ payload }, { select, call, put }) {
      const { tags2Articles } = yield select(({ tagsArticles }) => tagsArticles);
      if (Object.keys(tags2Articles).length !== 0) return; // 如果已获取过，则不再获取
      const response = yield call(queryTagsArticles, payload);
      if (response.success) {
        yield put({ type: 'updateState', payload: { tags2Articles: response.data } });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

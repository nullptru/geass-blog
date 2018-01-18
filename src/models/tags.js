import { queryTags, create, update, remove } from 'services/tags';
import { message } from 'components';

export default {
  namespace: 'tags',

  state: {
    list: [],
    shouldUpdate: false,
    tag: {},
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
    *queryTags({ payload = {} }, { select, call, put }) {
      const { shouldUpdate = false, ...rest } = payload;
      const { list } = yield select(({ tags }) => tags);
      if (list.length !== 0 && !shouldUpdate) return; // 如果已获取过，则不再获取
      const response = yield call(queryTags, rest);
      if (response.success) {
        yield put({ type: 'updateState', payload: { list: response.data, shouldUpdate: false } });
      }
    },
    *create({ payload }, { call, put }) {
      const response = yield call(create, payload);
      if (response.success) {
        yield put({ type: 'queryTags', payload: { shouldUpdate: true } }); // 获取标签
        message.info('创建成功');
      } else {
        message.info('创建失败');
      }
    },

    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      if (response.success) {
        yield put({ type: 'queryTags', payload: { shouldUpdate: true } }); // 获取标签
        message.info('更新成功');
      } else {
        message.info('更新失败');
      }
    },

    *remove({ payload }, { call, put }) {
      const response = yield call(remove, payload);
      if (response.success) {
        yield put({ type: 'queryTags', payload: { shouldUpdate: true } }); // 获取标签
        message.info('删除成功');
      } else {
        message.info('删除失败');
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};

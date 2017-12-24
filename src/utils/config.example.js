const api = 'http://localhost:port/';
export default {
  api: {
    testApi: {
      create: `${api}testApi`,
      delete: `${api}testApi/:id`,
      update: `${api}testApi`,
      query: `${api}testApis/page`,
    },
  },
};

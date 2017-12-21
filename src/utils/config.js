const api = 'http://localhost:3000/';
export default {
  api : {
    articles: {
      upload: `${api}article/image/upload`,
      create: `${api}article`,
      delete: `${api}articles/:id`,
      update: `${api}article`,
      query: `${api}articles/page`,
      querySingle: `${api}article/:id`,
      queryLatest: `${api}articles/latest`,
      queryByTag: `${api}articles/tags/page`,
    },
  },
};

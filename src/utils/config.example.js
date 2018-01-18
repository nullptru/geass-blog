
let api;

if (process.env.NODE_ENV === 'production') {
  api = 'http://geasscn.me:3000/';
} else {
  api = 'http://localhost:3000/';
}

export default {
  publicKey: 'crypto_key',
  api: {
    testApi: {
      create: `${api}testApi`,
      delete: `${api}testApi/:id`,
      update: `${api}testApi`,
      query: `${api}testApis/page`,
    },
  },
};

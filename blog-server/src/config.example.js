const config = {
  origin: 'http://localhost:8000',
  dbHost: 'dbHost',
  dbName: 'dbName',
  dbUser: 'user',
  dbPwd: 'yourPassword',
  appPort: 3000,
  // qiniu
  uploadConfig: {
    scope: 'scope',
    returnBody: '{ "key": "$(key)", "hash": "$(etag)", "w": "$(imageInfo.width)", "h": "$(imageInfo.height)", "name": "$(fname)"}',
  },
  uploadDir: './imgs',
  defaultDomain: 'http://test.com/',
  accessKey: 'key',
  secretKey: 'key',
};

export default config;

import Router from 'koa-router';

let articles = new Router();
let response = {
  data: {},
  success: true,
};

/**
 * 当请求进入article时，记录相应信息，调用next()保证不直接返回而继续匹配路由
 */
articles.get('/', async (ctx, next) => {
  console.log('Router Enter');
  next();
});

/**
 * 当请求为xxxxx/articles/page时，获得所有文章列表
 */
articles.get('/articles/page', async (ctx) => {
  console.log('get All articles')
  response.data = [];
  ctx.body = response;
});

/**
 * 当请求为xxxxx/articles/:id时，获得所有文章列表
 */
articles.get('/article/:id', async (ctx) => {
  console.log('get article' + ctx.params.id)
  response.data = [];
  ctx.body = response;
});

/**
 * 创建新文章
 */
articles.post('/article', async (ctx) => {
  console.log('article created')
  response.data = {};
  ctx.body = response;
});

/**
 * 删除文章
 */
articles.delete('/article/:id', async (ctx) => {
  console.log('article deleted')
  response.data = {};
  ctx.body = response;
});

export default articles;

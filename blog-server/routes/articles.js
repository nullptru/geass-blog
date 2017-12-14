import Router from 'koa-router';
import Pool from '../db';

const articles = new Router();
const response = {
  data: {},
  success: true,
};

/**
 * 当请求进入article时，记录相应信息，调用next()保证不直接返回而继续匹配路由
 */
articles.get('/', async (ctx, next) => {
  await next();
});

/**
 * 当请求为xxxxx/articles/page时，获得所有文章列表
 */
articles.get('/articles/page', async (ctx) => {
  console.log(ctx.query);
  const { pageSize = 10, current = 1 } = ctx.query;
  const rows = await Pool.query('SELECT * FROM articles limit ?, ?', [(current - 1) * pageSize, current * pageSize]);
  response.data = rows;
  ctx.body = response;
});

/**
 * 当请求为xxxxx/articles/:id时，获得所有文章列表
 */
articles.get('/article/:id', async (ctx) => {
  const rows = await Pool.query('SELECT * FROM articles WHERE id = ?', [ctx.params.id]);
  response.data = rows;
  ctx.body = response;
});

/**
 * 创建新文章
 */
articles.post('/article', async (ctx) => {
  console.log('article created');
  response.data = {};
  ctx.body = response;
});

/**
 * 删除文章
 */
articles.delete('/article/:id', async (ctx) => {
  console.log('article deleted');
  response.data = {};
  ctx.body = response;
});

export default articles;

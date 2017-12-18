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
  console.log(ctx.request);
  const {
    title, content, abstraction, imageUrl = '', next,
  } = ctx.request.body;
  const querys = [{
    sql: 'SELECT id from articles ORDER BY created_time DESC LIMIT 0,1',
  }, {
    sql: 'INSERT INTO articles(title, content, abstraction, image_url, pre, next) VALUES (?, ?, ?, ?, ? ,?)',
    params: (results) => {
      console.log(results, 'query2');
      const preId = results[0][0].id;
      return [title, content, abstraction, imageUrl, preId, next];
    },
  }, {
    sql: 'UPDATE articles SET next = ? WHERE id = ?',
    params: (results) => {
      console.log(results, 'query3');
      const preId = results[0][0].id;
      const { insertId } = results[1];
      return [insertId, preId];
    },
  }];
  const rows = await Pool.startTransaction(querys);
  console.log(rows, 'rows');
  response.data = rows;
  ctx.body = response;
});

/**
 * 删除文章
 */
articles.delete('/article/:id', async (ctx) => {
  const { id } = ctx.params;
  const rows = await Pool.query(
    'DELETE FROM articles WHERE id = ?',
    [id],
  );
  response.data = rows;
  ctx.body = response;
});

export default articles;

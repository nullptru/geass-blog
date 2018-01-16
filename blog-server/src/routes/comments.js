import Router from 'koa-router';
import Pool from '../utils/db';

const comments = new Router();
const response = {
  data: {},
  success: true,
};

/**
 * 当请求进入comments时，记录相应信息，调用next()保证不直接返回而继续匹配路由
 */
comments.all('/', async (ctx, next) => {
  response.success = true;
  await next();
});


comments.get('/comments/article/:id', async (ctx) => {
  const rows = await Pool.query('SELECT * FROM comments WHERE article_id = ?', [ctx.params.id]);
  response.data = rows;
  ctx.body = response;
});

comments.post('/comment/article/:id', async (ctx) => {
  const { message, author } = ctx.request.body;
  const id = ctx.params.id;
  const ip = ctx.req.socket.remoteAddress;
  const rows = await Pool.query('INSERT INTO comments(author, message, ip, article_id) VALUES (?, ?, ?, ?)', [author, message, ip, id]);
  response.data = { insertId: rows.insertId };
  ctx.body = response;
});

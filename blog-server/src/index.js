import Koa from 'koa';
import logger from 'koa-logger';
import KoaBody from 'koa-body';
import Router from 'koa-router';
import articles from './routes/articles';
import tags from './routes/tags';

const app = new Koa();

// request logger
app.use(logger());
app.use(KoaBody());
// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next(); // 等待下一个中间件完成
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// 装载所有子路由
const router = new Router();
router.use(articles.routes());
router.use(tags.routes());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { success: false, err: err.message };
  }
});

// 加载路由中间件
app.use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
/* eslint-disable no-console */
console.log('Server running at 3000');
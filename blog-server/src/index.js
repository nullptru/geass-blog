import Koa from 'koa';
import logger from 'koa-logger';
import KoaBody from 'koa-body';
import Router from 'koa-router';
import cors from 'koa2-cors';
import articles from './routes/articles';
import tags from './routes/tags';
import config from './config';

const app = new Koa();

// request logger
app.use(logger());
app.use(KoaBody());

// 具体参数我们在后面进行解释
app.use(cors({
  origin() {
    return 'http://localhost:8000'; // 允许来自所有域名请求
  },
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// 装载所有子路由
const router = new Router();
router.use(articles.routes()).use(articles.allowedMethods());
router.use(tags.routes()).use(tags.allowedMethods());

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

app.listen(config.appPort);
/* eslint-disable no-console */
console.log(`Server running at ${config.appPort}`);

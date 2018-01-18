import Koa from 'koa';
import logger from 'koa-logger';
import KoaBody from 'koa-body';
import Router from 'koa-router';
import cors from 'koa2-cors';
import session from 'koa-session-minimal';
import articles from './routes/articles';
import tags from './routes/tags';
import login from './routes/login';
import comments from './routes/comments';
import errors from './routes/errors';
import config from './config';

const app = new Koa();

app.keys = ['some secret hurr'];

app.use(cors({
  origin: (ctx) => {
    const requestOrigin = ctx.get('Origin');
    if (config.allowOrigins.some(origin => origin === requestOrigin)) {
      return requestOrigin;
    }
    return false;
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(session({
  key: 'SESSIONID', // cookie 中存储 session-id 时的键名, 默认为 koa:sess
}));

// request logger
app.use(logger());
app.use(KoaBody());

// 装载所有子路由
const router = new Router();
router.use(comments.routes()).use(comments.allowedMethods());
router.use(articles.routes()).use(articles.allowedMethods());
router.use(tags.routes()).use(tags.allowedMethods());
router.use(login.routes()).use(login.allowedMethods());
router.use(errors.routes()).use(errors.allowedMethods());

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

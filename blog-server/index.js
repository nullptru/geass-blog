import Koa from 'koa';
import logger from 'koa-logger';
import KoaBody from 'koa-body';

const app = new Koa();

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next(); // 等待下一个中间件完成
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger request
app.use(logger);

// response
app.use(async (ctx) => {
  ctx.body += 'Hello World';
});

app.listen(3000);
console.log('Server running at ' + port);
console.log("Running in "  + process.env.NODE_ENV + " v" + process.env.npm_package_version);

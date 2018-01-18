import Router from 'koa-router';
import Pool from '../utils/db';

const errors = new Router();
const response = {
  data: {},
  success: true,
};

errors.all('/', async (ctx, next) => {
  response.success = true;
  await next();
});

errors.post('/error', async (ctx) => {
  const { ua, errInfo, stack } = ctx.request.body;
  const rows = await Pool.query('INSERT INTO errors(ua, errInfo, stack) VALUES(?, ?, ?)', [ua, errInfo, stack]);
  response.data = rows;
  ctx.body = response;
});

export default errors;

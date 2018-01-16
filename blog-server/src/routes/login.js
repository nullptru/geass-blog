import Router from 'koa-router';
import Pool from '../utils/db';

const login = new Router();
const response = {
  data: {},
  success: true,
};

login.all('/', async (ctx, next) => {
  response.success = true;
  await next();
});

login.post('/login', async (ctx) => {
  const {
    name, password,
  } = ctx.request.body;
  const rows = await Pool.query('SELECT count(*) as count FROM user WHERE name = ? AND password = ?', [name, password]);
  response.data = rows[0].count;
  if (response.data === 0) {
    response.success = false;
  }
  ctx.body = response;
});

export default login;

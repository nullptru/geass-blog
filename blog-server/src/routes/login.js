import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import Pool from '../utils/db';
import { createToken, checkToken } from '../utils/token';

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
  } else {
    const token = createToken(name);
    ctx.session.token = token;
  }
  ctx.body = response;
});

login.get('/login/status', checkToken, async (ctx) => {
  const tokenObj = jwt.decode(ctx.session.token, 'geass_blog');
  response.data = { isLogin: true, name: tokenObj.userId };
  ctx.body = response;
});

export default login;

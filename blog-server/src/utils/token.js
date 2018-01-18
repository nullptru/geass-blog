import jwt from 'jsonwebtoken';

// 登录时：核对用户名和密码成功后，将用户的id作为JWT Payload的一个属性
export const createToken = (userId) => {
  const token = jwt.sign({
    userId,
  }, 'geass_blog', {
    expiresIn: '20m', // 过期时间设置为20m。那么decode这个token的时候得到的过期时间为 : 创建token的时间 + 设置的值
  });
  return token;
};

export const checkToken = async (ctx, next) => {
  const authorization = ctx.session.token;
  if (!authorization || authorization === '') {
    ctx.throw(401, 'no token detected in session');
  }
  const token = authorization;
  try {
    await jwt.verify(token, 'geass_blog'); // 如果token过期或验证失败，将抛出错误
  } catch (err) {
    ctx.throw(401, 'invalid token');
  }
  await next();
};

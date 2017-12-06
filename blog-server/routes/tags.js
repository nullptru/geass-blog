import Router from 'koa-router';

let tags = new Router();
let response = {
  data: {},
  success: true,
};

/**
 * 当请求为xxxxx/tags/page时，获得所有标签列表
 */
tags.get('/tags/page', async (ctx) => {
  console.log('get All tags')
  response.data = [];
  ctx.body = response;
});

/**
 * 当请求为xxxxx/tag/:id时，获得所有文章列表
 */
tags.get('/tag/:id', async (ctx) => {
  console.log('get tag' + ctx.params.id)
  response.data = [];
  ctx.body = response;
});

/**
 * 创建新文章
 */
tags.post('/tag', async (ctx) => {
  console.log('tag created')
  response.data = {};
  ctx.body = response;
});

/**
 * 删除文章
 */
tags.delete('/tag/:id', async (ctx) => {
  console.log('tag deleted')
  response.data = {};
  ctx.body = response;
});

export default tags;

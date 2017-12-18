import Router from 'koa-router';
import Pool from '../db';

const articles = new Router();
const response = {
  data: {},
  success: true,
};

/**
 * 当请求进入article时，记录相应信息，调用next()保证不直接返回而继续匹配路由
 */
articles.get('/', async (ctx, next) => {
  await next();
});

/**
 * 当请求为/articles/page时，获得所有文章列表
 */
articles.get('/articles/page', async (ctx) => {
  const { pageSize = 10, current = 1 } = ctx.query;
  const rows = await Pool.query('SELECT * FROM articles limit ?, ?', [(current - 1) * pageSize, current * pageSize]);
  response.data = rows;
  ctx.body = response;
});

/**
 * 当请求为/articles/:id时，获得对应id文章列表
 */
articles.get('/article/:id', async (ctx) => {
  const rows = await Pool.query('SELECT * FROM articles WHERE id = ?', [ctx.params.id]);
  response.data = rows;
  ctx.body = response;
});

/**
 * 当请求为/articles/tag/:tag时，获得相应tag下的文章列表
 */
articles.get('/article/tag/:tag', async (ctx) => {
  const { pageSize = 10, current = 1 } = ctx.query;
  const rows = await Pool.query(
    'SELECT * FROM articles WHERE tag = ? limit ?, ?',
    [ctx.params.tag, (current - 1) * pageSize, current * pageSize],
  );
  response.data = rows;
  ctx.body = response;
});

/**
 * 创建新文章
 */
articles.post('/article', async (ctx) => {
  const {
    title, content, abstraction, imageUrl = '', next, tagId,
  } = ctx.request.body;
  /**
   * insert a article by 4 step
   * 1. select the latest article
   * 2. insert a new article link to the previous article
   * 3. insert article's tags infomation into table named tag2article
   * 4. update the article in step 1 link to the next article
   */
  const querys = [{
    sql: 'SELECT id from articles ORDER BY created_time DESC LIMIT 0,1',
  }, {
    sql: 'INSERT INTO articles(title, content, abstraction, image_url, pre, next) VALUES (?, ?, ?, ?, ? ,?)',
    params: (results) => {
      const preId = results[0][0].id;
      return [title, content, abstraction, imageUrl, preId, next];
    },
  }, {
    sql: 'INSERT INTO tag2article(article_id, tag_id) VALUES (?, ?)',
    params: (results) => {
      const { insertId } = results[1];
      return [insertId, tagId];
    },
  }, {
    sql: 'UPDATE articles SET next = ? WHERE id = ?',
    params: (results) => {
      const preId = results[0][0].id;
      const { insertId } = results[1];
      return [insertId, preId];
    },
  }];
  const rows = await Pool.startTransaction(querys);
  response.data = rows;
  ctx.body = response;
});


/**
 * 更新文章
 */
articles.put('/article', async (ctx) => {
  const columns = ['title', 'content', 'abstraction', 'image_url'];
  const { body } = ctx.request;
  const updateObj = {};
  let updated = false;
  columns.forEach((column) => {
    if (body[column] !== undefined && body[column] !== null) { // if column has value
      updated = true;
      updateObj[column] = body[column];
    }
  });
  if (!updated) {
    response.data = {};
    response.success = false;
    response.err = '未发现需更新字段';
  } else {
    const rows = await Pool.query('UPDATE articles SET ? WHERE id = ?', [updateObj, body.id]);
    response.data = rows;
  }
  ctx.body = response;
});

/**
 * 删除文章
 */
articles.delete('/article/:id', async (ctx) => {
  const { id } = ctx.params;
  const rows = await Pool.query(
    'DELETE FROM articles WHERE id = ?',
    [id],
  );
  response.data = rows;
  ctx.body = response;
});

export default articles;

import Router from 'koa-router';
import Pool from '../utils/db';
import upload from '../utils/upload';

const articles = new Router();
const response = {
  data: {},
  success: true,
};

const getTags = (tagStr) => {
  if (!tagStr) return []; // return empty array if tagStr is '' or undefined
  const arr = tagStr.split('|');
  const res = [];
  for (let i = 0; i < arr.length; i += 1) {
    const t = arr[i].split(',');
    if (t.length) {
      res.push({
        id: t[0] || '',
        name: t[1] || '',
        value: t[2] || '',
      });
    }
  }
  return res;
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
  const rows = await Pool.query(
    "SELECT articles.*, GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
    'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
    'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
    'GROUP BY articles.id ' +
    'LIMIT ?, ?',
    [(current - 1) * pageSize, current * pageSize],
  );
  const data = Array.from(rows);
  const resData = data.map((item) => {
    const newItem = { ...item };
    newItem.tags = getTags(newItem.articleTags);
    delete newItem.articleTags;
    return newItem;
  });
  response.data = resData;
  ctx.body = response;
});

/**
 * 当请求为/articles/:id时，获得对应id文章列表
 */
articles.get('/article/:id', async (ctx) => {
  const rows = await Pool.query(
    "SELECT articles.*, GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
    'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
    'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
    'WHERE articles.id = ? ' +
    'GROUP BY articles.id',
    [ctx.params.id],
  );
  const data = Array.from(rows);
  const resData = data.map((item) => {
    const newItem = { ...item };
    newItem.tags = getTags(newItem.articleTags);
    delete newItem.articleTags;
    return newItem;
  });
  [response.data] = resData;
  ctx.body = response;
});

/**
 * 当请求为/articles/tags/:tag/page时，获得相应tag下的文章列表
 */
articles.get('/articles/tags/:tag/page', async (ctx) => {
  const { pageSize = 10, current = 1 } = ctx.query;
  const rows = await Pool.query(
    "SELECT articles.*, GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
    'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
    'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
    'WHERE articles.id IN (SELECT id FROM articles, tag2article WHERE tag2article.tag_id = ? AND tag2article.article_id = articles.id) ' +
    'GROUP BY articles.id ' +
    'LIMIT ?, ?',
    [ctx.params.tag, (current - 1) * pageSize, current * pageSize],
  );
  const data = Array.from(rows);
  const resData = data.map((item) => {
    const newItem = { ...item };
    newItem.tags = getTags(newItem.tags);
    delete newItem.articleTags;
    return newItem;
  });
  response.data = resData;
  ctx.body = response;
});

articles.post('/article/image/upload', upload.single('titleImage'), async (ctx) => {
  ctx.body = {
    filename: ctx.req.file.path, // 返回文件名
  };
});

/**
 * 创建新文章
 */
articles.post('/article', async (ctx) => {
  const {
    title, content, abstraction, imageUrl = '', next, tagIds,
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
    sql: 'INSERT INTO tag2article(article_id, tag_id) VALUES ?',
    params: (results) => {
      const { insertId } = results[1];
      const params = tagIds.map(tagId => [insertId, tagId]);
      return [params];
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
  response.data = { insertId: rows[1].insertId };
  ctx.body = response;
});


/**
 * 更新文章
 */
articles.put('/article', async (ctx) => {
  const columns = ['title', 'content', 'abstraction', 'image_url'];
  const { body } = ctx.request;
  const { tagIds } = body;
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
    ctx.body = response;
    ctx.throw(400, 'Error Message');
  } else {
    let querys = [{
      sql: 'UPDATE articles SET ? WHERE id = ?',
      params: [updateObj, body.id],
    }];
    if (tagIds !== undefined) {
      const params = tagIds.map(tagId => [body.id, tagId]);
      querys = querys.concat([{
        sql: 'DELETE FROM tag2article WHERE article_id = ?',
        params: [body.id],
      }, {
        sql: 'INSERT INTO tag2article(article_id, tag_id) VALUES ?',
        params: [params],
      }]);
    }
    const rows = await Pool.startTransaction(querys);
    response.data = { affectedRows: rows[0].affectedRows };
    ctx.body = response;
  }
});

/**
 * 删除文章
 */
articles.del('/article/:id', async (ctx) => {
  const { id } = ctx.params;
  const rows = await Pool.query(
    'DELETE FROM articles WHERE id = ?',
    [id],
  );
  response.data = { affectedRows: rows.affectedRows };
  if (response.data.affectedRows === 0) {
    response.success = false;
    response.err = '未找到需删除数据';
    ctx.status = 400;
  }
  ctx.body = response;
});

export default articles;

import Router from 'koa-router';
import Pool from '../utils/db';
import upload from '../utils/upload';
import { dateFormat } from '../utils/index';

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
  const { pageSize = 10, current = 1, search = '' } = ctx.query;
  const searchStr = `%${search}%`;
  const rows = await Pool.query(
    'SELECT (SELECT count(*) FROM articles WHERE content LIKE ? OR title LIKE ? OR abstraction LIKE ? ) AS total, articles.id, articles.title, articles.created_time, articles.abstraction, articles.image_url, ' +
    "GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
    'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
    'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
    'WHERE content LIKE ? OR title LIKE ? OR abstraction LIKE ? AND status=1 ' +
    'GROUP BY articles.id ' +
    'LIMIT ?, ?',
    [searchStr, searchStr, searchStr, searchStr, searchStr, searchStr, (current - 1) * pageSize, current * pageSize],
  );
  const data = Array.from(rows);
  // pagination
  response.total = data[0] !== undefined ? (data[0].total || 0) : 0;
  response.pageSize = pageSize;
  response.current = current;
  const resData = data.map((item) => {
    const newItem = { ...item };
    newItem.tags = getTags(newItem.articleTags);
    newItem.createdTime = dateFormat(newItem.created_time, 'yyyy-MM-dd');
    delete newItem.articleTags;
    delete newItem.total;
    delete newItem.created_time;
    return newItem;
  });
  response.data = resData;
  ctx.body = response;
});


/**
 * 当请求为/articles/page时，获得所有文章列表
 */
articles.get('/articles/tags', async (ctx) => {
  const tagsArticles = {};
  const rows = await Pool.query(
    'SELECT articles.id, articles.title, articles.created_time, articles.abstraction, ' +
    "GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
    'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
    'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
    'WHERE status=1 ' +
    'GROUP BY articles.id ',
    [],
  );
  const data = Array.from(rows);
  // get all tags
  const tagRows = await Pool.query('SELECT * FROM tags', []);
  const tagsArray = Array.from(tagRows);
  tagsArray.forEach((tag) => {
    tagsArticles[tag.value] = [];
  });

  data.forEach((item) => {
    const newItem = { ...item };
    newItem.tags = getTags(newItem.articleTags);
    newItem.createdTime = dateFormat(newItem.created_time, 'yyyy-MM-dd');
    delete newItem.articleTags;
    delete newItem.created_time;
    newItem.tags.forEach((tag) => {
      tagsArticles[tag.value].push(newItem);
    });
  });
  response.data = tagsArticles;
  ctx.body = response;
});

/**
 * 当请求为/articles/:id时，获得对应id文章列表
 */
articles.get('/article/:id', async (ctx) => {
  const querys = [{
    sql: "SELECT articles.*, GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
    'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
    'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
    'WHERE articles.id = ?  AND status=1 ' +
    'GROUP BY articles.id',
    params: [ctx.params.id],
  }, { // 上一篇
    sql: 'SELECT id, title FROM articles WHERE id = ( SELECT max( id ) FROM articles WHERE id < ? )',
    params: [ctx.params.id],
  }, { // 下一篇
    sql: 'SELECT id, title FROM articles WHERE id = ( SELECT min( id ) FROM articles WHERE id > ? )',
    params: [ctx.params.id],
  }];
  const rows = await Pool.startTransaction(querys);
  const data = Array.from(rows[0]);
  const resData = data.map((item) => {
    const newItem = { ...item };
    newItem.tags = getTags(newItem.articleTags);
    delete newItem.articleTags;
    return newItem;
  });
  [response.data] = resData;
  [, [response.data.pre], [response.data.next]] = rows;
  // 转义
  response.data.content = response.data.content.replace(/\\n/g, '\n');
  response.data.createdTime = dateFormat(response.data.created_time, 'yyyy-MM-dd');
  delete response.data.created_time;
  ctx.body = response;
});

/**
 * 当请求为/articles/tags/:tag/page时，获得相应tag下的文章列表
 */
articles.get('/articles/tags/:tag/page', async (ctx) => {
  const { pageSize = 10, current = 1 } = ctx.query;
  const rows = await Pool.query(
    'SELECT (SELECT count(*) FROM articles, tag2article, tags WHERE tag2article.tag_id = tags.id AND tag2article.article_id = articles.id AND tags.value = ?) AS total, articles.id, articles.title, articles.created_time, articles.abstraction, articles.image_url, ' +
    "GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
    'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
    'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
    'WHERE articles.id IN ( SELECT articles.id FROM articles, tag2article, tags WHERE tag2article.tag_id = tags.id AND tag2article.article_id = articles.id AND tags.value = ? AND status=1 ) ' +
    'GROUP BY articles.id ' +
    'LIMIT ?, ?',
    [ctx.params.tag, ctx.params.tag, (current - 1) * pageSize, current * pageSize],
  );
  const data = Array.from(rows);
  // pagination
  response.total = data[0] !== undefined ? (data[0].total || 0) : 0;
  response.pageSize = pageSize;
  response.current = current;
  const resData = data.map((item) => {
    const newItem = { ...item };
    newItem.tags = getTags(newItem.articleTags);
    newItem.createdTime = dateFormat(newItem.created_time, 'yyyy-MM-dd');
    delete newItem.articleTags;
    delete newItem.total;
    delete newItem.created_time;
    return newItem;
  });
  response.data = resData;
  ctx.body = response;
});

/**
 * 获取最新的文章信息
 * ps:只返回名称和id
 */
articles.get('/articles/latest', async (ctx) => {
  const { pageSize = 10 } = ctx.query;
  const rows = await Pool.query('SELECT id, title FROM articles WHERE status=1 ORDER BY created_time limit 0, ?', [pageSize]);
  response.data = rows;
  ctx.body = response;
});

/**
 * 上传图片
 */
articles.post('/article/image/upload', upload.single('titleImage'), async (ctx) => {
  response.data = { filename: ctx.req.file.path };
  ctx.body = response;
});

/**
 * 创建新文章
 */
articles.post('/article', async (ctx) => {
  const {
    title, content, abstraction, author, imageUrl = '', tagIds = [], status,
  } = ctx.request.body;
  /**
   * insert a article by 2 step
   * 1. insert a new article link to the previous article
   * 2. insert article's tags infomation into table named tag2article
   */
  const querys = [{
    sql: 'INSERT INTO articles(title, content, author, abstraction, image_url, status) VALUES (?, ?, ?, ?, ?, ?)',
    params: [title, content, author, abstraction, imageUrl, status],
  }];
  if (tagIds.length > 0) {
    querys.push({
      sql: 'INSERT INTO tag2article(article_id, tag_id) VALUES ?',
      params: (results) => {
        const { insertId } = results[0];
        const params = tagIds.map(tagId => [insertId, tagId]);
        return [params];
      },
    });
  }
  querys.push({
    sql: "SELECT articles.*, GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
    'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
    'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
    'WHERE articles.id = ?  AND status=1 ' +
    'GROUP BY articles.id',
    params: (results) => {
      const { insertId } = results[0];
      return [insertId];
    },
  });
  const rows = await Pool.startTransaction(querys);
  const resData = rows[querys.length - 1].map((item) => {
    const newItem = { ...item };
    newItem.tags = getTags(newItem.articleTags);
    delete newItem.articleTags;
    return newItem;
  });
  [response.data] = resData;
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
    querys.push({
      sql: "SELECT articles.*, GROUP_CONCAT(concat_ws(',', tags.id, tags.name,tags.value) ORDER BY tags.id SEPARATOR '|') AS articleTags  FROM articles " +
      'LEFT JOIN tag2article ON tag2article.article_id = articles.id ' +
      'LEFT JOIN tags ON tag2article.tag_id = tags.id ' +
      'WHERE articles.id = ?  AND status=1 ' +
      'GROUP BY articles.id',
      params: [body.id],
    });
    const rows = await Pool.startTransaction(querys);
    const resData = rows[querys.length - 1].map((item) => {
      const newItem = { ...item };
      newItem.tags = getTags(newItem.articleTags);
      delete newItem.articleTags;
      return newItem;
    });
    [response.data] = resData;
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

import request from 'utils/request';
import config from 'utils/config';

const { articles } = config.api;
export function queryArticles(params) {
  return request({
    url: articles.query,
    method: 'get',
    data: params,
  });
}

export function queryByTag(params) {
  return request({
    url: articles.queryByTag,
    method: 'get',
    data: params,
  });
}

export function querySingleArticle(params) {
  return request({
    url: articles.querySingle,
    method: 'get',
    data: params,
  });
}

export function queryLatestArticles(params) {
  return request({
    url: articles.queryLatest,
    method: 'get',
    data: params,
  });
}

export function search(params) {
  return request({
    url: articles.query,
    method: 'get',
    data: params,
  });
}

export function upload(params) {
  return request({
    url: articles.upload,
    method: 'post',
    data: params,
  });
}

export function create(params) {
  return request({
    url: articles.create,
    method: 'post',
    data: params,
  });
}

export function update(params) {
  return request({
    url: articles.update,
    method: 'put',
    data: params,
  });
}

export function remove(params) {
  return request({
    url: articles.delete,
    method: 'delete',
    data: params,
  });
}

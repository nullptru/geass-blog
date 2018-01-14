import request from 'utils/request';
import config from 'utils/config';

const { tags } = config.api;
export function queryTags(params) {
  return request({
    url: tags.query,
    method: 'get',
    data: params,
  });
}

export function create(params) {
  return request({
    url: tags.create,
    method: 'post',
    data: params,
  });
}

export function update(params) {
  return request({
    url: tags.update,
    method: 'put',
    data: params,
  });
}

export function remove(params) {
  return request({
    url: tags.delete,
    method: 'delete',
    data: params,
  });
}
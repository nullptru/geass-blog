import request from 'utils/request';
import config from 'utils/config';

const { comments } = config.api;
export function query(params) {
  return request({
    url: comments.query,
    method: 'get',
    data: params,
  });
}

export function create(params) {
  return request({
    url: comments.create,
    method: 'post',
    data: params,
  });
}

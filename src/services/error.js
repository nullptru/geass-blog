import request from 'utils/request';
import config from 'utils/config';

const { errors } = config.api;
export function errorHandle(params) {
  return request({
    url: errors.create,
    method: 'post',
    data: params,
  });
}

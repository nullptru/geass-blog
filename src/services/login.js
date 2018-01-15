import request from 'utils/request';
import config from 'utils/config';

const { login } = config.api;
export function queryLogin(params) {
  return request({
    url: login.login,
    method: 'post',
    data: params,
  });
}

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

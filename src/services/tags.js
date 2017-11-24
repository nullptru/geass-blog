import request from '../utils/request';
import tags from '../../mock/tags';

const response = { status: 200 };
export function queryTags() {
  response.data = tags;
  return response;
}

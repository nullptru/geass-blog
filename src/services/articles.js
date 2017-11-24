import request from '../utils/request';
import { chargings, storerooms, motions } from '../../mock/articles';
import latestPosts from '../../mock/latestPosts';

const response = { status: 200 };
export function queryArticles(params) {
  if (params.type) {
    switch (params.type) {
      case 'storeroom': response.data = storerooms; break;
      case 'chargins': response.data = chargings; break;
      case 'motions': response.data = motions; break;
      default: response.data = []; break;
    }
  } else if (params.tag) {
    response.data = chargings;
  } else {
    response.data = chargings.concat(storerooms).concat(motions);
  }
  return response;
}

export function querySingleArticle(params) {
  response.data = chargings[0];
  return response;
}

export function queryLatestArticles() {
  response.data = latestPosts;
  return response;
}

export function search(params) {
  response.data = motions;
  return response;
}

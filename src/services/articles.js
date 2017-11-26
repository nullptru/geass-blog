// import request from '../utils/request';
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
  const { id } = params;
  const all = chargings.concat(storerooms).concat(motions);
  [response.data] = all.filter(article => id === article.id);
  return response;
}

export function queryLatestArticles() {
  response.data = latestPosts;
  return response;
}

export function search(params) {
  const query = params;
  response.data = motions;
  response.query = query;
  return response;
}

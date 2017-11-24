import request from '../utils/request';
import { chargings, storerooms, motions } from 'mock/articles';

export function queryArticles() {
  return chargings.concat(storerooms).concat(motions);
}

export function queryArticlesByType(type) {
  switch (type) {
    case 'storeroom': return storerooms;
    case 'chargins': return chargings;
    case 'motions': return motions;
    default: return [];
  }
}

export function queryArticlesByTag(tag) {
  return chargings;
}

export function querySingleArticle(id) {
  return chargings[0];
}

export function getLatestPosts() {
  return storerooms;
}

export function search(query) {
  return motions;
}

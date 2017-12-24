import axios from 'axios';
import pathToRegexp from 'path-to-regexp';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const fetchRequest = (options) => {
  let { url } = options;
  const { data } = options;
  const { method = 'get', type = undefined } = options;

  const cloneData = { ...data };

  try {
    let domin = '';
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/);
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url);
    for (const item of match) {
      if (item instanceof Object && !(item.name in data)) {
        cloneData[item.name] = '*empty*';
      }
    }
    url = pathToRegexp.compile(url)(data);
    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = url.replace(/\*empty\*/g, '');
    url = domin + url;
  } catch (e) {
    throw e;
  }

  if (type === 'formData') {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return axios.post(url, data, headers);
  }
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(url, cloneData);
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
  return fetchRequest(options)
    .then(checkStatus)
    .then(resData => resData.data)
    .catch(err => ({ err }));
}

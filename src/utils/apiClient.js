import fetch from 'isomorphic-unfetch'

const baseUrl = "http://elasticsearch.yellowpages.co.za/";

const apiClient = {
  Urls: {
    baseUrl,
    getwhatAutocomplete: baseUrl + "api/Search/getWhatInfo",
    getwhereAutocomplete: baseUrl + "api/Search/getWhereInfo",
    getSearchResults: baseUrl + "api/search/getSearchResults",
  },

  make: function (url, method, params) {
    if (method == 'POST') {
      return fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(params),
      })
        .then(response => response.json())
        .catch(e => e);
    }
    if (method == 'GET') {
      return fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .catch(e => e);
    }
  },

  post: function (url, params) {
    return this.make(url, 'POST', params);
  },

  get: function (url, params) {
    return this.make(url, 'GET', params);
  },
};

export default apiClient;

import 'whatwg-fetch';
import { stringify } from 'query-string';
import merge from 'lodash/merge';
import { apiUrl } from 'config';
import { getToken } from 'utils/localStorage';

export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const error = new Error(`${response.status} ${response.statusText}`);
  error.response = response;
  throw error;
};

export const parseJSON = response => response.json();

export const parseSettings = ({ method = 'get', data, locale, ...otherSettings } = {}) => {
  const headers = {
    Accept: 'application/json',
    'Accept-Language': locale,
  };
  const authToken = getToken();
  if (authToken) {
    headers.Authorization = `Token ${authToken}`;
  }
  if (!otherSettings.isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  const settings = {
    body: data ? (otherSettings.isFormData ? data : JSON.stringify(data)) : undefined,
    method,
    headers,
    ...otherSettings,
  };
  return settings;
};

export const parseEndpoint = (endpoint, params) => {
  const baseUrl = 'http://localhost:8000/';
  const url = `${baseUrl}${endpoint}`;
  const querystring = params ? `?${stringify(params)}` : '';
  return `${url}${querystring}`;
};

const api = {};

api.request = (endpoint, { params, ...settings } = {}) =>
  fetch(parseEndpoint(endpoint, params), parseSettings(settings))
    .then(checkStatus)
    .then(parseJSON)

;['delete'].forEach((method) => {
  api[method] = (endpoint, settings) => api.request(endpoint, { method, ...settings });
})

;['get'].forEach((method) => {
  api[method] = (endpoint, params, settings) => api.request(endpoint, { params, method, ...settings });
})

;['post', 'put', 'patch'].forEach((method) => {
  api[method] = (endpoint, data, settings) => api.request(endpoint, { method, data, ...settings });
});

api.create = (settings = {}) => ({
  settings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Token ${token}`,
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    };
  },

  request(endpoint, settings) {
    return api.request(endpoint, merge({}, this.settings, settings));
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: 'post', data, ...settings });
  },

  get(endpoint, params, settings) {
    return this.request(endpoint, { params, method: 'get', ...settings });
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: 'put', data, ...settings });
  },

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: 'patch', data, ...settings });
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: 'delete', ...settings });
  },
});

export default api;

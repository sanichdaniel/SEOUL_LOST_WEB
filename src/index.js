import 'react-hot-loader/patch';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from 'store/configure';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';

import routes from 'routes';

const baseHistory = useRouterHistory(createHistory)({ basename: process.env.PUBLIC_PATH });
const store = configureStore({}, baseHistory);
const history = syncHistoryWithStore(baseHistory, store);
const root = document.getElementById('app');

const renderApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(renderApp(), root);

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes');
    render(renderApp(), root);
  });
}

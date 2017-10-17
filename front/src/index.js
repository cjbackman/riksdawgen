import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from './layout/Layout.js';
import { Store } from './store.js';
import './styles/_main.scss';


ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
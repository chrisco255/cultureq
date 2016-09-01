'use strict';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './root';
import store from './store/configureStore';
const history = syncHistoryWithStore(browserHistory, store);
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const WrappedRoot = () => (
  <MuiThemeProvider>
    <Root store={store} history={history} />
  </MuiThemeProvider>
);

render(
  <WrappedRoot />,
  document.getElementById('main')
);

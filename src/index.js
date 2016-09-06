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
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  toggle: {
    thumbOnColor: 'rgb(255, 153, 36)',
    thumbOffColor: 'rgb(255, 153, 36)',
    trackOnColor: 'rgb(250, 197, 26)',
    trackOffColor: 'rgb(189, 189, 189)'
  }
});

const WrappedRoot = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Root store={store} history={history} />
  </MuiThemeProvider>
);

render(
  <WrappedRoot />,
  document.getElementById('main')
);

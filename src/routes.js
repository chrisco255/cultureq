import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import SignUpPage from './containers/SignUpPage';
import DashboardPage from './containers/DashboardPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="signup" component={SignUpPage} />
    <Route path="dashboard" component={DashboardPage} />
  </Route>
)

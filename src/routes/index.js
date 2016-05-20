import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../applayout/App.component';
import HomePage from './home/HomePage.container.js';
import SignUpPage from './signup/SignUpPage.container.js';
import DashboardPage from './dashboard/DashboardPage.container.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="signup" component={SignUpPage} />
    <Route path="dashboard" component={DashboardPage} />
  </Route>
)
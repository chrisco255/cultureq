import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../applayout/App.component';
import HomePage from './home/HomePage.component';
import SignUpPage from './signup/SignUpPage.component.js';
import DashboardPage from './dashboard/DashboardPage.component';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="signup" component={SignUpPage} />
    <Route path="dashboard" component={DashboardPage} />
  </Route>
)
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../app_layout/App.component';
import HomePage from './home/HomePage.container.js';
import CompanyPage from './company/CompanyPage.container.js';
import DashboardPage from './dashboard/DashboardPage.container.js';
import ProfilePage from './profile/ProfilePage.container.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="company" component={CompanyPage} />
    <Route path="dashboard" component={DashboardPage} />
    <Route path="profile" component={ProfilePage} />
  </Route>
)

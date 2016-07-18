import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../app_layout/App.component';
import HomePage from './home/HomePage.container.js';
import CompanyPage from './company/CompanyPage.container.js';
import DashboardPage from './dashboard/DashboardPage.container.js';
import ProfilePage from './profile/ProfilePage.container.js';
import PillarPage from './pillar/PillarPage.container.js';
import AnalyticsPage from './analytics/AnalyticsPage.container.js';
import ContentPage from './content/ContentPage.container.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="company" component={CompanyPage} />
    <Route path="analytics" component={AnalyticsPage} />
    <Route path="dashboard" component={DashboardPage} />
    <Route path="profile" component={ProfilePage} />
    <Route path="pillar" component={PillarPage} />
    <Route path="content" component={ContentPage} />
  </Route>
)

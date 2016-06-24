import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../app_layout/App.component';
import HomePage from './home/HomePage.container.js';
import CompanyPage from './company/CompanyPage.container.js';
import DashboardPage from './dashboard/DashboardPage.container.js';
import ProfilePage from './profile/ProfilePage.container.js';
import ProductPage from './product/ProductPage.container.js';
import ProposalPage from './proposal/ProposalPage.container.js';
import PillarsPage from './pillars/PillarsPage.container.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="company" component={CompanyPage} />
    <Route path="product" component={ProductPage} />
    <Route path="proposal" component={ProposalPage} />
    <Route path="dashboard" component={DashboardPage} />
    <Route path="profile" component={ProfilePage} />
    <Route path="pillars" component={PillarsPage} />
  </Route>
)

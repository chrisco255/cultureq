import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/HomePage';
import SignUp from './containers/SignUpPage';
import Dashboard from './containers/DashboardPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="signup" component={SignUp} />
    <Route path="dashboard" component={Dashboard} />
  </Route>
)

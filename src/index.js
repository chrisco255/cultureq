'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
//import agent from './agent';s

// Page level view Components
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

// Routes and initial mount
ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="signup" component={SignUp} />
				<Route path="dashboard" component={Dashboard} />
			</Route>
		</Router>
	</Provider>
), document.getElementById('main'));
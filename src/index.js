'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
//import agent from './agent';

//import { App, Home, SignUp, Dashboard } from './components'
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

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
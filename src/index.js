'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
//import agent from './agent';

//import { App, Home, SignUp } from './components'
import App from './components/App';
import Home from './components/Home';
import SignUp from './components/SignUp';

ReactDOM.render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
			</Route>
			<Route path="/signup" component={SignUp} />
		</Router>
	</Provider>
), document.getElementById('main'));
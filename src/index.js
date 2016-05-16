'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//import agent from './agent';
//import history from 'history';
//import store from './store';

import App from './components/App';
import Home from './components/Home';

ReactDOM.render((
	<Provider >
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home} />
			</Route>
		</Router>
	</Provider>
), document.getElementById('main'));
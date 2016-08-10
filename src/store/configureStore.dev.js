import { applyMiddleware, createStore, composes } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from '../reducers/index';
import DevTools from '../root/DevTools.component.js';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import configureSocket from '../socket/configureSocket';
import rootSaga from '../sagas';
import Auth0Lock from 'auth0-lock';

function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware();
	const officalRouterMiddleware = routerMiddleware(browserHistory);

	const store = createStore(
		reducer,
		 initialState,
		composes(
			applyMiddleware(sagaMiddleware, officalRouterMiddleware),

			window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
		)
	);

	configureSocket(store);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers/index', () => {
			const nextRootReducer = require('../reducers/index').default;

			store.replaceReducer(nextRootReducer);
		});
	}

	store.runSaga = sagaMiddleware.run;
	store.close = () => store.dispatch(END);
	return store;
}

function getLogin () {
	let token = null;
	let profile = null;
	try {
		token = window.localStorage.getItem('userToken');
		profile = window.localStorage.getItem('userProfile');
		profile = JSON.parse(profile);
	} catch(err) {
		console.log('Failed to read userToken/userProfile from localStorage ', err);
	}

	return {
		token,
		profile,
		lock: new Auth0Lock('Ty9ofoTxjYJqOlCSnqKhaSDWPurI3DzU', 'ultilabs.auth0.com')
	};

}

const initialState = {
	user: getLogin()
};

const store = configureStore(initialState);
store.runSaga(rootSaga);

export default store;

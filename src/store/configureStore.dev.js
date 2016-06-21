import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/index';
import DevTools from '../root/DevTools.component.js';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import configureSocket from '../socket/configureSocket';
import rootSaga from '../sagas';

function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware();
	const officalRouterMiddleware = routerMiddleware(browserHistory);

	const store = createStore(
		reducer,
		// initialState,
		compose(
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
};

const store = configureStore();
store.runSaga(rootSaga);

export default store;

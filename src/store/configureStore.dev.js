import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/index';
import DevTools from '../app_root/DevTools.component.js';

export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(sagaMiddleware),
			window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
		)
	);

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

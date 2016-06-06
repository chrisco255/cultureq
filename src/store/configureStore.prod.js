import { applyMiddleware, createStore } from 'redux';
import reducer from '../reducers/index';
import createSagaMiddleware, { END } from 'redux-saga';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware();
	const officalRouterMiddleware = routerMiddleware(browserHistory);

	const store = createStore(
		reducer,
		initialState,
		applyMiddleware(sagaMiddleware, officalRouterMiddleware)
	);

	store.runSaga = sagaMiddleware.run;
	store.close = () => store.dispatch(END);
	return store;
};

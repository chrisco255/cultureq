import { applyMiddleware, createStore } from 'redux';
import reducer from '../reducers/index';
import createSagaMiddleware, { END } from 'redux-saga';

export default function configureStore(initialState) {
	const sagaMiddleware = createSagaMiddleware();

	const store = createStore(
		reducer,
		initialState,
		applyMiddleware(sagaMiddleware)
	);

	store.runSaga = sagaMiddleware.run;
	store.close = () => store.dispatch(END);
	return store;
};

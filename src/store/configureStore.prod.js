import { applyMiddleware, createStore } from 'redux';
// import { promiseMiddleware } from '../middleware';
import reducer from '../reducers/reducer';
import createSagaMiddleware, { END } from 'redux-saga';


export default function configureStore(initialState) {
    const store = createStore(
        reducer,
        initialState,
        applyMiddleware(createSagaMiddleware)
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
};

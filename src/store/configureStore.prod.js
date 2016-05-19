import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from '../middleware';
import reducer from '../reducers/reducer';

export default function configureStore(initialState) {
    return createStore(
        reducer,
        initialState,
        applyMiddleware(promiseMiddleware)
    );
};

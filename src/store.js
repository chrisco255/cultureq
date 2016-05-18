import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducers/reducer';

//const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

//const store = createStore(reducer, middleware);
const store = createStore(reducer);

export default store;
import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';
import reducer from './reducers/reducer';

const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);

// const store = (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer, middleware);


export default store;
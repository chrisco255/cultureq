import { applyMiddleware, createStore, compose } from 'redux';
// import { promiseMiddleware } from '../middleware';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers/reducer';
import DevTools from '../containers/DevTools';



export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware),
            DevTools.instrument()
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/reducer', () => {
            const nextRootReducer = require('../reducers/reducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
};

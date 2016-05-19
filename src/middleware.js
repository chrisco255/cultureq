'use strict';

// import agent from './agent';

function isPromise(v) {
	return v && typeof v.then === 'function';
}

const promiseMiddleware = store => next => action => {
	if (isPromise(action.payload)) {
        store.dispatch({
            type: 'ASYNC_START',
            subtype: action.type,
            promise: action.payload
        });

		action.payload
            .then( res => {
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch({ type: 'ASYNC_END', promise: action.payload });
                store.dispatch(action);
			})
            .catch( error => {
				console.log('ERROR', error);
				action.error = true;
				action.payload = error;
                store.dispatch({ type: 'ASYNC_END', promise: action.payload });
				store.dispatch(action);
			});
	} else {
        next(action);
    }
};


// const localStorageMiddleware = store => next => action => {
// 	if (action.type === 'REGISTER' || action.type === 'LOGIN') {
// 		if (!action.error) {
// 			window.localStorage.setItem('jwt', action.payload.user.token);
// 			agent.setToken(action.payload.user.token);
// 		}
// 	} else if (action.type === 'LOGOUT') {
// 		window.localStorage.setItem('jwt', '');
// 		agent.setToken(null);
// 	}
//
// 	next(action);
// };

export { promiseMiddleware }
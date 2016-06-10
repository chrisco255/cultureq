import { put, call, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from '../../reducers/product/Product.actions';
import axios from 'axios';

const fetch = (query) => {
	return axios.get('http://localhost:8000/graphql', {query})
							.then( response => response.data.data );
}


export function* fetchProducts(action) {
	try {
		const payload = yield call(fetch, action.payload.query);
		yield put( {type: ActionTypes.FETCH_PRODUCTS_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.FETCH_PRODUCTS_FAILED, error} );
	}
}

export default function* watchFetchProducts() {
	yield* takeEvery(ActionTypes.FETCH_PRODUCTS, fetchProducts);
}



// TODO: fill this in for the creation of products 
// const fetch = (body) => {
// 	return axios.post('http://localhost:8000/product', body)
// 							.then( response => response.data.data );
// }
//
//
// export function* fetchProducts(action) {
// 	try {
// 		const payload = yield call(fetch, action.payload.query);
// 		yield put( {type: ActionTypes.FETCH_PRODUCTS_SUCCEEDED, payload } );
// 	} catch (error) {
// 		yield put( {type: ActionTypes.FETCH_PRODUCTS_FAILED, error} );
// 	}
// }
//
// export default function* watchFetchProducts() {
// 	yield* takeEvery(ActionTypes.FETCH_PRODUCTS, fetchProducts);
// }

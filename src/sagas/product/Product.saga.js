import { put, call, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import * as ActionTypes from '../../reducers/product/Product.actions';
import axios from 'axios';

//fetching of products
const fetch = (query) => {
	return axios.get(`http://localhost:8000/graphql?query=${encodeURIComponent(query)}`)
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


export function* watchFetchProducts() {
	yield* takeEvery(ActionTypes.FETCH_PRODUCTS, fetchProducts);
}

//creation of products
const post = (body) => {
	return axios.post('http://localhost:8000/product', body);
}

export function* submitProduct(action) {
	try {
		const payload = yield call(post, {
			type: 'command.PRODUCT_START',
			payload: action.payload
		});
		yield put( {type: ActionTypes.PRODUCT_SUBMIT_SUCCEEDED, payload});
	} catch (error) {
		yield put ( {type: ActionTypes.PRODUCT_SUBMIT_FAILED, error});
	}
}

export function* watchSubmitProduct() {
	yield* takeEvery(ActionTypes.PRODUCT_SUBMITTED, submitProduct);
}

import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';

import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/tenant/Tenant.actions';

const post = (body) => {
	console.log("Posting create tenant body - ", body);
	return axios.post('http://localhost:8000/tenants', body).then( response => response.data );
}

export function* addTenant(action) {
	try {
		const payload = yield call(post, {
			type: 'command.ADD_TENANT',
			payload: action.payload
		});
		// const payload = {
		// 	type: 'command.ADD_TENANT',
		// 	payload: action.payload
		// };
		console.log('received payload from call - ', payload);
		yield put( {type: ActionTypes.TENANT_ADD_SUCCEEDED, payload } );
		yield put( push('/dashboard') );
	} catch (error) {
		yield put( {type: ActionTypes.TENANT_ADD_FAILED, error} );
	}
}

export default function* watchTenantSubmitted() {
	yield* takeEvery(ActionTypes.TENANT_ADDED, addTenant);
}

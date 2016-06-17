import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';

import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/company/Company.actions';

const post = (body) => {
	console.log("Posting create tenant body - ", body);
	return axios.post('http://localhost:8000/tenants', body).then( response => response.data );
}

export function* companySubmit(action) {
	try {
		const payload = yield call(post, {
			type: 'command.TENANT_CREATE',
			payload: action.payload
		});
		console.log('received payload from call - ', payload);
		yield put( {type: ActionTypes.COMPANY_SUBMIT_SUCCEEDED, payload } );
		yield put( push('/tenants') );
	} catch (error) {
		yield put( {type: ActionTypes.COMPANY_SUBMIT_FAILED, error} );
	}
}

export default function* watchCompanySubmitted() {
	yield* takeEvery(ActionTypes.COMPANY_SUBMITTED, companySubmit);
}

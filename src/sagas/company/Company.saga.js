import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/company/Company.actions';

export function* companySubmit(action) {
	try {
		yield call(delay, 2000);
		const payload = action.payload;
		yield put( {type: ActionTypes.COMPANY_SUBMIT_SUCCEEDED, payload } );
		yield put( push('/tenants') );
	} catch (error) {
		yield put( {type: ActionTypes.COMPANY_SUBMIT_FAILED, error} );
	}
}

export default function* watchCompanySubmitted() {
	yield* takeEvery(ActionTypes.COMPANY_SUBMITTED, companySubmit);
}

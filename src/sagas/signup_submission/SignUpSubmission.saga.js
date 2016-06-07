import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/company/Company.actions';

export function* submitSignUp(action) {
	try {
		yield call(delay, 2000);
		const payload = action.payload;
		yield put( {type: ActionTypes.SIGN_UP_SUCCEEDED, payload } );
		yield put( push('/dashboard') );
	} catch (error) {
		yield put( {type: ActionTypes.SIGN_UP_FAILED, error} );
	}
}

export default function* watchSignUpSubmission() {
	yield* takeEvery(ActionTypes.SIGN_UP_SUBMITTED, submitSignUp);
}

import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

import * as ActionTypes from '../../routes/signup/SignUp.actions.js';

export function* submitSignUp(action) {
	try {
		yield call(delay, 2000);
		// const errorType = 'Sign up failed.';
		// const errors = {
		// 	companyName: 'Company does not exist',
		// 	address: 'Wrong address'
		// };
		// throw({ errorType, errors });
		const payload = action.payload;
		// const payload = yield call(Api.fetchSignUpForm, action.payload);

		yield put( {type: ActionTypes.SIGN_UP_SUCCEEDED, payload} );
	} catch (error) {
		yield put( {type: ActionTypes.SIGN_UP_FAILED, error} );
	}
}

export default function* watchSignUpSubmission() {
	yield* takeEvery(ActionTypes.SIGN_UP_SUBMITTED, submitSignUp);
}

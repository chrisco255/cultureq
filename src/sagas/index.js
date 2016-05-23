'use strict';
import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

import * as ActionTypes from '../routes/signup/SignUp.actions';



function* submitSignUp(action) {
  try {
    yield delay(2000);
    let payload;
    if( Math.random() > .50 ) {
      const errorType = 'Sign up failed.';
      const errors = {
        companyName: 'Company does not exist',
        address: 'Wrong address'
      };

      throw({ errorType, errors });
    } else {
      payload = action.payload;
    }
    // const payload = yield call(Api.fetchSignUpForm, action.payload);
    yield put({type: ActionTypes.SIGN_UP_SUCCEEDED, payload});
  } catch (error) {
    yield put({type: ActionTypes.SIGN_UP_FAILED, error});
  }
}

function* watchSignUpSubmission() {
  yield* takeEvery(ActionTypes.SIGN_UP_SUBMITTED, submitSignUp);
}

export default function* rootSaga() {
  yield [ watchSignUpSubmission() ];
}

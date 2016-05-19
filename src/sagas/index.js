'use strict';

import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
// import { api } from '../services';
import * as actions from '../actions';


function* submitSignUp(action) {
  try {
    const payload = action.payload;
    // const payload = yield call(Api.fetchSignUpForm, action.payload);
    yield delay(2000)
    yield put({type: 'SIGN_UP_SUCCEEDED', payload});
  } catch (error) {
    yield put({type: 'SIGN_UP_FAILED', error});
  }
}

function* watchSignUpSubmission() {
  yield* takeEvery('SIGN_UP_SUBMITTED', submitSignUp);
}


export default function* rootSaga() {
  yield [ watchSignUpSubmission() ];
}

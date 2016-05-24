'use strict';
import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

import * as ActionTypes from '../routes/signup/SignUp.actions.js';
import watchSignUpSubmission from './signup_submission/SignUpSubmission.saga';

export default function* rootSaga() {
  yield [ watchSignUpSubmission() ];
}

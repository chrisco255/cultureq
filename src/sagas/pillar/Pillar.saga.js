import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';

import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/pillar/Pillar.actions';

const post = (body) => {
	console.log("Posting create pillar body - ", body);
	return axios.post('http://localhost:8000/pillars', body).then( response => response.data );
}

export function* addPillar(action) {
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

export default function* watchPillarSubmitted() {
	yield* takeEvery(ActionTypes.TENANT_ADDED, addPillar);
}

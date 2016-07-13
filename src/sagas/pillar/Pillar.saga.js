import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';
import { push } from 'react-router-redux';
import * as ActionTypes from '../../reducers/pillar/Pillar.actions';

const post = (body) => {
	console.log("Posting pillar body - ", body);
	return axios.post('/api/pillar', body).then( response => response.data );
}

export function* pillarCreate(action) {
	try {
		const payload = yield call(post, {
			type: 'command.PILLAR_CREATE',
			payload: action.payload.pillar
		});
		console.log('received payload from call - ', payload);
		yield put( {type: ActionTypes.PILLAR_CREATE_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.PILLAR_CREATE_FAILED, error} );
	}
}
export function* watchPillarCreateSubmitted() {
	yield* takeEvery(ActionTypes.PILLAR_CREATE_SUBMITTED, pillarCreate);
}

export function* pillarDelete(action) {
	try {
		console.log('inside saga - pillarDelete');
		const payload = yield call(post, {
			type: 'command.PILLAR_DELETE',
			payload: action.payload.pillar
		});
		console.log('received payload from call - ', payload);
		yield put( {type: ActionTypes.PILLAR_DELETE_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.PILLAR_DELETE_FAILED, error} );
	}
}
export function* watchPillarDeleteSubmitted() {
	yield* takeEvery(ActionTypes.PILLAR_DELETE_SUBMITTED, pillarDelete);
}

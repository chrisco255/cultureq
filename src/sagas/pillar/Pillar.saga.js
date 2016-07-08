import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';

import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/pillar/Pillar.actions';

const post = (body) => {
	console.log("Posting create pillar body - ", body);
	return axios.post('/api/pillar', body).then( response => response.data );
}

export function* addPillarList(action) {
	try {
		console.log('in saga');
		const payload = yield call(post, {
			type: 'command.ADD_PILLAR_LIST',
			payload: action.payload
		});
		console.log('received payload from call - ', payload);
		yield put( {type: ActionTypes.ADD_PILLAR_LIST_SUCCEEDED, payload } );
		yield put( push('/content') );
	} catch (error) {
		yield put( {type: ActionTypes.ADD_PILLAR_LIST_FAILED, error} );
	}
}

export default function* watchPillarListSubmitted() {
	yield* takeEvery(ActionTypes.ADD_PILLAR_LIST, addPillarList);
}

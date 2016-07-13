import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';

import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/content/Content.actions';

const post = (body) => {
	console.log("Posting create content body - ", body);
	return axios.post('/api/content', body).then( response => response.data );
}

export function* addContentList(action) {
	try {
		console.log('in saga');
		const payload = yield call(post, {
			type: 'command.ADD_CONTENT_LIST',
			payload: action.payload
		});
		console.log('received payload from call - ', payload);
		yield put( {type: ActionTypes.ADD_CONTENT_LIST_SUCCEEDED, payload } );
		yield put( push('/dashboard') );
	} catch (error) {
		yield put( {type: ActionTypes.ADD_CONTENT_LIST_FAILED, error} );
	}
}

export default function* watchContentListSubmitted() {
	yield* takeEvery(ActionTypes.ADD_CONTENT_LIST, addContentList);
}

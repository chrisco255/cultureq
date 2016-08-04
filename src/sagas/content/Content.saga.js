import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';
import { push } from 'react-router-redux';
import * as ActionTypes from '../../reducers/content/Content.actions';

// Fetch
const fetch = (query) => {
	return axios.post('/api/graphql', { query })
							.then( response => response.data.data );
};

export function* fetchContents(action) {
	try {
		const payload = yield call(fetch, action.payload.query);
		yield put( {type: ActionTypes.FETCH_CONTENTS_SUCCEEDED, payload} );
	} catch (error) {
		yield put( {type: ActionTypes.FETCH_CONTENTS_FAILED, error } );
	}
}
export function* watchFetchContentsSubmitted() {
	yield* takeEvery(ActionTypes.FETCH_CONTENTS_SUBMITTED, fetchContents);
}

export function* contentCreate(action) {
	try {
		const { type, pillarId, isDeleted, data } = action.payload.content;
		const createResponse = yield call(fetch, `
			mutation {
			  mutation: CONTENT_CREATE(
			    type: ${type.toUpperCase()}
					pillarId: "${pillarId}"
					isDeleted: ${isDeleted}
					data: {
						title: "${data.title}"
						description: "${data.description}"
						url: "${data.url}"
						quote: "${data.quote}"
						author: "${data.author}"
						recipient: "${data.recipient}"
						recipientPosition: "${data.recipientPosition}"
					}
			  ) {
			    _id
					type
					pillarId
					isDeleted
					data {
						title
						description
						url
						quote
						author
						recipient
						recipientPosition
					}
			  }
			}
		`);
		const payload = createResponse.mutation;
		yield put( {type: ActionTypes.CONTENT_CREATE_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.CONTENT_CREATE_FAILED, error} );
	}
}
export function* watchContentCreateSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_CREATE_SUBMITTED, contentCreate);
}

export function* contentDelete(action) {
	try {
		const { _id, type, pillarId, isDeleted, data } = action.payload.content;
		const deleteResponse = yield call(fetch, `
			mutation {
			  mutation: CONTENT_DELETE(
					_id: "${_id}"
			    type: ${type.toUpperCase()}
					pillarId: "${pillarId}"
					isDeleted: ${isDeleted}
					data: {
						title: "${data.title}"
						description: "${data.description}"
						url: "${data.url}"
						quote: "${data.quote}"
						author: "${data.author}"
						recipient: "${data.recipient}"
						recipientPosition: "${data.recipientPosition}"
					}
			  ) {
			    _id
					type
					pillarId
					isDeleted
					data {
						title
						description
						url
						quote
						author
						recipient
						recipientPosition
					}
			  }
			}
		`);
		const payload = deleteResponse.mutation;
		yield put( {type: ActionTypes.CONTENT_DELETE_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.CONTENT_DELETE_FAILED, error} );
	}
}
export function* watchContentDeleteSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_DELETE_SUBMITTED, contentDelete);
}

export function* contentTitleChange(action) {
	try {
		const { contentTitle, index } = action.payload;
		const titleChangeResponse = yield call(fetch, `
			mutation {
				mutation: CONTENT_DATA_CHANGE(
					data: {
						title: "${contentTitle}"
					}
					index: ${index}
				) {
			    _id
					type
					pillarId
					isDeleted
					data {
						title
						description
						url
						quote
						author
						recipient
						recipientPosition
					}
			  }
			}`);
		const payload = titleChangeResponse.mutation;
		yield put( {type: ActionTypes.CONTENT_TITLE_CHANGE_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.CONTENT_TITLE_CHANGE_FAILED, error} );
	}
}
export function* watchContentTitleChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_TITLE_CHANGE_SUBMITTED, contentTitleChange);
}

export function* contentDescriptionChange(action) {
	try {
		const { contentDescription, index } = action.payload;
		const descriptionChangeResponse = yield call(fetch, `
			mutation {
				mutation: CONTENT_DATA_CHANGE(
					data: {
						description: "${contentDescription}"
					}
					index: ${index}
				) {
			    _id
					type
					pillarId
					isDeleted
					data {
						title
						description
						url
						quote
						author
						recipient
						recipientPosition
					}
			  }
			}`);
		const payload = descriptionChangeResponse.mutation;
		yield put( {type: ActionTypes.CONTENT_DESCRIPTION_CHANGE_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.CONTENT_DESCRIPTION_CHANGE_FAILED, error} );
	}
}
export function* watchContentDescriptionChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_DESCRIPTION_CHANGE_SUBMITTED, contentDescriptionChange);
}

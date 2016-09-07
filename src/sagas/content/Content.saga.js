import { put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import * as ActionTypes from '../../reducers/content/Content.actions';
import getCreateContentMutationString from './ContentCreateMutationString';

// Fetch
const fetch = (query) => {
    return axios.post('/api/graphql', {
            query
        })
        .then(response => response.data.data);
};

export function* fetchContents(action) {
    try {
        const payload = yield call(fetch, action.payload.query);
        yield put({
            type: ActionTypes.FETCH_CONTENTS_SUCCEEDED,
            payload
        });
    } catch (error) {
        yield put({
            type: ActionTypes.FETCH_CONTENTS_FAILED,
            error
        });
    }
}
export function* watchFetchContentsSubmitted() {
    yield* takeEvery(ActionTypes.FETCH_CONTENTS_SUBMITTED, fetchContents);
}

export function* contentCreate(action) {
	try {
		const { type, pillarId, isDeleted, data } = action.payload.content;
		const createContentMutation = getCreateContentMutationString(type.toUpperCase(), pillarId, isDeleted, data);
		const createResponse = yield call(fetch, createContentMutation);
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

export function* contentDataChange(action) {
	try {
    const { type, payload } = action;
		let contentData = '';
		let dataType = '';
		if (type === 'CONTENT_AUTHOR_CHANGE_SUBMITTED') {
			contentData = payload.contentAuthor;
			dataType = 'author';
		} else if (type === 'CONTENT_QUOTE_CHANGE_SUBMITTED') {
			contentData = payload.contentQuote;
			dataType = 'quote';
		} else if (type === 'CONTENT_URL_CHANGE_SUBMITTED') {
			contentData = payload.contentUrl;
			dataType = 'url';
		} else if (type === 'CONTENT_DESCRIPTION_CHANGE_SUBMITTED') {
			contentData = payload.contentDescription;
			dataType = 'description';
		} else if (type === 'CONTENT_TITLE_CHANGE_SUBMITTED') {
			contentData = payload.contentTitle;
			dataType = 'title';
		} else if (type === 'CONTENT_RECIPIENT_CHANGE_SUBMITTED') {
			contentData = payload.contentRecipient;
			dataType = 'recipient';
		} else if (type === 'CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED') {
			contentData = payload.contentRecipientPosition;
			dataType = 'recipientPosition';
		} else {
			console.log('😳');
		}
		const dataChangeResponse = yield call(fetch, `
			mutation {
				mutation: CONTENT_DATA_CHANGE(
          _id: "${payload._id}"
					data: {
						${dataType}: "${contentData}"
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
			}`);
		const { mutation } = dataChangeResponse;
		if (type === 'CONTENT_AUTHOR_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_AUTHOR_CHANGE_SUCCEEDED, mutation } );
		} else if (type === 'CONTENT_QUOTE_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_QUOTE_CHANGE_SUCCEEDED, mutation } );
		} else if (type === 'CONTENT_URL_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_URL_CHANGE_SUCCEEDED, mutation } );
		} else if (type === 'CONTENT_DESCRIPTION_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_DESCRIPTION_CHANGE_SUCCEEDED, mutation } );
		} else if (type === 'CONTENT_TITLE_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_TITLE_CHANGE_SUCCEEDED, mutation } );
		} else if (type === 'CONTENT_RECIPIENT_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_RECIPIENT_CHANGE_SUCCEEDED, mutation } );
		} else if (type === 'CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_RECIPIENT_POSITION_CHANGE_SUCCEEDED, mutation } );
		} else {
			console.log('😳');
		}
	} catch (error) {
    const { type } = action;
		if (type === 'CONTENT_AUTHOR_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_AUTHOR_CHANGE_FAILED, error} );
		} else if (type === 'CONTENT_QUOTE_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_QUOTE_CHANGE_FAILED, error} );
		} else if (type === 'CONTENT_URL_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_URL_CHANGE_FAILED, error} );
		} else if (type === 'CONTENT_DESCRIPTION_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_DESCRIPTION_CHANGE_FAILED, error} );
		} else if (type === 'CONTENT_TITLE_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_TITLE_CHANGE_FAILED, error} );
		} else if (type === 'CONTENT_RECIPIENT_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_RECIPIENT_CHANGE_FAILED, error} );
		} else if (type === 'CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED') {
			yield put( {type: ActionTypes.CONTENT_RECIPIENT_POSITION_CHANGE_FAILED, error} );
		} else {
			console.log(error);
		}
	}
}
export function* watchContentAuthorChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_AUTHOR_CHANGE_SUBMITTED, contentDataChange);
}
export function* watchContentQuoteChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_QUOTE_CHANGE_SUBMITTED, contentDataChange);
}
export function* watchContentUrlChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_URL_CHANGE_SUBMITTED, contentDataChange);
}
export function* watchContentDescriptionChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_DESCRIPTION_CHANGE_SUBMITTED, contentDataChange);
}
export function* watchContentTitleChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_TITLE_CHANGE_SUBMITTED, contentDataChange);
}
export function* watchContentRecipientChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_RECIPIENT_CHANGE_SUBMITTED, contentDataChange);
}
export function* watchContentRecipientPositionChangeSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED, contentDataChange);
}

export const CONTENT_CREATE_SUBMITTED = 'CONTENT_CREATE_SUBMITTED';
export const CONTENT_CREATE_SUCCEEDED = 'CONTENT_CREATE_SUCCEEDED';
export const CONTENT_CREATE_FAILED = 'CONTENT_CREATE_FAILED';

export const CONTENT_DELETE_SUBMITTED = 'CONTENT_DELETE_SUBMITTED';
export const CONTENT_DELETE_SUCCEEDED = 'CONTENT_DELETE_SUCCEEDED';
export const CONTENT_DELETE_FAILED = 'CONTENT_DELETE_FAILED';

export const EDIT_CONTENT = 'EDIT_CONTENT';
export const FINISH_EDIT = 'FINISH_EDIT';
export const FORM_ENABLE = 'FORM_ENABLE';
export const FILTER_CONTENT = 'FILTER_CONTENT';

export const CONTENT_TITLE_CHANGE_SUBMITTED = 'CONTENT_TITLE_CHANGE_SUBMITTED';
export const CONTENT_TITLE_CHANGE_SUCCEEDED = 'CONTENT_TITLE_CHANGE_SUCCEEDED';
export const CONTENT_TITLE_CHANGE_FAILED = 'CONTENT_TITLE_CHANGE_FAILED';

export const CONTENT_DESCRIPTION_CHANGE_SUBMITTED = 'CONTENT_DESCRIPTION_CHANGE_SUBMITTED';
export const CONTENT_DESCRIPTION_CHANGE_SUCCEEDED = 'CONTENT_DESCRIPTION_CHANGE_SUCCEEDED';
export const CONTENT_DESCRIPTION_CHANGE_FAILED = 'CONTENT_DESCRIPTION_CHANGE_FAILED';

export const CONTENT_URL_CHANGE_SUBMITTED = 'CONTENT_URL_CHANGE_SUBMITTED';
export const CONTENT_URL_CHANGE_SUCCEEDED = 'CONTENT_URL_CHANGE_SUCCEEDED';
export const CONTENT_URL_CHANGE_FAILED = 'CONTENT_URL_CHANGE_FAILED';

export const CONTENT_QUOTE_CHANGE_SUBMITTED = 'CONTENT_QUOTE_CHANGE_SUBMITTED';
export const CONTENT_QUOTE_CHANGE_SUCCEEDED = 'CONTENT_QUOTE_CHANGE_SUCCEEDED';
export const CONTENT_QUOTE_CHANGE_FAILED = 'CONTENT_QUOTE_CHANGE_FAILED';

export const CONTENT_AUTHOR_CHANGE_SUBMITTED = 'CONTENT_AUTHOR_CHANGE_SUBMITTED';
export const CONTENT_AUTHOR_CHANGE_SUCCEEDED = 'CONTENT_AUTHOR_CHANGE_SUCCEEDED';
export const CONTENT_AUTHOR_CHANGE_FAILED = 'CONTENT_AUTHOR_CHANGE_FAILED';

export const CONTENT_RECIPIENT_CHANGE_SUBMITTED = 'CONTENT_RECIPIENT_CHANGE_SUBMITTED';
export const CONTENT_RECIPIENT_CHANGE_SUCCEEDED = 'CONTENT_RECIPIENT_CHANGE_SUCCEEDED';
export const CONTENT_RECIPIENT_CHANGE_FAILED = 'CONTENT_RECIPIENT_CHANGE_FAILED';

export const CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED = 'CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED';
export const CONTENT_RECIPIENT_POSITION_CHANGE_SUCCEEDED = 'CONTENT_RECIPIENT_POSITION_CHANGE_SUCCEEDED';
export const CONTENT_RECIPIENT_POSITION_CHANGE_FAILED = 'CONTENT_RECIPIENT_POSITION_CHANGE_FAILED';

export const FETCH_CONTENTS_SUBMITTED = 'FETCH_CONTENTS_SUBMITTED';
export const FETCH_CONTENTS_SUCCEEDED = 'FETCH_CONTENTS_SUCCEEDED';
export const FETCH_CONTENTS_FAILED = 'FETCH_CONTENTS_FAILED';

export function fetchContents({ query }) {
	return {
		type: FETCH_CONTENTS_SUBMITTED,
		payload: { query }
	};
}

/*
	Adds a content to the contents array
	Calls the saga to post to the content service
	to create the content
*/
export function createContent(content) {
	return {
		type: CONTENT_CREATE_SUBMITTED,
		payload: { content }
	};
}

/*
	 Removes a content from the contents array
	 and adds it back to the contents array
	 Calls the saga to post to the content service
	 and changes property, isDeleted: true
*/
export function deleteContent(content) {
	return {
		type: CONTENT_DELETE_SUBMITTED,
		payload: { content }
	};
}

/*
	Edit a content sets the defaultState of
	isEditing to true, to begin editing a
	content and which content
*/
export function editContent(content) {
	return {
		type: EDIT_CONTENT,
		payload: { content }
	};
}

export function finishEdit() {
	return {
		type: FINISH_EDIT,
		payload: {}
	};
}

export function formEnable(isCreatingContent, currentContentType) {
	return {
		type: FORM_ENABLE,
		payload: { isCreatingContent, currentContentType }
	};
}

export function setFilteredContents(filteredContents) {
	return {
		type: FILTER_CONTENT,
		payload: { filteredContents }
	};
}

export function titleChangeContent(contentTitle, _id) {
	return {
		type: CONTENT_TITLE_CHANGE_SUBMITTED,
		payload: { contentTitle, _id }
	};
}

export function descriptionChangeContent(contentDescription, _id) {
	return {
		type: CONTENT_DESCRIPTION_CHANGE_SUBMITTED,
		payload: { contentDescription, _id }
	};
}

export function urlChangeContent(contentUrl, _id) {
	return {
		type: CONTENT_URL_CHANGE_SUBMITTED,
		payload: { contentUrl, _id }
	};
}

export function quoteChangeContent(contentQuote, _id) {
	return {
		type: CONTENT_QUOTE_CHANGE_SUBMITTED,
		payload: { contentQuote, _id }
	};
}

export function authorChangeContent(contentAuthor, _id) {
	return {
		type: CONTENT_AUTHOR_CHANGE_SUBMITTED,
		payload: { contentAuthor, _id }
	};
}

export function recipientChangeContent(contentRecipient, _id) {
	return {
		type: CONTENT_RECIPIENT_CHANGE_SUBMITTED,
		payload: { contentRecipient, _id }
	};
}

export function recipientPositionChangeContent(contentRecipientPosition, _id) {
	return {
		type: CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED,
		payload: { contentRecipientPosition, _id }
	};
}

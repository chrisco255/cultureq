export const CONTENT_CREATE_SUBMITTED = 'CONTENT_CREATE_SUBMITTED';
export const CONTENT_CREATE_SUCCEEDED = 'CONTENT_CREATE_SUCCEEDED';
export const CONTENT_CREATE_FAILED = 'CONTENT_CREATE_FAILED';

export const CONTENT_DELETE_SUBMITTED = 'CONTENT_DELETE_SUBMITTED';
export const CONTENT_DELETE_SUCCEEDED = 'CONTENT_DELETE_SUCCEEDED';
export const CONTENT_DELETE_FAILED = 'CONTENT_DELETE_FAILED';

export const EDIT_CONTENT = 'EDIT_CONTENT';
export const FINISH_EDIT = 'FINISH_EDIT';
export const FORM_ENABLE = 'FORM_ENABLE';

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

export const CONTENT_RICHTEXT_CHANGE_SUBMITTED = 'CONTENT_RICHTEXT_CHANGE_SUBMITTED';
export const CONTENT_RICHTEXT_CHANGE_SUCCEEDED = 'CONTENT_RICHTEXT_CHANGE_SUCCEEDED';
export const CONTENT_RICHTEXT_CHANGE_FAILED = 'CONTENT_RICHTEXT_CHANGE_FAILED';

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
	content and which content and it's index
*/
export function editContent(content, index) {
	return {
		type: EDIT_CONTENT,
		payload: { content, index }
	};
}

export function finishEdit() {
	return {
		type: FINISH_EDIT,
		payload: {}
	};
}

export function formEnable(isCreatingContent) {
	return {
		type: FORM_ENABLE,
		payload: { isCreatingContent }
	};
}

export function titleChangeContent(contentTitle, index) {
	return {
		type: CONTENT_TITLE_CHANGE_SUBMITTED,
		payload: { contentTitle, index }
	};
}

export function descriptionChangeContent(contentDescription, index) {
	return {
		type: CONTENT_DESCRIPTION_CHANGE_SUBMITTED,
		payload: { contentDescription, index }
	};
}

export function urlChangeContent(contentUrl, index) {
	return {
		type: CONTENT_URL_CHANGE_SUBMITTED,
		payload: { contentUrl, index }
	};
}

export function quoteChangeContent(contentQuote, index) {
	return {
		type: CONTENT_QUOTE_CHANGE_SUBMITTED,
		payload: { contentQuote, index }
	};
}

export function authorChangeContent(contentAuthor, index) {
	return {
		type: CONTENT_AUTHOR_CHANGE_SUBMITTED,
		payload: { contentAuthor, index }
	};
}

export function recipientChangeContent(contentRecipient, index) {
	return {
		type: CONTENT_RECIPIENT_CHANGE_SUBMITTED,
		payload: { contentRecipient, index }
	};
}

export function recipientPositionChangeContent(contentRecipientPosition, index) {
	return {
		type: CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED,
		payload: { contentRecipientPosition, index }
	};
}

export function richTextChangeContent(contentRichtext, index) {
	return {
		type: CONTENT_RICHTEXT_CHANGE_SUBMITTED,
		payload: { contentRichtext, index }
	};
}

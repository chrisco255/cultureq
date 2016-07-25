export const CONTENT_CREATE_SUBMITTED = 'CONTENT_CREATE_SUBMITTED';
export const CONTENT_CREATE_SUCCEEDED = 'CONTENT_CREATE_SUCCEEDED';
export const CONTENT_CREATE_FAILED = 'CONTENT_CREATE_FAILED';

export const CONTENT_DELETE_SUBMITTED = 'CONTENT_DELETE_SUBMITTED';
export const CONTENT_DELETE_SUCCEEDED = 'CONTENT_DELETE_SUCCEEDED';
export const CONTENT_DELETE_FAILED = 'CONTENT_DELETE_FAILED';

export const EDIT_CONTENT = 'EDIT_CONTENT';

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
	}
}

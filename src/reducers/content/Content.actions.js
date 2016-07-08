export const ADD_CONTENT = 'ADD_CONTENT';
export const REMOVE_CONTENT = 'REMOVE_CONTENT';
export const EDIT_CONTENT = 'EDIT_CONTENT';

export const ADD_CONTENT_LIST = 'ADD_CONTENT_LIST';
export const ADD_CONTENT_LIST_SUCCEEDED = 'ADD_CONTENT_LIST_SUCCEEDED';
export const ADD_CONTENT_LIST_FAILED = 'ADD_CONTENT_LIST_FAILED';

export function addContent(content) {
	return {
		type: ADD_CONTENT,
		payload: { content }
	};
}

export function removeContent(content) {
	return {
		type: REMOVE_CONTENT,
		payload: { content }
	};
}

export function editContent(content) {
	return {
		type: EDIT_CONTENT,
		payload: { content }
	}
}

export function addContentList(contents) {
	return {
		type: ADD_CONTENT_LIST,
		payload: { contents }
	};
}

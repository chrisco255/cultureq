export const FETCH_CONTENT_POOL = 'FETCH_CONTENT_POOL';
export const FETCH_CONTENT_POOL_SUCCEEDED = 'FETCH_CONTENT_POOL_SUCCEEDED';
export const FETCH_CONTENT_POOL_FAILED = 'FETCH_CONTENT_POOL_FAILED';

export const CONTENT_ADD_SUBMITTED = 'CONTENT_ADD_SUBMITTED';
export const CONTENT_ADD_SUCCEEDED = 'CONTENT_ADD_SUCCEEDED';
export const CONTENT_ADD_FAILED = 'CONTENT_ADD_FAILED';

export const CONTENT_REMOVE_SUBMITTED = 'CONTENT_REMOVE_SUBMITTED';
export const CONTENT_REMOVE_SUCCEEDED = 'CONTENT_REMOVE_SUCCEEDED';
export const CONTENT_REMOVE_FAILED = 'CONTENT_REMOVE_FAILED';

export const CONTENT_SELECT_SUBMITTED = 'CONTENT_SELECT_SUBMITTED';

export const CONTENT_DESELECT_SUBMITTED = 'CONTENT_DESELECT_SUBMITTED';

export const CONTENT_FILTER_TEXT_CHANGE_SUBMITTED = 'CONTENT_FILTER_TEXT_CHANGE_SUBMITTED';

export const PLACEHOLDER_MOVE_SUBMITTED = 'PLACEHOLDER_MOVE_SUBMITTED';

export const CONTENT_MOVE_SUBMITTED = 'CONTENT_MOVE_SUBMITTED';
export const CONTENT_MOVE_SUCCEEDED = 'CONTENT_MOVE_SUCCEEDED';
export const CONTENT_MOVE_FAILED = 'CONTENT_MOVE_FAILED';

export const SURVEY_FILTER_TEXT_CHANGE_SUBMITTED = 'SURVEY_FILTER_TEXT_CHANGE_SUBMITTED';

export function fetchContentPool({ query }) {
	return {
		type: FETCH_CONTENT_POOL,
		payload: { query }
	};
}

export function addContent ({ content, index }) {
  return {
    type: CONTENT_ADD_SUBMITTED,
    payload: {
      content,
      index
    }
  };
}

export function removeContent ({ content }) {
  return {
    type: CONTENT_REMOVE_SUBMITTED,
    payload: {
      content
    }
  };
}

export function selectContent({ content }) {
  return {
    type: CONTENT_SELECT_SUBMITTED,
    payload: {
      content
    }
  };
}

export function deselectContent({ content }) {
  return {
    type: CONTENT_DESELECT_SUBMITTED,
    payload: {
      content
    }
  };
}

export function changeContentFilterText(text) {
  return {
    type: CONTENT_FILTER_TEXT_CHANGE_SUBMITTED,
    payload: {
      text
    }
  };
}

export function movePlaceholder(index, content) {
  return {
    type: PLACEHOLDER_MOVE_SUBMITTED,
    payload: {
      index,
      content
    }
  };
}

export function moveContent(oldIndex, newIndex) {
  return {
    type: CONTENT_MOVE_SUBMITTED,
    payload: {
      oldIndex,
      newIndex
    }
  };
}

export function changeSurveyFilterText(text) {
  return {
    type: SURVEY_FILTER_TEXT_CHANGE_SUBMITTED,
    payload: {
      text
    }
  };
}

export const CONTENT_ADD_SUBMITTED = 'CONTENT_ADD_SUBMITTED';
export const CONTENT_ADD_SUCCEEDED = 'CONTENT_ADD_SUCCEEDED';
export const CONTENT_ADD_FAILED = 'CONTENT_ADD_FAILED';

export const CONTENT_REMOVE_SUBMITTED = 'CONTENT_REMOVE_SUBMITTED';
export const CONTENT_REMOVE_SUCCEEDED = 'CONTENT_REMOVE_SUCCEEDED';
export const CONTENT_REMOVE_FAILED = 'CONTENT_REMOVE_FAILED';

export const CONTENT_SELECT_SUBMITTED = 'CONTENT_SELECT_SUBMITTED';

export const CONTENT_DESELECT_SUBMITTED = 'CONTENT_DESELECT_SUBMITTED';

export const CONTENT_ORDER_CHANGE_SUBMITTED = 'CONTENT_ORDER_CHANGE_SUBMITTED';

export function addContent ({ content }) {
  return {
    type: CONTENT_ADD_SUBMITTED,
    payload: {
      content
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

export function changeContentOrder(oldIndex, newIndex) {
  return {
    type: CONTENT_ORDER_CHANGE_SUBMITTED,
    payload: {
      oldIndex,
      newIndex
    }
  };
}

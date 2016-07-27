import * as ActionTypes from './Content.actions';

const defaultState = {
    contents: [],
    isEditing: false
};

export default (state = defaultState, action) => {

    switch (action.type) {

        // CONTENT_CREATE
        case ActionTypes.CONTENT_CREATE_SUBMITTED:
          action.payload.content.isDeleted = false;
          console.log('CONTENT_CREATE_SUBMITTED ▶️', action);
          break;
        case ActionTypes.CONTENT_CREATE_SUCCEEDED:
          return createContent(state, state.contents, action.payload);
        case ActionTypes.CONTENT_CREATE_FAILED:
          console.log('CONTENT_CREATE_FAILED ❌');
          break;

        // CONTENT_DELETE
        case ActionTypes.CONTENT_DELETE_SUBMITTED:
          return deleteContent(state, state.contents, action.payload);
        case ActionTypes.CONTENT_DELETE_SUCCEEDED:
          console.log('CONTENT_DELETE_SUCCEEDED ✅');
          break;
        case ActionTypes.CONTENT_DELETE_FAILED:
          console.log('CONTENT_DELETE_SUCCEEDED ❌');
          break;

        // FETCH_PILLARS
    		case ActionTypes.FETCH_CONTENTS_SUBMITTED:
    			console.log('FETCH_CONTENTS_SUBMITTED ▶️');
    			break;
    		case ActionTypes.FETCH_CONTENTS_SUCCEEDED:
    			return fetchContents(state, action.payload);
    		case ActionTypes.FETCH_CONTENTS_FAILED:
    			console.log('FETCH_CONTENTS_FAILED ❌');
    			break;
    }

    return state;
};

function createContent(state, contents, payload) {
  state = Object.assign({}, state, {
		contents: [...contents, payload]
	});
  console.log('CONTENT_CREATE_SUCCEEDED ✅');
	return state;
}

function deleteContent(state, contents, payload) {
  console.log('CONTENT_DELETE_SUBMITTED ▶️', payload.content);
  var contentIndex = _.findIndex(contents, (content) => content._id === payload.content._id);
  const newContent = Object.assign({}, contents[contentIndex], {
    isDeleted: true
  });
  state = Object.assign({}, state, {
    contents: [
      ...contents.slice(0, contentIndex),
      newContent,
      ...contents.slice(contentIndex + 1)
    ]
  });
  return state;
}

/*
	NOTE: Not filtering out the contents if they are deleted or not
	because it will mess up with the index and when
	editing, it will edit the wrong index
*/
function fetchContents(state, payload) {
	state = Object.assign({}, state, {
		contents: [ ...payload.contents ]
	});
	console.log('FETCH_CONTENTS_SUCCEEDED ✅');
	return state;
}

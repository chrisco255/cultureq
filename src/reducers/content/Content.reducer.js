import * as ActionTypes from './Content.actions';
import _ from 'lodash';

const defaultState = {
    contents: [],
    isEditing: false,
  	contentThatIsBeingEdited: null,
  	contentThatIsBeingEditedIndex: -1
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

        case ActionTypes.EDIT_CONTENT:
          return editContent(state, action.payload);
        case ActionTypes.FINISH_EDIT:
          return finishEdit(state);

        case ActionTypes.CONTENT_TITLE_CHANGE_SUBMITTED:
          return contentTitleChange(state, state.contents, action.payload);
        case ActionTypes.CONTENT_TITLE_CHANGE_SUCCEEDED:
    			console.log('CONTENT_TITLE_CHANGE_SUCCEEDED ✅');
    			break;
    		case ActionTypes.CONTENT_TITLE_CHANGE_FAILED:
    			console.log('CONTENT_TITLE_CHANGE_FAILED ❌');
    			break;

        case ActionTypes.CONTENT_DESCRIPTION_CHANGE_SUBMITTED:
          return contentDescriptionChange(state, state.contents, action.payload);
        case ActionTypes.CONTENT_DESCRIPTION_CHANGE_SUCCEEDED:
    			console.log('CONTENT_DESCRIPTION_CHANGE_SUCCEEDED ✅');
    			break;
    		case ActionTypes.CONTENT_DESCRIPTION_CHANGE_FAILED:
    			console.log('CONTENT_DESCRIPTION_CHANGE_FAILED ❌');
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

        default:
    			console.log('What we think, we become. - Buddha');
    			break;
    }

    return state;
};

function createContent(state, contents, payload) {
  console.log('CONTENT_CREATE_SUCCEEDED ✅');
  return Object.assign({}, state, {
		contents: [...contents, payload]
	});
}

function deleteContent(state, contents, payload) {
  console.log('CONTENT_DELETE_SUBMITTED ▶️', payload.content);
  const contentIndex = _.findIndex(contents, (content) => content._id === payload.content._id);
  const newContent = Object.assign({}, contents[contentIndex], {
    isDeleted: true
  });
  return Object.assign({}, state, {
    contents: [
      ...contents.slice(0, contentIndex),
      newContent,
      ...contents.slice(contentIndex + 1)
    ]
  });
}

function editContent(state, payload) {
  console.log('EDIT_CONTENT ✏️', payload.content);
	return Object.assign({}, state, {
			isEditing: true,
			contentThatIsBeingEdited: payload.content,
			contentThatIsBeingEditedIndex: payload.index
	});
}

function finishEdit(state) {
  console.log('FINISH_EDIT ✏️✅');
  return Object.assign({}, state, {
    isEditing: false,
    contentThatIsBeingEditedIndex: -1,
  });
}

function contentTitleChange(state, contents, payload) {
  console.log('CONTENT_TITLE_CHANGE_SUBMITTED ▶️', payload);
  const { contentTitle, index } = payload;
	const newContent = Object.assign({}, contents[index], {
		 data: {
       ...Object.assign({}, contents[index].data, {
         title: contentTitle
       })
     }
	});
	return Object.assign({}, state, {
			contents: [
				...contents.slice(0, index),
				newContent,
				...contents.slice(index + 1)
			]
	});
}

function contentDescriptionChange(state, contents, payload) {
  console.log('CONTENT_DESCRIPTION_CHANGE_SUBMITTED ▶️', payload);
  const { contentDescription, index } = payload;
	const newContent = Object.assign({}, contents[index], {
		 data: {
       ...Object.assign({}, contents[index].data, {
         description: contentDescription
       })
     }
	});
	return Object.assign({}, state, {
			contents: [
				...contents.slice(0, index),
				newContent,
				...contents.slice(index + 1)
			]
	});
}

/*
	NOTE: Not filtering out the contents if they are deleted or not
	because it will mess up with the index and when
	editing, it will edit the wrong index
*/
function fetchContents(state, payload) {
  console.log('FETCH_CONTENTS_SUCCEEDED ✅');
	return Object.assign({}, state, {
		contents: [ ...payload.contents ]
	});
}

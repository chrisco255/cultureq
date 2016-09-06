import * as ActionTypes from './Content.actions';
import _ from 'lodash';

const defaultState = {
    contents: [],
    isEditing: false,
    isCreatingContent: false,
    contentThatIsBeingEdited: null,
    currentContentType: '',
    filteredContents: [],
    searchText: ''
};

export default (state = defaultState, action) => {

    const { contents } = state;
    const { type, payload } = action;

    switch (type) {

        // CONTENT_CREATE
        case ActionTypes.CONTENT_CREATE_SUBMITTED:
            payload.content.isDeleted = false;
            if(!payload.content.pillarId) {
              payload.content.pillarId = 'noPillar';
            }
            console.log('CONTENT_CREATE_SUBMITTED ▶️', action);
            break;
        case ActionTypes.CONTENT_CREATE_SUCCEEDED:
            return createContent(state, contents, payload);
        case ActionTypes.CONTENT_CREATE_FAILED:
            console.log('CONTENT_CREATE_FAILED ❌');
            break;

            // CONTENT_DELETE
        case ActionTypes.CONTENT_DELETE_SUBMITTED:
            return deleteContent(state, contents, payload);
        case ActionTypes.CONTENT_DELETE_SUCCEEDED:
            console.log('CONTENT_DELETE_SUCCEEDED ✅');
            break;
        case ActionTypes.CONTENT_DELETE_FAILED:
            console.log('CONTENT_DELETE_SUCCEEDED ❌');
            break;

        case ActionTypes.EDIT_CONTENT:
            return editContent(state, payload);
        case ActionTypes.FINISH_EDIT:
            return finishEdit(state);
        case ActionTypes.FORM_ENABLE:
            return formEnable(state, payload);
        case ActionTypes.FILTER_CONTENT:
            return setFilteredContents(state, payload);
        case ActionTypes.SEARCH_TEXT_CHANGE_SUBMITTED:
            return searchTextChange(state, payload);

        case ActionTypes.CONTENT_TITLE_CHANGE_SUBMITTED:
            return contentDataChanged('CONTENT_TITLE_CHANGE_SUBMITTED', state, contents, payload._id, payload.contentTitle, 'title');
        case ActionTypes.CONTENT_TITLE_CHANGE_SUCCEEDED:
            console.log('CONTENT_TITLE_CHANGE_SUCCEEDED ✅');
            break;
        case ActionTypes.CONTENT_TITLE_CHANGE_FAILED:
            console.log('CONTENT_TITLE_CHANGE_FAILED ❌');
            break;

        case ActionTypes.CONTENT_DESCRIPTION_CHANGE_SUBMITTED:
            return contentDataChanged('CONTENT_DESCRIPTION_CHANGE_SUBMITTED', state, contents, payload._id, payload.contentDescription, 'description');
        case ActionTypes.CONTENT_DESCRIPTION_CHANGE_SUCCEEDED:
            console.log('CONTENT_DESCRIPTION_CHANGE_SUCCEEDED ✅');
            break;
        case ActionTypes.CONTENT_DESCRIPTION_CHANGE_FAILED:
            console.log('CONTENT_DESCRIPTION_CHANGE_FAILED ❌');
            break;

        case ActionTypes.CONTENT_URL_CHANGE_SUBMITTED:
            return contentDataChanged('CONTENT_URL_CHANGE_SUBMITTED', state, contents, payload._id, payload.contentUrl, 'url');
        case ActionTypes.CONTENT_URL_CHANGE_SUCCEEDED:
            console.log('CONTENT_URL_CHANGE_SUCCEEDED ✅');
            break;
        case ActionTypes.CONTENT_URL_CHANGE_FAILED:
            console.log('CONTENT_URL_CHANGE_FAILED ❌');
            break;

        case ActionTypes.CONTENT_QUOTE_CHANGE_SUBMITTED:
            return contentDataChanged('CONTENT_QUOTE_CHANGE_SUBMITTED', state, contents, payload._id, payload.contentQuote, 'quote');
        case ActionTypes.CONTENT_QUOTE_CHANGE_SUCCEEDED:
            console.log('CONTENT_QUOTE_CHANGE_SUCCEEDED ✅');
            break;
        case ActionTypes.CONTENT_QUOTE_CHANGE_FAILED:
            console.log('CONTENT_QUOTE_CHANGE_FAILED ❌');
            break;

        case ActionTypes.CONTENT_AUTHOR_CHANGE_SUBMITTED:
            return contentDataChanged('CONTENT_AUTHOR_CHANGE_SUBMITTED', state, contents, payload._id, payload.contentAuthor, 'author');
        case ActionTypes.CONTENT_AUTHOR_CHANGE_SUCCEEDED:
            console.log('CONTENT_AUTHOR_CHANGE_SUCCEEDED ✅');
            break;
        case ActionTypes.CONTENT_AUTHOR_CHANGE_FAILED:
            console.log('CONTENT_AUTHOR_CHANGE_FAILED ❌');
            break;

        case ActionTypes.CONTENT_RECIPIENT_CHANGE_SUBMITTED:
            return contentDataChanged('CONTENT_RECIPIENT_CHANGE_SUBMITTED', state, contents, payload._id, payload.contentRecipient, 'recipient');
        case ActionTypes.CONTENT_RECIPIENT_CHANGE_SUCCEEDED:
            console.log('CONTENT_RECIPIENT_CHANGE_SUCCEEDED ✅');
            break;
        case ActionTypes.CONTENT_RECIPIENT_CHANGE_FAILED:
            console.log('CONTENT_RECIPIENT_CHANGE_FAILED ❌');
            break;

        case ActionTypes.CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED:
            return contentDataChanged('CONTENT_RECIPIENT_POSITION_CHANGE_SUBMITTED', state, contents, payload._id, payload.contentRecipientPosition, 'recipientPosition');
        case ActionTypes.CONTENT_RECIPIENT_POSITION_CHANGE_SUCCEEDED:
            console.log('CONTENT_RECIPIENT_POSITION_CHANGE_SUCCEEDED ✅');
            break;
        case ActionTypes.CONTENT_RECIPIENT_POSITION_CHANGE_FAILED:
            console.log('CONTENT_RECIPIENT_POSITION_CHANGE_FAILED ❌');
            break;

            // FETCH_PILLARS
        case ActionTypes.FETCH_CONTENTS_SUBMITTED:
            console.log('FETCH_CONTENTS_SUBMITTED ▶️');
            break;
        case ActionTypes.FETCH_CONTENTS_SUCCEEDED:
            return fetchContents(state, payload);
        case ActionTypes.FETCH_CONTENTS_FAILED:
            console.log('FETCH_CONTENTS_FAILED ❌');
            break;

        default:
            return state;
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
        contentThatIsBeingEdited: payload.content
    });
}

function finishEdit(state) {
    console.log('FINISH_EDIT ✏️✅');
    return Object.assign({}, state, {
        isEditing: false,
        contentThatIsBeingEdited: 'NOTHING'
    });
}

function formEnable(state, payload) {
  return Object.assign({}, state, {
      isCreatingContent: !payload.isCreatingContent,
      currentContentType: payload.currentContentType.toUpperCase()
  });
}

function setFilteredContents(state, payload) {
  return Object.assign({}, state, {
    filteredContents: payload.filteredContents
  });
}

function contentDataChanged(actionType, state, contents, _id, payloadData, keyType) {
    console.log(`${actionType} ▶️`, payloadData);
    const contentIndex = _.findIndex(contents, (content) => content._id === _id);
    const newContent = Object.assign({}, contents[contentIndex], {
        data: Object.assign({}, contents[contentIndex].data, {
            [keyType]: payloadData
        })
    });
    return Object.assign({}, state, {
        contents: [
            ...contents.slice(0, contentIndex),
            newContent,
            ...contents.slice(contentIndex + 1)
        ]
    });
}

function fetchContents(state, payload) {
    console.log('FETCH_CONTENTS_SUCCEEDED ✅');
    let { contents } = payload;
    contents = contents.filter((content) => !content.isDeleted);
    return Object.assign({}, state, {
        contents: [ ...contents ]
    });
}

function searchTextChange(state, payload) {
  return Object.assign({}, state, {
      searchText: payload.text
  });
}

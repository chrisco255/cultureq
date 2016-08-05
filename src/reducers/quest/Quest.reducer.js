import {
	CONTENT_ADD_SUBMITTED,
	CONTENT_ADD_FAILED,
	CONTENT_REMOVE_SUBMITTED,
	CONTENT_REMOVE_FAILED,
	CONTENT_SELECT_SUBMITTED,
	CONTENT_DESELECT_SUBMITTED,
	CONTENT_ORDER_CHANGE_SUBMITTED
} from './Quest.actions';

const defaultState = {
	contentPool: [
    {
			_id: 'a',
			selected: false,
      title: 'Content Title 1',
      description: 'This is a description for content 1',
      data: {
        type: 'VIDEO',
        title: 'This is a video',
        description: 'This ia a description for video 1',
        url: 'thisisavideo.url'
      }
    },
    {
			_id: 'b',
			selected: false,
      title: 'Content Title 2',
      description: 'This is a description for content 2',
      data: {
        type: 'VIDEO',
        title: 'This is a video',
        description: 'This ia a description for video 2',
        url: 'thisisavideo.url'
      }
    },
    {
			_id: 'c',
			selected: false,
      title: 'Content Title 3',
      description: 'This is a description for content 3',
      data: {
        type: 'VIDEO',
        title: 'This is a video',
        description: 'This ia a description for video 3',
        url: 'thisisavideo.url'
      }
    },
    {
			_id: 'd',
			selected: false,
      title: 'Content Title 4',
      description: 'This is a description for content 4',
      data: {
        type: 'VIDEO',
        title: 'This is a video',
        description: 'This ia a description for video 4',
        url: 'thisisavideo.url'
      }
    },
    {
			_id: 'e',
			selected: false,
      title: 'Content Title 5',
      description: 'This is a description for content 5',
      data: {
        type: 'QUOTE',
        quote: 'Abraham Lincoln probably said this at one point',
        author: 'Abraham Lincoln'
      }
    },
    {
			_id: 'f',
			selected: false,
      title: 'Content Title 6',
      description: 'This is a description for content 6',
      data: {
        type: 'QUOTE',
        quote: 'Einstein probably said this at one point',
        author: 'Abraham Einstein'
      }
    },
    {
			_id: 'g',
			selected: false,
      title: 'Content Title 7',
      description: 'This is a description for content 7',
      data: {
        type: 'QUOTE',
        quote: 'Some president probably said this at one point',
        author: 'Some president'
      }
    },
    {
			_id: 'h',
			selected: false,
      title: 'Content Title 8',
      description: 'This is a description for content 8',
      data: {
        type: 'LUNCH',
        recipient: 'Madam Curie',
        recipientPosition: 'Scientist'
      }
    },
    {
			_id: 'i',
			selected: false,
      title: 'Content Title 9',
      description: 'This is a description for content 9',
      data: {
        type: 'LUNCH',
        recipient: 'Brent Spiner',
        recipientPosition: 'Lt. Commander'
      }
    },
    {
			_id: 'j',
			selected: false,
      title: 'Content Title 10',
      description: 'This is a description for content 10',
      data: {
        type: 'LUNCH',
        recipient: 'Patrick Stewart',
        recipientPosition: 'Captain'
      }
    }
  ],
  newQuest: {
    title: null,
    description: null,
		content: []
  }
};

export default (state = defaultState, action) => {
	const { payload } = action;
	switch(action.type) {
		case CONTENT_ADD_SUBMITTED:
			return contentAddSubmitted(state, payload);
		case CONTENT_REMOVE_SUBMITTED:
			return contentRemoveSubmitted(state, payload);
		case CONTENT_SELECT_SUBMITTED:
			return contentSelectSubmitted(state, payload);
		case CONTENT_DESELECT_SUBMITTED:
			return contentDeselectSubmitted(state, payload);
		case CONTENT_ORDER_CHANGE_SUBMITTED:
			return contentOrderChangeSubmitted(state, payload);
    default:
      return state;
	}
};

function contentAddSubmitted(state, { content }) {
	content = { ...content, isSelected: false};
	const modifiedQuest = { ...state.newQuest, content:state.newQuest.content.concat(content) };
	state = { ...state,
						newQuest: modifiedQuest,
						contentPool: state.contentPool.filter(poolContent => poolContent._id !== content._id)
					};
	return state;
}

function contentRemoveSubmitted(state, { content }) {
	const modifiedQuest = { ...state.newQuest, content:state.newQuest.content.filter(questContent => questContent._id !== content._id) };
	state = { ...state,
						newQuest: modifiedQuest,
						contentPool: state.contentPool.concat(content)
					};
	return state;
}

function contentSelectSubmitted(state, { content }) {
	const contentIndex = state.contentPool.findIndex((poolContent) => {
		return poolContent._id === content._id;
	});
	const modifiedContent = { ...content, isSelected: true };
	state = { ...state,
						contentPool: [
							...state.contentPool.slice(0, contentIndex),
							modifiedContent,
							...state.contentPool.slice(contentIndex + 1)
						]
					};
	return state;
}

function contentDeselectSubmitted(state, { content }) {
	const contentIndex = state.contentPool.findIndex((poolContent) => {
		return poolContent._id === content._id;
	});
	const modifiedContent = { ...content, isSelected: false };
	state = { ...state,
						contentPool: [
							...state.contentPool.slice(0, contentIndex),
							modifiedContent,
							...state.contentPool.slice(contentIndex + 1)
						]
					};
	return state;
}

function contentOrderChangeSubmitted(state, { oldIndex, newIndex }) {
	let questContent = state.newQuest.content;
	const content = questContent[oldIndex];
	questContent = [...questContent.slice(0, oldIndex), ...questContent.slice(oldIndex + 1)];
	questContent = [...questContent.slice(0, newIndex), content, ...questContent.slice(newIndex)];
	const modifiedQuest = { ...state.newQuest, content: questContent };
	state = {
		...state,
		newQuest: modifiedQuest
	};
	console.log('new modified quest content - ', modifiedQuest.content);
	return state;
}

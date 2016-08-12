import {
	CONTENT_ADD_SUBMITTED,
	CONTENT_ADD_FAILED,
	CONTENT_REMOVE_SUBMITTED,
	CONTENT_REMOVE_FAILED,
	CONTENT_SELECT_SUBMITTED,
	CONTENT_DESELECT_SUBMITTED,
	CONTENT_ORDER_CHANGE_SUBMITTED,
	FILTER_TEXT_CHANGE_SUBMITTED
} from './Quest.actions';
import {
	immutablyAddElementToArray,
	immutablyReplaceElementInArray,
	immutablyRemoveIndexFromArray
} from '../../utils';

const defaultState = {
	contentPool: [
    {
			_id: 'a',
			selected: false,
      title: 'Fierce Conversations I',
      description: 'One must transform everyday conversations employing effective ways to get the message across.',
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
      title: 'Fierce Conversations II',
      description: 'Includes exercises and tools to take you step by step through the Seven Principles of Fierce Conversations.',
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
      title: 'Servant Leadership I',
      description: 'Philosophy and set of practices that enriches the lives of individuals, builds better organizations and ultimately creates a more just and caring world.',
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
      title: 'Trivia Pack',
      description: 'HR fun facts',
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
      title: 'Aspirations Survey',
      description: 'Survey to assess the future goals and desires of our employees.',
      data: {
        type: 'QUOTE',
        quote: 'Abraham Lincoln probably said this at one point',
        author: 'Abraham Lincoln'
      }
    },
    {
			_id: 'f',
			selected: false,
      title: 'Community Service Video',
      description: 'Working at a local recycling facility.',
      data: {
        type: 'QUOTE',
        quote: 'Einstein probably said this at one point',
        author: 'Abraham Einstein'
      }
    },
    {
			_id: 'g',
			selected: false,
      title: 'Inspirational Note',
      description: 'Random quote to inspire employees.',
      data: {
        type: 'QUOTE',
        quote: 'Some president probably said this at one point',
        author: 'Some president'
      }
    },
    {
			_id: 'h',
			selected: false,
      title: 'How to Give Tough Feedback',
      description: 'Giving developmental feedback that sparks growth is a critical challenge to master.',
      data: {
        type: 'LUNCH',
        recipient: 'Madam Curie',
        recipientPosition: 'Scientist'
      }
    },
    {
			_id: 'i',
			selected: false,
      title: 'How to Hold a Retrospective',
      description: 'Setting the context at the beginning of any meeting is the first step you can take to ensure that the meeting is effective.',
      data: {
        type: 'LUNCH',
        recipient: 'Brent Spiner',
        recipientPosition: 'Lt. Commander'
      }
    },
		{
			_id: 'j',
			selected: false,
      title: 'Founding Principles',
      description: 'Helps to instill the key values of our company in its employees.',
      data: {
        type: 'LUNCH',
        recipient: 'Patrick Stewart',
        recipientPosition: 'Captain'
      }
    },
		{
			_id: 'k',
			selected: false,
      title: 'Selfie Challenge',
      description: 'Challenge employees to meet key figures within the organization.',
      data: {
        type: 'LUNCH',
        recipient: 'Patrick Stewart',
        recipientPosition: 'Captain'
      }
    },
		{
			_id: 'l',
			selected: false,
      title: 'Traditions',
      description: 'Overview of company meet-ups, outings, and events.',
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
  },
	filterText: ''
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
		case FILTER_TEXT_CHANGE_SUBMITTED:
			return filterTextChangeSubmitted(state, payload);
    default:
      return state;
	}
};

function contentAddSubmitted(state, { content, index }) {
	content = { ...content, isSelected: false};
	console.log('info - ', content, ' - ', index);
	console.log('quest before - ', state.newQuest.content);
	const modifiedQuest = { ...state.newQuest, content:immutablyAddElementToArray(state.newQuest.content, content, index) };
	console.log('quest after - ', modifiedQuest);
	state = { ...state,
						newQuest: modifiedQuest,
						contentPool: state.contentPool.filter(poolContent => poolContent._id !== content._id)
					};
	return state;
}

function contentRemoveSubmitted(state, { content }) {
	content = { ...content, isSelected: false};
	const modifiedQuest = { ...state.newQuest, content:state.newQuest.content.filter(questContent => questContent._id !== content._id) };
	state = { ...state,
						newQuest: modifiedQuest,
						contentPool: state.contentPool.concat(content)
					};
	return state;
}

function contentSelectStateChanged(state, content, selected) {
	const modifiedContent = { ...content, isSelected: selected };
	//content could either be in quest content or content pool
	const contentPoolIndex = state.contentPool.findIndex((poolContent) => {
		return poolContent._id === content._id;
	});
	if (contentPoolIndex > -1) {
		state = { ...state,
							contentPool: immutablyReplaceElementInArray(state.contentPool, modifiedContent, contentPoolIndex)
						};
	} else {
		const questContentIndex = state.newQuest.content.findIndex((questContent) => {
			return questContent._id === content._id;
		});
		const modifiedQuest = { ...state.newQuest,
														content: immutablyReplaceElementInArray(state.newQuest.content, modifiedContent, questContentIndex)
													};
		state = { ...state,
							newQuest: modifiedQuest,
						};
	}
	return state;
}

function contentSelectSubmitted(state, { content }) {
	return contentSelectStateChanged(state, content, true);
}

function contentDeselectSubmitted(state, { content }) {
	return contentSelectStateChanged(state, content, false);
}

function contentOrderChangeSubmitted(state, { oldIndex, newIndex }) {
	let questContent = state.newQuest.content;
	const content = questContent[oldIndex];
	questContent = immutablyRemoveIndexFromArray(questContent, oldIndex);
	questContent = immutablyAddElementToArray(questContent, content, newIndex);
	const modifiedQuest = { ...state.newQuest, content: questContent };
	state = {
		...state,
		newQuest: modifiedQuest
	};
	console.log('new modified quest content - ', modifiedQuest.content);
	return state;
}

function filterTextChangeSubmitted(state, { text }) {
	state = { ...state, filterText:text };
	return state;
}

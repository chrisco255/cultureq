import {
	CONTENT_ADD_SUBMITTED,
	CONTENT_ADD_FAILED
} from './Quest.actions';

const defaultState = {
	contentPool: [
    {
			_id: 'a',
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
      title: 'Content Title 10',
      description: 'This is a description for content 10',
      data: {
        type: 'LUNCH',
        recipient: 'Patrick Stewart',
        recipientPosition: 'Captin'
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
    default:
      return state;
	}
};

function contentAddSubmitted(state, { content }) {
	state = Object.assign({}, state, {
		newQuest: state.newQuest.content.concat(concat)
	});
	return state;
}

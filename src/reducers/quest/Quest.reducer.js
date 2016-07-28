import * as ActionTypes from './Quest.actions';

const defaultState = {
	contentPool: [
    {
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
      title: 'Content Title 5',
      description: 'This is a description for content 5',
      data: {
        type: 'QUOTE',
        quote: 'Abraham Lincoln probably said this at one point',
        author: 'Abraham Lincoln'
      }
    },
    {
      title: 'Content Title 6',
      description: 'This is a description for content 6',
      data: {
        type: 'QUOTE',
        quote: 'Einstein probably said this at one point',
        author: 'Abraham Einstein'
      }
    },
    {
      title: 'Content Title 7',
      description: 'This is a description for content 7',
      data: {
        type: 'QUOTE',
        quote: 'Some president probably said this at one point',
        author: 'Some president'
      }
    },
    {
      title: 'Content Title 8',
      description: 'This is a description for content 8',
      data: {
        type: 'LUNCH',
        recipient: 'Madam Curie',
        recipientPosition: 'Scientist'
      }
    },
    {
      title: 'Content Title 9',
      description: 'This is a description for content 9',
      data: {
        type: 'LUNCH',
        recipient: 'Brent Spiner',
        recipientPosition: 'Lt. Commander'
      }
    },
    {
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
	switch(action.type) {
		case ActionTypes.USER_LOGIN:
			state = Object.assign({}, state, {
				token: action.payload.token,
				profile: action.payload.profile
			});
			return state;
    default:
      return state;
	}
};

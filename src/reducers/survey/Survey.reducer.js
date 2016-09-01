import {
	SURVEY_FILTER_TEXT_CHANGE_SUBMITTED,
} from './Survey.actions';

import {
	IN_PROGRESS,
	PUBLISHED,
} from '../../routes/survey/my_surveys/SurveyStatusEnum';

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
				type: 'QUOTE',
        quote: 'I feel like this quote has been said',
        author: 'Some guy'
      }
    },
    {
			_id: 'i',
			selected: false,
      title: 'How to Hold a Retrospective',
      description: 'Setting the context at the beginning of any meeting is the first step you can take to ensure that the meeting is effective.',
      data: {
				type: 'QUOTE',
        quote: 'Exercising correctly is very important',
        author: 'Fitness people'
      }
    },
		{
			_id: 'j',
			selected: false,
      title: 'Founding Principles',
      description: 'Helps to instill the key values of our company in its employees.',
      data: {
        type: 'QUOTE',
        quote: 'We shall go where no one has gone before',
        author: 'Captain Picard'
      }
    },
		{
			_id: 'k',
			selected: false,
      title: 'Selfie Challenge',
      description: 'Challenge employees to meet key figures within the organization.',
      data: {
        type: 'QUOTE',
				quote: 'Something is only impossible until it\'s not',
        author: 'Captain Picard'
      }
    },
		{
			_id: 'l',
			selected: false,
      title: 'Traditions',
      description: 'Overview of company meet-ups, outings, and events.',
      data: {
        type: 'QUOTE',
				quote: 'Fire photon torpedoes',
        author: 'Captain Picard'
      }
    }
  ],
  newSurvey: {
    title: 'Survey Title',
    description: null,
		content: []
  },
	surveys: [
		{
			_id: 'a',
			title: 'Be More Active',
			description: 'You should try to be more active because it is good for you',
			status: IN_PROGRESS,
			pillar: 'People First',
			lastModified: new Date() - 100000,
			content: [
				{
					_id: 'a',
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
    			_id: 'f',
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
          title: 'Inspirational Note',
          description: 'Random quote to inspire employees.',
          data: {
            type: 'QUOTE',
            quote: 'Some president probably said this at one point',
            author: 'Some president'
          }
        },
			]
		},
		{
			_id: 'b',
			title: 'Have more fun',
			description: 'You should try to have more fun because it makes things more exciting',
			status: IN_PROGRESS,
			pillar: 'People First',
			lastModified: new Date() - 70000,
			content: [
        {
    			_id: 'c',
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
    			_id: 'f',
          title: 'Community Service Video',
          description: 'Working at a local recycling facility.',
          data: {
            type: 'QUOTE',
            quote: 'Einstein probably said this at one point',
            author: 'Abraham Einstein'
          }
        },
        {
    			_id: 'i',
          title: 'How to Hold a Retrospective',
          description: 'Setting the context at the beginning of any meeting is the first step you can take to ensure that the meeting is effective.',
          data: {
    				type: 'QUOTE',
            quote: 'Exercising correctly is very important',
            author: 'Fitness people'
          }
        },

			]
		},
		{
			_id: 'c',
			title: 'Get Exercise',
			description: 'You should try to get more exercise because that helps you be more active',
			status: IN_PROGRESS,
			pillar: 'Contribute Value',
			lastModified: new Date() - 4000000,
			content: [
        {
    			_id: 'c',
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
    			_id: 'i',
          title: 'How to Hold a Retrospective',
          description: 'Setting the context at the beginning of any meeting is the first step you can take to ensure that the meeting is effective.',
          data: {
    				type: 'QUOTE',
            quote: 'Exercising correctly is very important',
            author: 'Fitness people'
          }
        },

			]
		},
		{
			_id: 'd',
			title: 'Watch Less TV',
			description: 'You should try to watch less TV because TV is bad for you',
			status: PUBLISHED,
			pillar: 'People First',
			lastModified: new Date() - 90000000,
			content: [
        {
    			_id: 'g',
          title: 'Inspirational Note',
          description: 'Random quote to inspire employees.',
          data: {
            type: 'QUOTE',
            quote: 'Some president probably said this at one point',
            author: 'Some president'
          }
        },

			]
		},
		{
			_id: 'e',
			title: 'Get More Sleep',
			description: 'You should try to to get more sleep because sleep is good for you',
			status: IN_PROGRESS,
			pillar: 'Contribute Value',
			lastModified: new Date() - 90000000*7,
			content: [
        {
    			_id: 'f',
          title: 'Community Service Video',
          description: 'Working at a local recycling facility.',
          data: {
            type: 'QUOTE',
            quote: 'Einstein probably said this at one point',
            author: 'Abraham Einstein'
          }
        },

			]
		},
		{
			_id: 'f',
			title: 'Talk to Others',
			description: 'Taking to others is very important because it builds social skills',
			status: PUBLISHED,
			pillar: 'Promote Loyalty',
			lastModified: new Date() - 90000000*30,
			content: [
        {
    			_id: 'c',
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
    			_id: 'f',
          title: 'Community Service Video',
          description: 'Working at a local recycling facility.',
          data: {
            type: 'QUOTE',
            quote: 'Einstein probably said this at one point',
            author: 'Abraham Einstein'
          }
        },
			]
		},
		{
			_id: 'g',
			title: 'Go Outside',
			description: 'You should go outside more because fresh air is good for you',
			status: IN_PROGRESS,
			pillar: 'Contribute Value',
			lastModified: new Date() - 1900000,
			content: [
        {
    			_id: 'l',
          title: 'Traditions',
          description: 'Overview of company meet-ups, outings, and events.',
          data: {
            type: 'QUOTE',
    				quote: 'Fire photon torpedoes',
            author: 'Captain Picard'
          }
        }
			]
		},
		{
			_id: 'h',
			title: 'Use Sunscreen',
			description: 'You should try to use sunscreen when you go outside because the sun can be bad for your skin',
			status: PUBLISHED,
			pillar: 'People First',
			lastModified: new Date() - 90000000*50,
			content: [
        {
    			_id: 'c',
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
    			_id: 'g',
          title: 'Inspirational Note',
          description: 'Random quote to inspire employees.',
          data: {
            type: 'QUOTE',
            quote: 'Some president probably said this at one point',
            author: 'Some president'
          }
        },
			]
		},
		{
			_id: 'i',
			title: 'Communicate More',
			description: 'Communicate more with your team because that helps productivity',
			status: IN_PROGRESS,
			pillar: 'Build Loyalty',
			lastModified: new Date() - 500000,
			content: [
        {
    			_id: 'l',
          title: 'Traditions',
          description: 'Overview of company meet-ups, outings, and events.',
          data: {
            type: 'QUOTE',
    				quote: 'Fire photon torpedoes',
            author: 'Captain Picard'
          }
        }
			]
		},
		{
			_id: 'j',
			title: 'Work Hard',
			description: 'Hard work is very important because that helps advance the company',
			status: PUBLISHED,
			pillar: 'People First',
			lastModified: new Date() - 100000000,
			content: [
        {
    			_id: 'f',
          title: 'Community Service Video',
          description: 'Working at a local recycling facility.',
          data: {
            type: 'QUOTE',
            quote: 'Einstein probably said this at one point',
            author: 'Abraham Einstein'
          }
        },
        {
    			_id: 'i',
          title: 'How to Hold a Retrospective',
          description: 'Setting the context at the beginning of any meeting is the first step you can take to ensure that the meeting is effective.',
          data: {
    				type: 'QUOTE',
            quote: 'Exercising correctly is very important',
            author: 'Fitness people'
          }
        },
        {
    			_id: 'g',
          title: 'Inspirational Note',
          description: 'Random quote to inspire employees.',
          data: {
            type: 'QUOTE',
            quote: 'Some president probably said this at one point',
            author: 'Some president'
          }
        },
        {
    			_id: 'l',
          title: 'Traditions',
          description: 'Overview of company meet-ups, outings, and events.',
          data: {
            type: 'QUOTE',
    				quote: 'Fire photon torpedoes',
            author: 'Captain Picard'
          }
        }
			]
		}
	],
	recommendedSurvey: {
		title: 'Embrace Community',
		description: 'You should make an effort to embrace those around you',
		time: 900, //seconds to complete
		pillar: 'People First'
	},
	trendingSurveys: [
		{
			title: 'How to destroy toxic practices',
			change: 19
		},
		{
			title: 'Article Clubs',
			change: 29
		},
		{
			title: 'Shout outs',
			change: 15
		}
	],
	contentFilterText: '',
	surveyFilterText: '',
	placeholder: null
};

export default (state = defaultState, action) => {
	const { payload } = action;
	switch(action.type) {
		case SURVEY_FILTER_TEXT_CHANGE_SUBMITTED:
			return surveyFilterTextChangeSubmitted(state, payload);
    default:
      return state;
	}
};

function surveyFilterTextChangeSubmitted(state, { text }) {
	state = { ...state, surveyFilterText: text };
	return state;
}

import {
	SURVEY_FILTER_TEXT_CHANGE_SUBMITTED,
} from './Survey.actions';

import {
	STATUS,
	TYPE,
} from '../../routes/survey/my_surveys/Enums';

const defaultState = {
  newSurvey: {
    title: 'Survey Title',
    description: null,
		content: []
  },
	surveys: [
		{
			_id: 'a',
			title: 'Embrace Community',
			description: 'Employees need to believe in the vision and culture, need to feel included in the vision, and be proud of where they work',
			type: TYPE.SURVEY,
			lastModified: new Date() - 100000,
			status: STATUS.UNPUBLISHED,
			statusPercent: null,
		},
		{
			_id: 'b',
			title: 'How are you doing today?',
			type: TYPE.CHECK_IN,
			lastModified: new Date() - 70000,
			status: STATUS.UNPUBLISHED,
			statusPercent: null,
		},
		{
			_id: 'c',
			title: 'The Trunk Factor',
			description: 'Employees need to believe in the vision and culture, need to feel included in the vision, and be proud of where they work',
			type: TYPE.SURVEY,
			lastModified: new Date() - 900000,
			status: STATUS.UNPUBLISHED,
			statusPercent: null,
		},
		{
			_id: 'd',
			title: 'Feeling Busy?',
			type: TYPE.CHECK_IN,
			lastModified: new Date() - 10000,
			status: STATUS.UNPUBLISHED,
			statusPercent: null,
		},
		{
			_id: 'e',
			title: 'Winning?',
			type: TYPE.SURVEY,
			lastModified: new Date() - 1000000,
			status: STATUS.UNPUBLISHED,
			statusPercent: null,
		},
		{
			_id: 'f',
			title: 'Engageometer',
			description: 'Employees need to believe in the vision and culture, need to feel included in the vision, and be proud of where they work',
			type: TYPE.SURVEY,
			lastModified: new Date() - 3450000,
			status: STATUS.PUBLISHED,
			statusPercent: 99,
		},
		{
			_id: 'g',
			title: 'Embrace Community',
			description: 'Employees need to believe in the vision and culture, need to feel included in the vision, and be proud of where they work',
			type: TYPE.SURVEY,
			lastModified: new Date() - 3450000,
			status: STATUS.PUBLISHED,
			statusPercent: 83,
		},
		{
			_id: 'h',
			title: 'Whats more important for you?',
			type: TYPE.CHECK_IN,
			lastModified: new Date() - 36487000,
			status: STATUS.PUBLISHED,
			statusPercent: 42,
		},
		{
			_id: 'i',
			title: 'What would you change at work?',
			type: TYPE.CHECK_IN,
			lastModified: new Date() - 74800,
			status: STATUS.PUBLISHED,
			statusPercent: 20,
		},
		{
			_id: 'j',
			title: 'BOOM',
			type: TYPE.CHECK_IN,
			lastModified: new Date() - 64000,
			status: STATUS.PUBLISHED,
			statusPercent: 25,
		},
		{
			_id: 'k',
			title: 'BOOM2',
			type: TYPE.CHECK_IN,
			lastModified: new Date() - 567000,
			status: STATUS.PUBLISHED,
			statusPercent: 1,
		},
	],
	recommendedSurvey: {
		title: 'Embrace Community',
		description: 'You should make an effort to embrace those around you',
		time: 900, // seconds to complete
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

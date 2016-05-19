'use strict';

import * as ActionTypes from '../actions';

const defaultState = {
	appName: 'Culture Shock'
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case ActionTypes.LOG:
			console.log(action.payload);
			break;
	}

	return state;
};

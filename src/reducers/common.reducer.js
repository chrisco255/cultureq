'use strict';

const defaultState = {
	appName: 'Culture Shock'
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case 'LOG':
			console.log(action.payload);
			break;
	}

	return state;
};

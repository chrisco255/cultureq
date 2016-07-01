import * as ActionTypes from './Pillar.actions';

const defaultState = {
	pillars: [{
 		 name: 'Do the right thing',
 		 content: [{
 			 type: "video",
 			 data: "link"
 		 }, {
 			 type: "lunch",
 			 data: "you have been match with joe"
 		 }]
  }, {
 		 name: 'Put people first',
 		 content: [{
 			 type: "video",
 			 data: "link1"
 		 }, {
 			 type: "lunch",
 			 data: "you have been match with chris"
 		 }]
  }, {
 		 name: 'Embrace community',
 		 content: [{
 			 type: "video",
 			 data: "link2"
 		 }, {
 			 type: "lunch",
 			 data: "you have been match with cason"
 		 }]
  }, {
 		 name: 'Make a difference every day',
 		 content: [{
 			 type: "video",
 			 data: "link3"
 		 }, {
 			 type: "lunch",
 			 data: "you have been match with alicia"
 		 }]
  }],
  selectedPillars: []
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.ADD_PILLAR:
			state = Object.assign({}, state, {
				pillars: state.pillars.filter( pillar => pillar.name !== action.payload.pillar.name),
				selectedPillars: [...state.selectedPillars, action.payload.pillar]
			});
			break;
		case ActionTypes.REMOVE_PILLAR:
			state = Object.assign({}, state, {
				pillars: [...state.pillars, action.payload.pillar],
				selectedPillars: state.selectedPillars.filter( pillar => pillar.name !== action.payload.pillar.name)
			});
			break;
		case ActionTypes.ADD_PILLAR_LIST:
			// state = Object.assign({}, state, {
			//
			// });
			console.log('INSIDE ADD_PILLAR_LIST REDUCER');
			break;
	}

	return state;
};

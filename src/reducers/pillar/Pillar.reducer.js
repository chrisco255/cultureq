import * as ActionTypes from './Pillar.actions';

const defaultState = {
	pillars: [{
		 tenantId: '',
 		 name: 'Do the right thing',
 		 content: [],
		 isSelected: false
  }, {
		 tenantId: '',
 		 name: 'Put people first',
 		 content: [],
		 isSelected: false
  }, {
		 tenantId: '',
 		 name: 'Embrace community',
 		 content: [],
		 isSelected: false
  }, {
		 tenantId: '',
 		 name: 'Make a difference every day',
 		 content: [],
		 isSelected: false
  }],
  selectedPillars: [],
	isEditing: false
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.ADD_PILLAR:
			action.payload.pillar.tenantId = action.payload.pillar.tenantId || '';
			action.payload.pillar.isSelected = true;
			action.payload.pillar.content = action.payload.pillar.content || [];
			console.log('ADD_PILLAR', action.payload.pillar);
			state = Object.assign({}, state, {
				pillars: state.pillars.filter( pillar => pillar.name !== action.payload.pillar.name),
				selectedPillars: [...state.selectedPillars, action.payload.pillar]
			});
			break;
		case ActionTypes.REMOVE_PILLAR:
			action.payload.pillar.isSelected = false;
			console.log('REMOVE_PILLAR', action.payload.pillar);
			state = Object.assign({}, state, {
				pillars: [...state.pillars, action.payload.pillar],
				selectedPillars: state.selectedPillars.filter( pillar => pillar.name !== action.payload.pillar.name)
			});
			break;
		case ActionTypes.EDIT_PILLAR:
			console.log('EDIT_PILLAR', action.payload.pillar);
			state = Object.assign({}, state, {
				isEditing: true
			});
			break;
		case ActionTypes.ADD_PILLAR_LIST:
			console.log('ADD_PILLAR_LIST', action.payload.pillars);
			break;
		case ActionTypes.ADD_PILLAR_LIST_SUCCEEDED:
			console.log('ADD_PILLAR_LIST_SUCCEEDED');
			break;
		case ActionTypes.ADD_PILLAR_LIST_FAILED:
			console.log('ADD_PILLAR_LIST_FAILED');
			break;
	}

	return state;
};

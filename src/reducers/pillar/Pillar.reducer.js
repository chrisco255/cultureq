import * as ActionTypes from './Pillar.actions';

const defaultState = {
	pillars: [{
		 _id: 'pillar1',
		 tenantId: 'ulti',
 		 name: 'Do the right thing',
 		 content: [],
		 isSelected: false
  }, {
		 _id: 'pillar2',
		 tenantId: 'ulti',
 		 name: 'Put people first',
 		 content: [],
		 isSelected: false
  }, {
		 _id: 'pillar3',
		 tenantId: 'ulti',
 		 name: 'Embrace community',
 		 content: [],
		 isSelected: false
  }, {
			_id: 'pillar4',
		 tenantId: 'ulti',
 		 name: 'Make a difference every day',
 		 content: [],
		 isSelected: false
  }],
  selectedPillars: [],
	isEditing: false,
	pillarThatIsBeingEdited: null,
	pillarThatIsBeingEditedIndex: -1
};

export default (state = defaultState, action) => {

	switch(action.type) {

		// PILLAR_CREATE
		case ActionTypes.PILLAR_CREATE_SUBMITTED:
			action.payload.pillar.tenantId = action.payload.pillar.tenantId || 'ulti';
			action.payload.pillar.content = action.payload.pillar.content || [];
			console.log('PILLAR_CREATE_SUBMITTED', action.payload.pillar);
			state = Object.assign({}, state, {
				pillars: state.pillars.filter( pillar => pillar.name !== action.payload.pillar.name),
				selectedPillars: [...state.selectedPillars, action.payload.pillar]
			});
			break;
		case ActionTypes.PILLAR_CREATE_SUCCEEDED:
			console.log('PILLAR_CREATE_SUCCEEDED ✅');
			break;
		case ActionTypes.PILLAR_CREATE_FAILED:
			console.log('PILLAR_CREATE_FAILED ❌');
			break;

		// PILLAR_DELETE
		case ActionTypes.PILLAR_DELETE_SUBMITTED:
			console.log('PILLAR_DELETE_SUBMITTED', action.payload.pillar);
			state = Object.assign({}, state, {
				pillars: [...state.pillars, action.payload.pillar],
				selectedPillars: state.selectedPillars.filter( pillar => pillar.name !== action.payload.pillar.name)
			});
			break;
		case ActionTypes.PILLAR_DELETE_SUCCEEDED:
			console.log('PILLAR_DELETE_SUCCEEDED ✅');
			break;
		case ActionTypes.PILLAR_DELETE_FAILED:
			console.log('PILLAR_DELETE_FAILED ❌');
			break;

		// PILLAR_EDIT
		case ActionTypes.EDIT_PILLAR:
			console.log('EDIT_PILLAR', action.payload.pillar);
			state = Object.assign({}, state, {
					isEditing: true,
					pillarThatIsBeingEdited: action.payload.pillar,
					pillarThatIsBeingEditedIndex: action.payload.index
			});
			break;
		case ActionTypes.EDIT_PILLAR_FINISH:
			console.log('EDIT_PILLAR_FINISH', action.payload.pillarName);
			const { pillarName, index } = action.payload;
			const newPillar = Object.assign({}, state.pillars[index], {
		 		 name: pillarName
		  });
			state = Object.assign({}, state, {
					isEditing: false,
					pillarThatIsBeingEditedIndex: -1,
					pillars: [
						...state.pillars.slice(0, index),
						newPillar,
						...state.pillars.slice(index+1)
					]
			});
			break;
	}

	return state;
};

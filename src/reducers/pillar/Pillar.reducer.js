import * as ActionTypes from './Pillar.actions';

const defaultState = {
	pillars: [],
	isEditing: false,
	pillarThatIsBeingEdited: null,
	pillarThatIsBeingEditedIndex: -1
};

export default (state = defaultState, action) => {

	switch(action.type) {

		// PILLAR_CREATE
		case ActionTypes.PILLAR_CREATE_SUBMITTED:
			return createPillar(state, state.pillars, action.payload);
		case ActionTypes.PILLAR_CREATE_SUCCEEDED:
			console.log('PILLAR_CREATE_SUCCEEDED ✅');
			break;
		case ActionTypes.PILLAR_CREATE_FAILED:
			console.log('PILLAR_CREATE_FAILED ❌');
			break;

		// PILLAR_DELETE
		case ActionTypes.PILLAR_DELETE_SUBMITTED:
			return deletePillar(state, state.pillars, action.payload);
		case ActionTypes.PILLAR_DELETE_SUCCEEDED:
			console.log('PILLAR_DELETE_SUCCEEDED ✅');
			break;
		case ActionTypes.PILLAR_DELETE_FAILED:
			console.log('PILLAR_DELETE_FAILED ❌');
			break;

		// PILLAR_NAME_CHANGE
		case ActionTypes.EDIT_PILLAR:
			return editPillar(state, action.payload);
		case ActionTypes.PILLAR_NAME_CHANGE_SUBMITTED:
			return pillarNameChange(state, state.pillars, action.payload);
		case ActionTypes.PILLAR_NAME_CHANGE_SUCCEEDED:
			console.log('PILLAR_NAME_CHANGE_SUCCEEDED ✅');
			break;
		case ActionTypes.PILLAR_NAME_CHANGE_FAILED:
			console.log('PILLAR_NAME_CHANGE_FAILED ❌');
			break;

		// FETCH_PILLARS
		case ActionTypes.FETCH_PILLARS_SUBMITTED:
			console.log('FETCH_PILLARS_SUBMITTED ▶️');
			break;
		case ActionTypes.FETCH_PILLARS_SUCCEEDED:
			return fetchPillars(state, action.payload);
		case ActionTypes.FETCH_PILLARS_FAILED:
			console.log('FETCH_PILLARS_FAILED ❌');
			break;
	}

	return state;
};

function createPillar(state, pillars, payload) {
	console.log('PILLAR_CREATE_SUBMITTED ▶️', payload.pillar);
	payload.pillar.tenantId = payload.pillar.tenantId || 'ulti';
	payload.pillar.content = payload.pillar.content || [];
	state = Object.assign({}, state, {
		pillars: pillars.filter( pillar => pillar._id !== payload.pillar._id)
	});
	return state;
}

function deletePillar(state, pillars, payload) {
	console.log('PILLAR_DELETE_SUBMITTED ▶️', payload.pillar);
	var pillarIndex = _.findIndex(pillars, function(pillar) {
		return pillar._id === payload.pillar._id;
	});
	const newPillar = Object.assign({}, pillars[pillarIndex], {
		 isDeleted: true
	});
	state = Object.assign({}, state, {
		pillars: [
			...pillars.slice(0, pillarIndex),
			newPillar,
			...pillars.slice(pillarIndex + 1)
		]
	});
	return state;
}

function editPillar(state, payload) {
	console.log('EDIT_PILLAR ✏️', payload.pillar);
	state = Object.assign({}, state, {
			isEditing: true,
			pillarThatIsBeingEdited: payload.pillar,
			pillarThatIsBeingEditedIndex: payload.index
	});
	return state;
}

function pillarNameChange(state, pillars, payload) {
	console.log('PILLAR_NAME_CHANGE_SUBMITTED ▶️', payload);
	const { pillarName, index } = payload;
	const newPillar = Object.assign({}, pillars[index], {
		 name: pillarName
	});
	state = Object.assign({}, state, {
			isEditing: false,
			pillarThatIsBeingEditedIndex: -1,
			pillars: [
				...pillars.slice(0, index),
				newPillar,
				...pillars.slice(index+1)
			]
	});
	return state;
}

/*
	NOTE: Not filtering out the pillars if they are deleted or not
	because it will mess up with the index and when
	editing, it will edit the wrong index
*/
function fetchPillars(state, payload) {
	state = Object.assign({}, state, {
		pillars: [ ...payload.pillars ]
	});
	console.log('FETCH_PILLARS_SUCCEEDED ✅');
	return state;
}

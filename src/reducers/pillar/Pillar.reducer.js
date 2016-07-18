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
			console.log('PILLAR_DELETE_SUBMITTED ▶️', action.payload.pillar);
			break;
		case ActionTypes.PILLAR_DELETE_SUCCEEDED:
			return deletePillar(state, state.pillars, action.payload);
		case ActionTypes.PILLAR_DELETE_FAILED:
			console.log('PILLAR_DELETE_FAILED ❌');
			break;

		// PILLAR_NAME_CHANGE
		case ActionTypes.EDIT_PILLAR:
			return editPillar(state, action.payload);
		case ActionTypes.PILLAR_NAME_CHANGE_SUBMITTED:
			console.log('PILLAR_NAME_CHANGE_SUBMITTED ▶️', action.payload.pillarName);
			break;
		case ActionTypes.PILLAR_NAME_CHANGE_SUCCEEDED:
			return pillarNameChange(state, state.pillars, action.payload);
		case ActionTypes.PILLAR_NAME_CHANGE_FAILED:
			console.log('PILLAR_NAME_CHANGE_FAILED ❌');
			break;

		// FETCH_PILLARS
		case ActionTypes.FETCH_PILLARS_SUBMITTED:
			console.log('FETCH_PILLARS_SUBMITTED ▶️');
			break;
		case ActionTypes.FETCH_PILLARS_SUCCEEDED:
			return fetchPillars(state, state.pillars, action.payload);
		case ActionTypes.FETCH_PILLARS_FAILED:
			console.log('FETCH_PILLARS_FAILED ❌');
			break;
	}

	return state;
};

function createPillar(state, pillars, payload) {
	payload.pillar.tenantId = payload.pillar.tenantId || 'ulti';
	payload.pillar.content = payload.pillar.content || [];
	state = Object.assign({}, state, {
		pillars: pillars.filter( pillar => pillar._id !== payload.pillar._id)
	});
	console.log('PILLAR_CREATE_SUBMITTED ▶️', payload.pillar);
	return state;
}

function deletePillar(state, pillars, payload) {
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
	console.log('PILLAR_DELETE_SUCCEEDED ✅');
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
	console.log('PILLAR_NAME_CHANGE_SUCCEEDED ✅');
	return state;
}

function fetchPillars(state, pillars, payload) {
	state = Object.assign({}, state, {
		pillars: [ ...pillars, ...payload.pillars.filter( pillar => !pillar.isDeleted) ]
	});
	console.log('FETCH_PILLARS_SUCCEEDED ✅');
	return state;
}

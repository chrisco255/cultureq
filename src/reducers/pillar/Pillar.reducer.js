import * as ActionTypes from './Pillar.actions';
import _ from 'lodash';

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
			console.log('PILLAR_CREATE_SUBMITTED ▶️', action.payload.pillar);
			action.payload.pillar.tenantId = action.payload.pillar.tenantId || 'ulti';
			action.payload.pillar.content = action.payload.pillar.content || [];
			action.payload.pillar.isDeleted = false;
			break;
		case ActionTypes.PILLAR_CREATE_SUCCEEDED:
			return createPillar(state, state.pillars, action.payload);
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

		default:
			console.log('Genius is one percent inspiration and ninety-nine percent perspiration. - Thomas A. Edison');
			break;
	}

	return state;
};

function createPillar(state, pillars, payload) {
	const newState = Object.assign({}, state, {
		pillars: [...pillars, payload]
	});
	console.log('PILLAR_CREATE_SUCCEEDED ✅');
	return newState;
}

function deletePillar(state, pillars, payload) {
	console.log('PILLAR_DELETE_SUBMITTED ▶️', payload.pillar);
	const pillarIndex = _.findIndex(pillars, function(pillar) {
		return pillar._id === payload.pillar._id;
	});
	const newPillar = Object.assign({}, pillars[pillarIndex], {
		 isDeleted: true
	});
	return Object.assign({}, state, {
		pillars: [
			...pillars.slice(0, pillarIndex),
			newPillar,
			...pillars.slice(pillarIndex + 1)
		]
	});
}

function editPillar(state, payload) {
	console.log('EDIT_PILLAR ✏️', payload.pillar);
	return Object.assign({}, state, {
			isEditing: true,
			pillarThatIsBeingEdited: payload.pillar,
			pillarThatIsBeingEditedIndex: payload.index
	});
}

function pillarNameChange(state, pillars, payload) {
	console.log('PILLAR_NAME_CHANGE_SUBMITTED ▶️', payload);
	const { pillarName, index } = payload;
	const newPillar = Object.assign({}, pillars[index], {
		 name: pillarName
	});
	return Object.assign({}, state, {
			isEditing: false,
			pillarThatIsBeingEditedIndex: -1,
			pillars: [
				...pillars.slice(0, index),
				newPillar,
				...pillars.slice(index + 1)
			]
	});
}

/*
	NOTE: Not filtering out the pillars if they are deleted or not
	because it will mess up with the index and when
	editing, it will edit the wrong index
*/
function fetchPillars(state, payload) {
	const newState = Object.assign({}, state, {
		pillars: [ ...payload.pillars ]
	});
	console.log('FETCH_PILLARS_SUCCEEDED ✅');
	return newState;
}

import * as ActionTypes from './Pillar.actions';
import _ from 'lodash';

const defaultState = {
	pillars: [],
	isEditing: false,
	pillarThatIsBeingEdited: null
};

export default (state = defaultState, action) => {

	const { pillars } = state;
	const { payload } = action;

	switch(action.type) {

		// PILLAR_CREATE
		case ActionTypes.PILLAR_CREATE_SUBMITTED:
			console.log('PILLAR_CREATE_SUBMITTED ▶️', payload.pillar);
			payload.pillar.tenantId = payload.pillar.tenantId || 'ulti';
			payload.pillar.content = payload.pillar.content || [];
			payload.pillar.isDeleted = false;
			break;
		case ActionTypes.PILLAR_CREATE_SUCCEEDED:
			return createPillar(state, pillars, payload);
		case ActionTypes.PILLAR_CREATE_FAILED:
			console.log('PILLAR_CREATE_FAILED ❌');
			break;

		// PILLAR_DELETE
		case ActionTypes.PILLAR_DELETE_SUBMITTED:
			return deletePillar(state, pillars, payload);
		case ActionTypes.PILLAR_DELETE_SUCCEEDED:
			console.log('PILLAR_DELETE_SUCCEEDED ✅');
			break;
		case ActionTypes.PILLAR_DELETE_FAILED:
			console.log('PILLAR_DELETE_FAILED ❌');
			break;

		// PILLAR_NAME_CHANGE
		case ActionTypes.EDIT_PILLAR:
			return editPillar(state, payload);
		case ActionTypes.PILLAR_NAME_CHANGE_SUBMITTED:
			return pillarNameChange(state, pillars, payload);
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
			return fetchPillars(state, payload);
		case ActionTypes.FETCH_PILLARS_FAILED:
			console.log('FETCH_PILLARS_FAILED ❌');
			break;

		default:
			return state;
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
	const pillarIndex = _.findIndex(pillars, (pillar) => pillar._id === payload.pillar._id);
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
			pillarThatIsBeingEdited: payload.pillar
	});
}

function pillarNameChange(state, pillars, payload) {
	console.log('PILLAR_NAME_CHANGE_SUBMITTED ▶️', payload);
	const { _id, pillarName } = payload;
	const pillarIndex = _.findIndex(pillars, (pillar) => pillar._id === _id);
	const newPillar = Object.assign({}, pillars[pillarIndex], {
		 name: pillarName
	});
	return Object.assign({}, state, {
			isEditing: false,
			pillars: [
				...pillars.slice(0, pillarIndex),
				newPillar,
				...pillars.slice(pillarIndex + 1)
			]
	});
}

function fetchPillars(state, payload) {
	let { pillars } = payload;
	pillars = pillars.filter((pillar) => !pillar.isDeleted);
	const newState = Object.assign({}, state, {
		pillars: [ ...pillars ]
	});
	console.log('FETCH_PILLARS_SUCCEEDED ✅');
	return newState;
}

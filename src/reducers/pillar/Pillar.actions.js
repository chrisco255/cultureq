export const ADD_PILLAR = 'ADD_PILLAR';
export const REMOVE_PILLAR = 'REMOVE_PILLAR';
export const EDIT_PILLAR = 'EDIT_PILLAR';
export const EDIT_PILLAR_FINISH = 'EDIT_PILLAR_FINISH';

export const ADD_PILLAR_LIST = 'ADD_PILLAR_LIST';
export const ADD_PILLAR_LIST_SUCCEEDED = 'ADD_PILLAR_LIST_SUCCEEDED';
export const ADD_PILLAR_LIST_FAILED = 'ADD_PILLAR_LIST_FAILED';

// Adds a pillar to the selectedPillars array
export function addPillar(pillar) {
	return {
		type: ADD_PILLAR,
		payload: { pillar }
	};
}

// Removes a pillar from the selectedPillars array and adds it to pillars array
export function removePillar(pillar) {
	return {
		type: REMOVE_PILLAR,
		payload: { pillar }
	};
}

// Edit a pillar
export function editPillar(pillar, index) {
	return {
		type: EDIT_PILLAR,
		payload: { pillar, index }
	}
}

// Finish editing pillar
export function editPillarFinish(pillarName, index) {
	return {
		type: EDIT_PILLAR_FINISH,
		payload: { pillarName, index }
	}
}

// Adds the selectedPillars list to the server
export function addPillarList(pillars) {
	return {
		type: ADD_PILLAR_LIST,
		payload: { pillars }
	};
}

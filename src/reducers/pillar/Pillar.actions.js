export const PILLAR_CREATE_SUBMITTED = 'PILLAR_CREATE_SUBMITTED';
export const PILLAR_CREATE_SUCCEEDED = 'PILLAR_CREATE_SUCCEEDED';
export const PILLAR_CREATE_FAILED = 'PILLAR_CREATE_FAILED';

export const PILLAR_DELETE_SUBMITTED = 'PILLAR_DELETE_SUBMITTED';
export const PILLAR_DELETE_SUCCEEDED = 'PILLAR_DELETE_SUCCEEDED';
export const PILLAR_DELETE_FAILED = 'PILLAR_DELETE_FAILED';

export const EDIT_PILLAR = 'EDIT_PILLAR';
export const EDIT_PILLAR_FINISH = 'EDIT_PILLAR_FINISH';

/*
	Adds a pillar to the selectedPillars array
	Calls the saga to post to the pillar service
	to create the pillar and mark as isSelected: true
*/
export function createPillar(pillar) {
	return {
		type: PILLAR_CREATE_SUBMITTED,
		payload: { pillar }
	};
}

/*
	 Removes a pillar from the selectedPillars array
	 and adds it back to the pillars array
	 Calls the saga to post to the pillar service
	 that it isSelected: false & isDeleted: true
*/
export function deletePillar(pillar) {
	return {
		type: PILLAR_DELETE_SUBMITTED,
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

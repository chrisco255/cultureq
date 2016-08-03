export const PILLAR_CREATE_SUBMITTED = 'PILLAR_CREATE_SUBMITTED';
export const PILLAR_CREATE_SUCCEEDED = 'PILLAR_CREATE_SUCCEEDED';
export const PILLAR_CREATE_FAILED = 'PILLAR_CREATE_FAILED';

export const PILLAR_DELETE_SUBMITTED = 'PILLAR_DELETE_SUBMITTED';
export const PILLAR_DELETE_SUCCEEDED = 'PILLAR_DELETE_SUCCEEDED';
export const PILLAR_DELETE_FAILED = 'PILLAR_DELETE_FAILED';

export const EDIT_PILLAR = 'EDIT_PILLAR';
export const PILLAR_NAME_CHANGE_SUBMITTED = 'PILLAR_NAME_CHANGE_SUBMITTED';
export const PILLAR_NAME_CHANGE_SUCCEEDED = 'PILLAR_NAME_CHANGE_SUCCEEDED';
export const PILLAR_NAME_CHANGE_FAILED = 'PILLAR_NAME_CHANGE_FAILED';

export const FETCH_PILLARS_SUBMITTED = 'FETCH_PILLARS_SUBMITTED';
export const FETCH_PILLARS_SUCCEEDED = 'FETCH_PILLARS_SUCCEEDED';
export const FETCH_PILLARS_FAILED = 'FETCH_PILLARS_FAILED';


export function fetchPillars({ query }) {
	return {
		type: FETCH_PILLARS_SUBMITTED,
		payload: { query }
	};
}

/*
	Adds a pillar to the pillars array
	Calls the saga to post to the pillar service
	to create the pillar
*/
export function createPillar(pillar) {
	return {
		type: PILLAR_CREATE_SUBMITTED,
		payload: { pillar }
	};
}

/*
	 Removes a pillar from the pillars array
	 and adds it back to the pillars array
	 Calls the saga to post to the pillar service
	 and changes property, isDeleted: true
*/
export function deletePillar(pillar) {
	return {
		type: PILLAR_DELETE_SUBMITTED,
		payload: { pillar }
	};
}

/*
	Edit a pillar sets the defaultState of
	isEditing to true, to begin editing a
	pillar and which pillar and it's index
*/
export function editPillar(pillar, index) {
	return {
		type: EDIT_PILLAR,
		payload: { pillar, index }
	};
}

/*
	Edits the name of a pillar by creating a new object
	and assigning it the new name
	Calls the saga to post to the pillar service
	which will just create the name change event
*/
export function nameChangePillar(pillarName, index) {
	return {
		type: PILLAR_NAME_CHANGE_SUBMITTED,
		payload: { pillarName, index }
	};
}

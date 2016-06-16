import * as ActionTypes from './Tenant.actions';

const defaultState = {
	tenants: [{
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
  selectedTenants: []
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.ADD_TENANT:
			state = Object.assign({}, state, {
				tenants: state.tenants.filter( tenant => tenant.name !== action.payload.tenant.name),
				selectedTenants: [...state.selectedTenants, action.payload.tenant]
			});
			break;
		case ActionTypes.REMOVE_TENANT:
			state = Object.assign({}, state, {
				tenants: [...state.tenants, action.payload.tenant],
				selectedTenants: state.selectedTenants.filter( tenant => tenant.name !== action.payload.tenant.name)
			});
			break;
	}

	return state;
};

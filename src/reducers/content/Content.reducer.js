import * as ActionTypes from './Content.actions';

const defaultState = {
	contents: [{
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
  selectedContents: [],
	isEditing: false
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.ADD_CONTENT:
			// action.payload.content.tenantId = action.payload.content.tenantId || '';
			// action.payload.content.isSelected = true;
			// action.payload.content.content = action.payload.content.content || [];
			// console.log('ADD_CONTENT', action.payload.content);
			// state = Object.assign({}, state, {
			// 	contents: state.contents.filter( content => content.name !== action.payload.content.name),
			// 	selectedContents: [...state.selectedContents, action.payload.content]
			// });
			break;
		case ActionTypes.REMOVE_CONTENT:
			// action.payload.content.isSelected = false;
			// console.log('REMOVE_CONTENT', action.payload.content);
			// state = Object.assign({}, state, {
			// 	contents: [...state.contents, action.payload.content],
			// 	selectedContents: state.selectedContents.filter( content => content.name !== action.payload.content.name)
			// });
			break;
		case ActionTypes.EDIT_CONTENT:
			// console.log('EDIT_CONTENT', action.payload.content);
			// state = Object.assign({}, state, {
			// 		isEditing: true
			// });
			break;
		case ActionTypes.ADD_CONTENT_LIST:
			console.log('ADD_CONTENT_LIST', action.payload.contents);
			break;
		case ActionTypes.ADD_CONTENT_LIST_SUCCEEDED:
			console.log('ADD_CONTENT_LIST_SUCCEEDED');
			break;
		case ActionTypes.ADD_CONTENT_LIST_FAILED:
			console.log('ADD_CONTENT_LIST_FAILED');
			break;
	}

	return state;
};

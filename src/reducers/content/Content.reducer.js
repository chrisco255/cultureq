import * as ActionTypes from './Content.actions';

const defaultState = {
    contents: [{
        _id: 'vidContent1',
        pillarId: '',
        type: 'video',
        data: {
            // for video
            title: 'Why UltiPeeps Think Ultimate Software Is So Great',
            description: 'Check out this cool video of why UltiPeeps think Ultimate Software is a great place to work!',
            url: 'https://www.youtube.com/watch?v=JrHGFIWX2R4',
            // for quote
            quote: undefined,
            author: undefined,
            // for lunch
            fullName: undefined,
            position: undefined
        }
    }, {
        _id: 'quoteContent1',
        pillarId: '',
        type: 'quote',
        data: {
            // for video
            title: undefined,
            description: undefined,
            url: undefined,
            // for quote
            quote: 'Take care of our peoples families, and they will take care of ours.',
            author: 'Scott Scherr',
            // for lunch
            fullName: undefined,
            position: undefined
        }
    }, {
				_id: 'lunchContent1',
        pillarId: '',
        type: 'lunch',
        data: {
            // for video
            title: undefined,
            description: undefined,
            url: undefined,
            // for quote
            quote: undefined,
            author: undefined,
            // for lunch
            fullName: 'Scott Scherr',
            position: 'CEO and Founder'
        }
    }],
    selectedContents: [],
    isEditing: false
};

export default (state = defaultState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_CONTENT:
            action.payload.content.pillarId = action.payload.content.pillarId || '';
            action.payload.content.contents = action.payload.content.contents || [];
            console.log('ADD_CONTENT', action.payload.content);
            state = Object.assign({}, state, {
                contents: state.contents.filter(content => content.name !== action.payload.content.name),
                selectedContents: [...state.selectedContents, action.payload.content]
            });

            break;
        case ActionTypes.REMOVE_CONTENT:
            console.log('REMOVE_CONTENT', action.payload.content);
            state = Object.assign({}, state, {
            	contents: [...state.contents, action.payload.content],
            	selectedContents: state.selectedContents.filter( content => content.name !== action.payload.content.name)
            });
            break;
        case ActionTypes.EDIT_CONTENT:
            console.log('EDIT_CONTENT', action.payload.content);
            state = Object.assign({}, state, {
            		isEditing: true
            });
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

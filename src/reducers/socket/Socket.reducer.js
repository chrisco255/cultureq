import * as ActionTypes from './Socket.actions';

const defaultState = {
	socketId: null,
	rooms: []
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case ActionTypes.SOCKET_CONNECTED:
			state = Object.assign({}, state, {
				socketId: action.payload.socketId
			});
			break;
    case ActionTypes.SOCKET_DISCONNECTED:
			state = Object.assign({}, state, {
				socketId: null
			});
			break;
		case ActionTypes.SOCKET_JOINED_ROOM:
			state = Object.assign({}, state, {
				rooms: [...state.rooms, action.payload.room]
			});
			break;
		case ActionTypes.SOCKET_LEFT_ROOM:
			state = Object.assign({}, state, {
				rooms: state.rooms.filter( room => room !== action.payload.room)
			});
			break;
	}

	return state;
};

// This is a Redux Selector:
// https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers
export const getSocketId = (state) => state.socket.socketId;

import * as ActionTypes from './Socket.actions';

const defaultState = {
  socketId: null,
  rooms: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.SOCKET_CONNECTED:
      return {
        ...state,
        ...{
          socketId: action.payload.socketId
        }
      };
    case ActionTypes.SOCKET_DISCONNECTED:
      return {
        ...state,
        ...{
          socketId: null
        }
      };
    case ActionTypes.SOCKET_JOINED_ROOM:
      return {
        ...state,
        ...{
          rooms: [...state.rooms, action.payload.room]
        }
      };
    case ActionTypes.SOCKET_LEFT_ROOM:
      return {
        ...state,
        ...{
          rooms: state.rooms.filter(room => room !== action.payload.room)
        }
      };
    default:
      return {
        ...state
      };
  }
};

// This is a Redux Selector:
// https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers
export const getSocketId = (state) => state.socket.socketId;

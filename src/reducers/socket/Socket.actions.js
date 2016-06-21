export const SOCKET_CONNECTED = 'SOCKET_CONNECTED';
export const SOCKET_DISCONNECTED = 'SOCKET_DISCONNECTED';

export const SOCKET_JOINED_ROOM = 'SOCKET_JOINED_ROOM';
export const SOCKET_LEFT_ROOM = 'SOCKET_LEFT_ROOM';

export function socketJoinRoom({ room }) {
	return {
		type: SOCKET_JOINED_ROOM,
		payload: { room }
	};
}

export function socketLeaveRoom({ room }) {
	return {
		type: SOCKET_LEFT_ROOM,
		payload: { room }
	};
}

export function socketConnect({ socketId }) {
	return {
		type: SOCKET_CONNECTED,
		payload: { socketId }
	};
}

export function socketDisconnect() {
	return {
		type: SOCKET_DISCONNECTED
	};
}

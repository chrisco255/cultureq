import { socketConnect, socketDisconnect } from '../reducers/socket/Socket.actions';
import io from 'socket.io-client';

var socket;

export default function configureSocket(store) {
  if(!store) { throw new Error('configureSocket requires store to be passed in') }

  socket = io('http://localhost:8090');

  socket.on('connect', () => {
    store.dispatch( socketConnect({ socketId: socket.id }) );
  });

  socket.on('disconnect', () => {
    store.dispatch( socketDisconnect() );
  });

  socket.on('error', (err) => {
    console.log('SOCKET_ERROR: ', err);
  });

  socket.on('event', event => {
    console.log('DISPATCHING EVENT FROM SOCKET: ', event);
    store.dispatch(event);
  });

}

// setInterval( function() {
//   console.log(socket)
// }, 10 * 1000);


export const joinRoom = function(name) {
  console.log(`Joining Room: ${name}`);
  socket.emit('joinRoom', name);
};

export const leaveRoom = function(name) {
  console.log(`Leaving Room: ${name}`);
  socket.emit('leaveRoom', name);
};

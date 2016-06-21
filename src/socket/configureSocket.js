import { socketConnect, socketDisconnect } from '../reducers/socket/Socket.actions';
import io from 'socket.io-client';
import config from '../config';

var socket;

export default function configureSocket(store) {
  if(!config.useSockets) return;
  if(!store) { throw new Error('configureSocket requires store to be passed in') }

  socket = io(config.socketUrl);

  socket.on('connect', () => {
    store.dispatch( socketConnect({ socketId: socket.id }) );
  });

  socket.on('disconnect', () => {
    store.dispatch( socketDisconnect() );
  });

  socket.on('error', (err) => {
    console.log('SOCKET_ERROR: ', err);
  });

  socket.on('event', (event) => {
    console.log('DISPATCHING EVENT FROM SOCKET: ', event);
    store.dispatch(event);
  });

}


export const joinRoom = function(name) {
  if(!config.useSockets) return;
  console.log(`Joining Room: ${name}`);
  socket.emit('joinRoom', name);
};

export const leaveRoom = function(name) {
  if(!config.useSockets) return;
  console.log(`Leaving Room: ${name}`);
  socket.emit('leaveRoom', name);
};

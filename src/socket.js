import { io } from 'socket.io-client';

export const socket = io('http://192.168.1.24:5200');

socket.on('connect', () => {
  console.log('Socket.IO connected');
});

socket.on('disconnect', () => {
  console.log('Socket.IO disconnected');
});

socket.on('error', () => {
  console.log('Socket.IO ERROR!');
});

socket.on('connect_error', (error) => {
  console.error('Connection failed:', error);
});

socket.onAny((msg) => {
  console.log('SERVER MESSAGE', msg);
});

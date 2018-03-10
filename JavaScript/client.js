'use strict';

const net = require('net');

const connectListener = () => {
  console.log(`LocalPort: ${socket.localPort}`);
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      socket.write(chunk);
    }
  });
};

const socket = net.createConnection({
    port: 3000,
    host: '127.0.0.1',
  }, connectListener
);

socket.on('connect', () => {
  console.log('server connected');
});

socket.on('data', (data) => {
  console.log(data.toString());
});

socket.on('end', () => {
  console.log('server disconnected');
});

socket.on('error', (err) => {
  console.log(`Error happened: ${err.message}`);
});
'use strict';

const net = require('net');
const clients = [];
let clientId = 0;
const port = 3000;

const broadcast = (socket, message, arr) => {// third argument is an array of clients
  if(arr.length === 0){
    console.log('Everyone left the chat');
    // process.stdout.write('Everyone left the chat');
    return;
  }
  arr.forEach((client) => {
    if(client !== socket) client.write(`${socket.name}:  ${message}`);
  });
};

const adminMessage = (socket, message, arr) => {
  if(arr.length === 0){
    console.log('Everyone left the chat');
    // process.stdout.write('Everyone left the chat');
    return;
  }
  arr.forEach((client) => {
    if(client !== socket) client.write(`Admin:  ${message}`);
  });
};

const removeClient = (socket, arr) => {
  arr.splice(arr.indexOf(socket), 1);
};

const server = net.createServer((socket) => {
  clientId ++;
  socket.name =  `Guest ${clientId}`;
  
  clients.push(socket);
  
  socket.write('Welcome to our chat');
  adminMessage(socket, `${socket.name} joined`, clients);
  
  socket.on('data', (message) => {
    broadcast(socket, message, clients);
  });
  
  socket.on('end', () => {
    removeClient(socket, clients);
    adminMessage(socket, `${socket.name} left the chat`, clients);
  });
  
  socket.on('close', () => {
    removeClient(socket, clients);
    adminMessage(socket, `${socket.name} left the chat`, clients);
  });
  
  socket.on('error', (err) => {
    console.log('message was not submitted  ' + err.message);
  });
});
server.listen(port, () => {
  console.log(`Listen port: ${port}`);
});






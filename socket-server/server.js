const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(__dirname))
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
//   console.log('a user connected to: ' +  socket.id);
socket.emit("messageFromServer", "Welcome to the server!");

socket.on('messageFromClient', (msg) => {
    console.log('Recevied from client: ' + msg);
})
//    socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
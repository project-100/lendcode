const express = require('express');
const app = express();
const socket = require('socket.io');
const path = require('path');

const { port } = require('./env');

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('Connected to Socket...');

  socket.on('room', (message) => {
    socket.join(message);
    socket.broadcast.to(message).emit('senddata', 'userjoined');
  });

  socket.on('code', (message) => {
    socket.broadcast.to(message.room).emit('code', message.data);
  });
});

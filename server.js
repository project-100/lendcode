const express = require('express');
const app = express();
require('dotenv').config()
const path = require('path');
const port = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'public')));

const socketio = require('socket.io');
const io = socketio(server);
io.on('connection',socket =>{
    console.log('connected');
socket.on("room",message=>{
    socket.join(message);
    socket.broadcast.to(message).emit("senddata","userjoined");
});
socket.on("code",message=>{
     socket.broadcast.to(message.room).emit("code",message.data);
});

});

server.listen(port,()=>{
    console.log(`server running at ->http://localhost/${port}`)
});
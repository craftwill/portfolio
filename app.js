const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const socketManager = require('./modules/SocketManager');

app.use(express.static('public'));

io.on('connection', function(socket){
    // Connection
    socketManager.connectionClient(socket);
});

http.listen(process.env.PORT || 2003, function(){
  console.log('listening on *:2003');
});
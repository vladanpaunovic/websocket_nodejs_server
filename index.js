var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    console.log("I am here");
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log("I made a connection");
    socket.on('disconnect', function(){
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});
http.listen(3000, function(){
    console.log('listening on *:3000');
});

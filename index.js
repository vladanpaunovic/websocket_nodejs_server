var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require('axios');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/json/:user', function(req, res){
    var user = req.params.user;

    var dataObject = {};

    console.log("here we are");
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
        console.log("response success", response);
        dataObject.response = response;
    })
    .catch(function (error) {
        console.log("response error", error);
    });

    res.json(dataObject);
});

io.on('connection', function(socket){
    socket.on('disconnect', function(){
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});
http.listen(process.env.PORT || 3000, function(){
    console.log('listening on %s', process.env.PORT || 3000);
});

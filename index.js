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

    axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
            ID: 12345
        }
    })
    .then(function (response) {
        console.log(response);
        dataObject = response
    })
    .catch(function (error) {
        console.log(error);
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

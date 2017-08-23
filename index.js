let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let axios = require('axios');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});



app.get('/json/text/:text', function (req, res) {
    let text = req.params.text;
    let dataObject = {text, success: true};

    io.emit('chat message', text);

    res.json(dataObject);
});



io.on('connection', function (socket) {
    socket.on('disconnect', function () {
    });
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
http.listen(process.env.PORT || 3000, function () {
    console.log('listening on %s', process.env.PORT || 3000);
});

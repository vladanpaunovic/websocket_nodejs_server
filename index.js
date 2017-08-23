let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let axios = require('axios');

// Render the homepage (optional)
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Test RestAPI page takes string as an argument
app.get('/json/text/:string', function (req, res) {
    let string = req.params.string;
    let dataObject = {string, success: true};
    io.emit('chat message', string);
    res.json(dataObject);
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        // On disconnect show that user is not available or something else
    });
});
http.listen(process.env.PORT || 3000, function () {
    console.log('listening on %s', process.env.PORT || 3000);
});

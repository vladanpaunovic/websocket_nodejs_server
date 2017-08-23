var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/json/:user', function(req, res){
    var user = req.params.user;

    var dataObject = {
        "user": user,
        "success": true,
        "session": {
            "id": "GUuN8fhRYEb2CQAXjE8Aa7qyMUEZf9S5K8mBtdw6bQqKS2Kj",
            "user_id": "VDOo4pqWGPlei0Vv"
        },
        "info": {
            "count": 50,
            "offset": 0,
            "limit": 50
        },
        "result": {
            "20": {
                "key": 20,
                "items": [
                    {
                        "title": "Test",
                        "description": "Hallo du",
                        "locality": "Kottingbrunn",
                        "price": 56,
                        "currency": "EUR",
                        "media": [
                            {
                                "id": "57054bb66cfc286e43dfd894",
                                "w": 1232,
                                "h": 616,
                                "title": "Test-bf8475a"
                            }
                        ],
                        "is_new": false,
                        "is_sold": false,
                        "for_free": false,
                        "count_likes": 0,
                        "is_liked": false,
                        "language": "de",
                        "date_start": 1459964854,
                        "date_modified": 1459964854,
                        "expires_in": null,
                        "distance": 17.64,
                        "id": "VwVLtmz8KG5Di0Vn"
                    }
                ]
            }
        }
    };

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

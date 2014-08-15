var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    users = require('./js/users.json');

app.get('/', function (req, res) {
    res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('message', function (data) {
        console.log(data);
        io.emit('receive', data);
    });
});

http.listen(8087, function () {
    console.log('listening on *:8087');
});
var express = require('express');
var http = require('http');
var path = require('path');
var Primus = require('primus');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.errorHandler());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


var server = http.createServer(app);
var primus = new Primus(server, { transformer: 'websockets' });

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

primus.on('connection', function(socket) {
    socket.on('data', function (msg) {
        console.log('Msg received: ', msg);

        if (msg === 'ping') {
            socket.write({ reply: 'pong' });
        }

    });
});


// Setting up variables
var express = require('express');
var http = require('http');
var path = require('path');
var Primus = require('primus');
var sendgrid  = require('sendgrid')("cuemby", "269955Cuemby");
var usergrid = require('usergrid');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.errorHandler());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Services setups
var server = http.createServer(app);
var primus = new Primus(server, { transformer: 'websockets' });
var apigee = new usergrid.client({ orgName:'cuemby', appName:'sandbox' });

// Routes & Actions Api





// var properties = { type: "call", outgoing: "7865034273", incomming: "2397451932"};
// apigee.createEntity(properties, function(error, response){
// 	if (error){
// 		console.log(error);
// 	}else{
// 		console.log(response.get());
// 	}
// });


// sendgrid.send({
//   to:       'cristhercastro@gmail.com',
//   from:     'support@commotions.com',
//   subject:  'Hello World',
//   text:     'My first email through SendGrid.'
// }, function(err, json) {
//   if (err) { return console.error(err); }
//   console.log(json);
// });

// primus.on('connection', function(socket) {
//     socket.on('data', function (msg) {
//         console.log('Msg received: ', msg);

//         if (msg === 'ping') {
//             socket.write({ reply: 'pong' });
//         }

//     });
// });

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
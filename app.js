// Setting up variables
var express = require('express');
var http = require('http');
var path = require('path');
var Primus = require('primus');
var sendgrid  = require('sendgrid')("cuemby", "269955Cuemby");
var usergrid = require('usergrid');
var twilio = require('twilio')('ACf2d201d166e0461b2298c029653bfc91', '22e57e63fb9ec9f88609ac919175810b');
var paypal_sdk = require('paypal-rest-sdk');
var user = "";
var app = express();

app.set('port', process.env.PORT || 5000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.errorHandler());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public/www')));

// Services setups
var server = http.createServer(app);
var primus = new Primus(server, { transformer: 'websockets' });
var apigee = new usergrid.client({ orgName:'cuemby', appName:'sandbox' });
paypal_sdk.configure({
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'AStUfBBQojhluYi-LfUYYsJaA9WYjvbvcY2x3xdcx7gpHrpy-jsMTLUXkU4D',
    'client_secret': 'ELz08hChw4h2JbCFFSA7x_gmkQ_FMDGpyn-CJQ2vWxEzKNdRmE8EAFx51VG5'
});

// Routes & Actions Api
app.post('/login', function(req, res){
    console.log(JSON.stringify(req.body));
    apigee.login(req.body.username, req.body.password, function (error, response) {
            if (error) {
                //error — could not log user in
                res.send({ token: "" });
            } else {
                //success — user has been logged in
                console.log(response.access_token);
                user = response.access_token;
                res.send({ token: user });
            }
        }
    );
});

// Twilio
app.post('/voice', function(req, res){});
app.post('/sms', function(req, res){});
app.get('/call/:number', function(req, res){
    var promise = twilio.makeCall({
        to:'7863612104', // a number to call
        from:'8052836298', // a Twilio number you own
        url:'http://commotion.cuemby.com:5000/voice-record' // A URL containing TwiML instructions for the call
    });
    promise.then(function(call) {
        console.log('Call success! Call SID: '+call.sid);
    }, function(error) {
        console.error('Call failed!  Reason: '+error.message);
    });
});

app.get('/call/:number/:user', function(req, res) {
  var promise = twilio.makeCall({
    to: req.params.number,
    from: '8052836298',
    url: 'http://commotion.cuemby.com:5000/voice-record/' + req.params.user
  });
  promise.then(function(call) {
    console.log('Call success! Call SID: ' + call.sid);
  }, function(error) {
    console.error('Call failed!  Reason: ' + error.message);
  });
});

app.post('/voice-record/:username?', function(req, res) {
  var twiml = require('twilio');
  var resp = new twiml.TwimlResponse();
  var opt = {
    voice: 'woman',
    language: 'en-gb'
  };

  console.log('VOICE-RECORD::REQ_BODY', req.body);
  console.log('RESP::TWILIO', JSON.stringify(resp));
  resp.say('Welcome CommMotion!', opt);
  if (req.params.username) {
    resp.say(req.params.username + ' is trying to call you!');
  };
  resp.say('One moment please ...', opt);
  resp.gather({
    timeout: 30,
    action: 'http://commotion.cuemby.com:5000/callend',
    finishOnKey: '*'
  }, function() {
    this.say('Connecting !', opt);
  });
  res.send(resp.toString());
});

// Funtions

//var payment = {
//    "intent": "sale",
//    "payer": {
//        "payment_method": "credit_card",
//        "funding_instruments": [{
//            "credit_card": {
//                "type": "amex",
//                "number": "343772124361734",
//                "expire_month": "02",
//                "expire_year": "2019",
//                "cvv2": "1234",
//                "first_name": "Angel",
//                "last_name": "Ramirez",
//                "billing_address": {
//                    "line1": "52 N Main ST",
//                    "city": "Johnstown",
//                    "state": "OH",
//                    "postal_code": "43210",
//                    "country_code": "US"
//                }
//            }
//        }],
//    },
//    "transactions": [{
//        "amount": {
//            "total": "10",
//            "currency": "USD",
//            "details": {
//                "subtotal": "10",
//                "tax": "0",
//                "shipping": "0"
//            }
//        },
//        "description": "adding some credits."
//    }]
//};
//
//paypal_sdk.payment.create(payment, function(error, credit_card){
//    if (error) {
//        console.log(JSON.stringify(error));
//        throw error;
//    } else {
//        console.log("Create Credit-Card Response");
//        console.log(credit_card);
//    }
//});

// twilio.makeCall({
//     to:'+7863612104', // Any number Twilio can call
//     from: '+18052836298', // A number you bought from Twilio and can use for outbound communication
//     url: 'http://www.example.com/twiml.php' // A URL that produces an XML document (TwiML) which contains instructions for the call

// }, function(err, responseData) {
//     //executed when the call has been initiated.
//     console.log(responseData); // outputs "+14506667788"
// });

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

primus.on('connection', function(socket) {
    socket.on('data', function (msg) {
        console.log('Msg received: ', msg);

        if (msg === 'ping') {
            socket.write({ reply: 'pong' });
        }

    });
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = function (primus) {
    primus.on('connection', function(socket) {
        socket.on('data', function (msg) {
            console.log('Msg received: ', msg);

            if (msg === 'ping') {
                socket.write({ reply: 'pong' });
            }

        });
    });
};

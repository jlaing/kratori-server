var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Configure the socket.io connection settings.
//See http://socket.io/
// TODO , figure out what this is, configure is not a function error
/*
io.configure(function (){
  io.set('log level', 0);
  io.set('authorization', function (handshakeData, callback) {
    callback(null, true); // error first callback style
    console.log("authorization");
  });
  console.log("socket config");
});
*/


io.on('connection', function(socket){
  console.log('a user connected');

  socket.emit('onlog', { log: "Ready for message test." } );
  var lagTestTime = new Date().getTime();
  socket.emit('onping')

  socket.on('message', function(m) {
    if (m.log !== undefined) {
      console.log("received log message:");
      console.log(m.log);
    }
    if (m.type !== undefined) {
      switch (m.type) {
        case 'pong':
          console.log('time diff: ' + ((new Date().getTime()) - lagTestTime));
          break;
      }
    }
  });
});

http.listen(4000, function(){
  console.log('listening on *:4000');
});

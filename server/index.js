var port = 3001;
var io = require('socket.io')(port);

var calculateDiversity = require('./actions/calculateDiversity');

io.on('connection', (socket) => {
  // when the client emits 'handshake', this listens and executes
  socket.on('calculate', (data) => {
    calculateDiversity(data);
    socket.emit('display_results', 'you got it dude!');
  });
});

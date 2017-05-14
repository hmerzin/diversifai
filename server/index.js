var port = 3001;
var io = require('socket.io')(port);

var calculateDiversity = require('./actions/calculateDiversity').bind(this);

io.on('connection', (socket) => {
  // when the client emits 'handshake', this listens and executes
  socket.on('calculate', (data) => {
    const diversityNum = calculateDiversity(data);
    socket.emit('recieve_results', diversityNum);
  });
});

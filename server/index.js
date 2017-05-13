var port = 3001;
var io = require('socket.io')(port);
const phantomjs = require('./phantom');

io.on('connection', (socket) => {
  // when the client emits 'handshake', this listens and executes
  console.log('whoa');
  socket.on('handshake', function (data) {
    // we tell the client to execute 'handshake'
    console.log(data);
    socket.emit('handshake', {
      message: data
    });
  });

});

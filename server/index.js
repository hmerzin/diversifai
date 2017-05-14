var port = 3001;
var io = require('socket.io')(port);
const phantomjs = require('./phantom');

var calculateDiversity = require('./actions/calculateDiversity').bind(this);

io.on('connection', (socket) => {
    // when the client emits 'handshake', this listens and executes
    // console.log('whoa');
    socket.on('handshake', function (data) {
      phantomjs();
      // we tell the client to execute 'handshake'
      console.log(data);
      socket.emit('handshake', {
        message: data
      });
    socket.on('calculate', (data) => {
      calculateDiversity(data);
    });
  });
})

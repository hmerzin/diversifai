var port = 3001;
var io = require('socket.io')(port);
const phantomjs = require('./phantom');

var calculateDiversity = require('./actions/calculateDiversity').bind(this);

io.on('connection', (socket) => {
<<<<<<< HEAD
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
=======
  socket.on('calculate', (data) => {
    const diversityNum = calculateDiversity(data);
    socket.emit('recieve_results', diversityNum);
>>>>>>> be6f165efdb91ccce0d2846a37bf1acf1fd0aa05
  });
})

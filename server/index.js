var port = 3001;
var io = require('socket.io')(port);
const phantomjs = require('./phantom');

var calculateDiversity = require('./actions/calculateDiversity').bind(this);

io.on('connection', (socket) => {
  socket.on('calculate', (data) => {
    const diversityNum = calculateDiversity(data);
    socket.emit('recieve_results', diversityNum);
  });
})

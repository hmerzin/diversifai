var port = 3001;
var io = require('socket.io')(port);
const phantomjs = require('./phantom');
const http = require('http');
const fs = require('fs');

var calculateDiversity = require('./actions/calculateDiversity').bind(this);

io.on('connection', (socket) => {
  socket.on('calculate', (data) => {
    const diversityNum = calculateDiversity(data);
    socket.emit('recieve_results', diversityNum);
  });
})

const app = http.createServer((req, res) => {
  //console.log(req.url);
  const extension = req.url.split('.')[req.url.split('.').length - 1];
  if(req.url === '/') {
    console.log('/');
    fs.readFile('../build/index.html', 'utf-8', (err, data) => {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('X-Foo', 'bar');
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  } else {
    
    console.log(extension);
    const file = fs.readFile('../build' + req.url, 'utf-8', (err, data) => {
      if (extension === 'css') {
        res.setHeader('Content-Type', 'Styleheet');
        res.writeHead(200, {'Content-Type': 'Stylesheet'});
        console.log(data);
        res.end(data);
      }

      if(extension === 'js') {
        res.setHeader('Content-Type', 'text/javascript');
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        console.log(data);
        res.end(data);
      }
    });
  }
    
});

app.listen(3002);
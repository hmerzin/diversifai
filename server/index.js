var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/api', function (req, res) {
  var link = req.param('url');
  res.send({
    link
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var port = 3001;
var io = require('socket.io')(port);
const phantomjs = require('./phantom');
const PubNub = require('pubnub');
var clparse = require('./actions/clparser');
const http = require('http');
const fs = require('fs');

var calculateDiversity = require('./actions/pub_nub.js').bind(this);

const CLARIFAI_CHANNEL = 'clarifai-channel'


  // when the client emits 'handshake', this listens and executes
  // console.log('whoa');

  var pubnub = new PubNub({
    subscribeKey: "sub-c-7e59642c-3812-11e7-9361-0619f8945a4f",
    publishKey: "pub-c-9ce3df27-20bb-4cd5-bc44-9c68a2e945b9",
    secretKey: "sec-c-NmMwYmRmMWYtYmJkZC00ZDI0LTg1ZTMtN2FiZTI4YmRlMDdm"
  });

  pubnub.addListener({

    message: function(m) {

      // ethnicity counter
      var ethnicity_counter = {
        'white': 0,
        'black or african american': 0,
        'american indian or alaska native': 0,
        'native hawaiian or pacific islander': 0,
        'middle eastern or north african': 0,
        'asian': 0,
        'hispanic, latino, or spanish origin': 0,
        'other': 0
      };

      // handle message
      var channelName = m.channel; // The channel for which the message belongs
      var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
      var pubTT = m.timetoken; // Publish timetoken
      var msg = m.message; // The Payload

      var parsed_demographic_data = clparse(m.message);
      console.log(parsed_demographic_data);

      // increment demographic data
      ethnicity = parsed_demographic_data[0] // ethnicity
      // for (var key in ethnicity_counter) {
      //   console.log("counter", ethnicity_counter[key]);
      //   ethnicity_counter[key] = ethnicity_counter[key] + 1;
      // }
      // parsed_demographic_data[1] // gender
      // parsed_demographic_data[2] // age
      // console.log(ethnicity);
    },
    presence: function(p) {
      // handle presence
      var action = p.action; // Can be join, leave, state-change or timeout
      var channelName = p.channel; // The channel for which the message belongs
      var occupancy = p.occupancy; // No. of users connected with the channel
      var state = p.state; // User State
      var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
      var publishTime = p.timestamp; // Publish timetoken
      var timetoken = p.timetoken; // Current timetoken
      var uuid = p.uuid; // UUIDs of users who are connected with the channel
    },
    status: function(s) {
      // handle status
      // console.log(s);
    }
  });

  pubnub.subscribe({
    channels: [CLARIFAI_CHANNEL],
    withPresence: true
  });











  io.on('connection', (socket) => {

  socket.on('handshake', function(data) {
    phantomjs();
    // we tell the client to execute 'handshake'
    console.log(data);
    socket.emit('handshake', {
      message: data
    });
    socket.on('calculate', (data) => {
      calculateDiversity(data, pubnub);
    });
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

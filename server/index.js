var port = 3001;
var io = require('socket.io')(port);
const phantomjs = require('./phantom');
const PubNub = require('pubnub');
var clparse = require('./actions/clparser');
const http = require('http');
const fs = require('fs');
const pn = require('./actions/pub_nub.js');

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

      // gender counter
      var gender_counter = {
        'feminine': 0,
        'masculine': 0
      };

      // age counter
      var age_counter = {
        '0-4': 0,
        '5-9': 0,
        '10-14': 0,
        '15-19': 0,
        '20-24': 0,
        '25-29': 0,
        '30-34': 0,
        '35-39': 0,
        '40-44': 0,
        '45-49': 0,
        '50-54': 0,
        '55-59': 0,
        '60-64': 0,
        '65-69': 0,
        '70-74': 0,
        '75-79': 0,
        '80+': 0
      };

      // handle message
      var channelName = m.channel; // The channel for which the message belongs
      var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
      var pubTT = m.timetoken; // Publish timetoken
      var msg = m.message; // The Payload

      var parsed_demographic_data = clparse(m.message);

      // increment demographic data
      ethnicity = parsed_demographic_data[0] // ethnicity
      for (var key in ethnicity_counter) {
        ethnicity_counter[key] = ethnicity_counter[key] + ethnicity[key];
      }
      //console.log(ethnicity_counter);

      gender = parsed_demographic_data[1] // gender
      for (var key in gender_counter) {
        gender_counter[key] = gender_counter[key] + gender[key];
      }
      //console.log(gender_counter);

      age = parsed_demographic_data[2] // age
      for (var key in age_counter) {
        age_counter[key] = age_counter[key] + age[key];
      }
      //console.log(age_counter);

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
  socket.on('calculate', (url) => {
    const images = new Promise((resolve, reject) => {
      phantomjs(url).then(images => {
        images.forEach(image => {
          pn(image, pubnub, (data) => {console.log(data);});//{socket.emit('recieve_results', data.filter((val, index) => {if(index < 5) return true}));});
        });
        console.log(images.length);
      });
  });




    
  });
});
















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

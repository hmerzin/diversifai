
const PubNub = require('pubnub');

const CLARIFAI_CHANNEL = 'clarifai-channel'

const phantomjs = require('phantom');

module.exports = function (data) {

  console.log(data);

  console.log(phantomjs);

  // send one image at a time to pubnub and get clarif.ai response
  // run calculation algorithm

  var pubnub = new PubNub({
    subscribeKey: "sub-c-7e59642c-3812-11e7-9361-0619f8945a4f",
    publishKey: "pub-c-9ce3df27-20bb-4cd5-bc44-9c68a2e945b9",
    secretKey: "sec-c-NmMwYmRmMWYtYmJkZC00ZDI0LTg1ZTMtN2FiZTI4YmRlMDdm"
  });

  pubnub.addListener({

    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload

        console.log(m.message.outputs);
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
    },
    status: function(s) {
        // handle status
        console.log(s);
    }
  });

  // var images = phantomjs('https://www.bestbuy.com');
  pubnub.publish(
    {
      message: {
          url: 'https://www.thewrap.com/wp-content/uploads/2015/11/Donald-Trump.jpg'
      },
      channel: CLARIFAI_CHANNEL
    },
    function (status, response) {
        // handle status, response
        console.log(status, response);
    }
  );

  pubnub.subscribe({
    channels: [CLARIFAI_CHANNEL],
    withPresence: true
  });
}

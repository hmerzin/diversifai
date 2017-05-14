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

const CLARIFAI_CHANNEL = 'clarifai-channel'

const phantomjs = require('phantom');

module.exports = function(data, pubnub) {

  console.log(data);

  // console.log(phantomjs);

  // send one image at a time to pubnub and get clarif.ai response
  // run calculation algorithm

  pubnub.publish({
      message: {
        url: 'https://img.scoop.it/gQindO5YfQ6IBrXnofyKIDl72eJkfbmt4t8yenImKBVvK0kTmF0xjctABnaLJIm9'
      },
      channel: CLARIFAI_CHANNEL
    },
    function(status, response) {
      // handle status, response
      // console.log(status, response);
    }
  );

  // pubnub.subscribe({
  //   channels: [CLARIFAI_CHANNEL],
  //   withPresence: true
  // });
}

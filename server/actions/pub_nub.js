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

const CLARIFAI_CHANNEL = 'clarifai-channel'

module.exports = function(data, pubnub, done) {

  //console.log(data);

  // console.log(phantomjs);

  // send one image at a time to pubnub and get clarif.ai response
  // run calculation algorithm

  pubnub.publish({
      message: {
        url: data
      },
      channel: CLARIFAI_CHANNEL
    },
    function(status, response) {
      done(response);
      // handle status, response
      // console.log(status, response);
    }
  );

  // pubnub.subscribe({
  //   channels: [CLARIFAI_CHANNEL],
  //   withPresence: true
  // });
}

// json for testing
// var cl_json = require('./sample_output.json');

// ethnicity counter
var ethnicity_counter = {'white': 0, 'black or african american' : 0, 'american indian or alaska native' : 0,
            'native hawaiian or pacific islander' : 0, 'middle eastern or north african' : 0,
            'asian' : 0, 'hispanic, latino, or spanish origin' : 0, 'other' : 0};

// gender counter
var gender_counter = {'feminine' : 0, 'masculine' : 0};

// age counter
var age_counter = {'0-4' : 0, '5-9' : 0, '10-14' : 0, '15-19' : 0, '20-24' : 0, '25-29' : 0, '30-34' : 0,
               '35-39' : 0, '40-44' : 0, '45-49' : 0, '50-54' : 0, '55-59' : 0, '60-64' : 0,
               '65-69' : 0, '70-74' : 0, '75-79' : 0, '80+' : 0};

function clparse(cl_json) {
  var regions = cl_json.outputs[0].data.regions;
  for (i = 0; i < regions.length; i++) {
    var face = regions[i].data.face;

    // populate ethnicity
    var ethnicity = face.multicultural_appearance.concepts[0];
    if (ethnicity.value < 0.3) {
      ethnicity_counter.other = ethnicity_counter.other++;
    } else {
      ethnicity_counter[ethnicity.name] = ethnicity_counter[ethnicity.name] + 1;
    }

    // populate gender
    var gender = face.gender_appearance.concepts[0];
    gender_counter[gender.name] = gender_counter[gender.name] + 1;

    // populate age
    var age = face.age_appearance.concepts[0].name;
    var age_range = get_age_range(parseInt(age));
    age_counter[age_range] = age_counter[age_range] + 1;
  }

  var parsed_output = [];
  parsed_output.push(ethnicity_counter);
  parsed_output.push(gender_counter);
  parsed_output.push(age_counter);
  //console.log(parsed_output);
  return parsed_output;
}

function get_age_range(age) {
  if (age >= 0 && age <= 4) {
    return '0-4';
  } else if (age >= 5 && age <= 9){
    return '5-9';
  } else if (age >= 10 && age <= 14){
    return '10-14';
  } else if (age >= 15 && age <= 19) {
    return '15-19';
  } else if (age >= 20 && age <= 24) {
    return '20-24';
  } else if (age >= 25 && age <= 29) {
    return '25-29';
  } else if (age >= 30 && age <= 34) {
    return '30-34';
  } else if (age >= 35 && age <= 39) {
    return '35-39';
  } else if (age >= 40 && age <= 44) {
    return '40-44';
  } else if (age >= 45 && age <= 49) {
    return '45-49';
  } else if (age >= 50 && age <= 54) {
    return '50-54';
  } else if (age >= 55 && age <= 59) {
    return '55-59';
  } else if  (age >= 60 && age <= 64) {
    return '60-64';
  } else if (age >= 65 && age <= 69) {
    return '65-69';
  } else if (age >= 70 && age <= 74) {
    return '70-74';
  } else if (age >= 75 && age <= 79) {
    return '75-79';
  } else if (age >= 80) {
    return '80+';
  }
}

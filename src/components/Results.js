import React, { Component } from 'react';
import constants from '../../constants/demographic.js';
import Bar from './Bar';
var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
var rd3 = require('react-d3');
var PieChart = rd3.PieChart;

var agemap = {
  "0-4": "baby",
  "80+": "old",
  "30-34": "mature",
  "35-39": "mature",
  "25-29": "mature",
  "10-14": "child",
  "40-44": "mature",
  "5-9": "child",
  "50-54": "old",
  "55-59": "old",
  "70-74": "old",
  "75-79": "old",
  "65-69": "old",
  "15-19": "child",
  "60-64": "old",
  "20-24": "young",
  "45-49": "mature"
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default class Results extends Component {
    constructor(props) {
      super();

      this.state = props;
      console.log('state: ' + JSON.stringify(props));

      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateValue = this.updateValue.bind(this);
    }

    handleSubmit (event) {
      event.preventDefault();
      if (this.props.onSubmit && this.state.url) {
        this.props.onSubmit(this.state.url);
      }
    }

    validateValueOnChange(value) {
      return urlRegex.test(value);
    }

    style = {
      form: {
        display: 'flex',
        justifyContent: 'center',
      },
      resultsWrapper: {
        display: 'flex',
        justifyContent: 'center',
      }
    }

    updateValue(event) {
      if (this.validateValueOnChange(event.target.value)) {
        this.setState({
          url: event.target.value
        })
      } else {
        this.setState({
          url: false
        })
      }
    }

    styles = {
      resultsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1
      },
      rowWrapper: {
        display: 'block',
        float: 'left',
        width: '33%',
        justifyContent: 'center',
      },
      emoji: {
        display: 'inline-block',
        fontSize: '2rem'
      }
    }

    renderEthnicity () {
      let quantity;
      let us;

      function getEmoji(data, i) {
        var ethnicityConstantData = constants.ethnicities.filter((item) => { console.log(item.title, data); return item.title === data })[0]
        console.log(ethnicityConstantData);
        return (
          <div key={data+i} style={this.styles.emoji}>
            {ethnicityConstantData.emojis[Math.floor(Math.random() * ethnicityConstantData.emojis.length  )] + ethnicityConstantData.tone[Math.floor(Math.random() * ethnicityConstantData.tone.length  )]}
          </div>
        )
      }

        console.log(this.props.data.data.data);

      const emojiData = shuffle([].concat.apply([], Object.keys(this.props.data.data.data).map((ethnicity) => {
        quantity = this.props.data.data.data[ethnicity];
        console.log(ethnicity, quantity);
        if (quantity) {
          us = new Array(quantity);
          for (var i = 0; i < us.length; i++) {
            us[i] = ethnicity;
          }
          return us;
        }
      }).filter(function(a) { return a; })));

      return (
        <div style={{textAlign: 'center', padding: '1rem'}}>
          <h4>Ethnic Diversity</h4>
          <Bar ratingColor='green' rating={0.80} />
          {emojiData.map(getEmoji.bind(this))}
        </div>
      )
    }

    renderAge () {
      let quantity;
      let us;

      function getEmoji(data, i) {
        var ageConstantData = constants.ages.filter((item) => { return item.title === agemap[data] })[0]
        return (
          <div key={data+i} style={this.styles.emoji}>
            {ageConstantData.emojis[Math.floor(Math.random() * ageConstantData.emojis.length  )]}
          </div>
        )
      }

      const ageData = shuffle([].concat.apply([], Object.keys(this.props.data.data.age).map((age) => {
        quantity = this.props.data.data.age[age];
        if (quantity) {
          us = new Array(quantity);
          for (var i = 0; i < us.length; i++) {
            us[i] = age;
          }
          return us;
        }
      }).filter(function(a) { return a; })));

      return (
        <div style={{textAlign: 'center', padding: '1rem'}}>
          <h4>Age Diversity</h4>
          <Bar ratingColor='red' rating={0.30} />
        {ageData.map(getEmoji.bind(this))}
        </div>
      )
    }

    renderGender () {
      let quantity;
      let us;

      function getEmoji(data, i) {
        var genderConstantData = constants.gender.filter((item) => { return item.title === data })[0]
        return (
          <div key={data+i} style={this.styles.emoji}>
            {genderConstantData.emojis[Math.floor(Math.random() * genderConstantData.emojis.length  )]}
          </div>
        )
      }

      const genderData = shuffle([].concat.apply([], Object.keys(this.props.data.data.gender).map((gender) => {
        quantity = this.props.data.data.gender[gender];
        if (quantity) {
          us = new Array(quantity);
          for (var i = 0; i < us.length; i++) {
            us[i] = gender;
          }
          return us;
        }
      }).filter(function(a) { return a; })));

      return (
        <div style={{textAlign: 'center', padding: '1rem'}}>
          <h4>Gender Diversity</h4>
          <Bar style={{display: 'inline-block'}} ratingColor='yellow' rating={0.44} />
          {genderData.map(getEmoji.bind(this))}
        </div>
      )
    }

    renderGraph() {
      console.log('graph state: ' + this.state);
     
      var pieData = [];

      Object.keys(this.state.data.data.age).forEach((elem) => {
        // [elem] is the value 
        // label is the key
        if (this.state.data.data.age[elem] !== 0){
          pieData.push(
            {label: elem, value: this.state.data.data.age[elem]}
          )
          console.log('pieData: ' + pieData);
        }
      })

      return (
        <PieChart
          data={pieData}
          width={400}
          height={400}
          radius={100}
          innerRadius={20}
          title="Diversity, yo."/>
      )
    }

    render() {
        return (
          <div style={this.styles.resultsWrapper}>
            <div style={Object.assign({}, this.styles.rowWrapper, this.styles.ethnicityWrapper)}>
              
              {this.renderEthnicity()}
            </div>
            <div style={Object.assign({}, this.styles.rowWrapper, this.styles.ageWrapper)}>
              {this.renderAge()}
            </div>
            <div style={Object.assign({}, this.styles.rowWrapper, this.styles.genderWrapper)}>
              {this.renderGender()}
            </div>

              {this.renderGraph()}

          </div>
        )
    }
}

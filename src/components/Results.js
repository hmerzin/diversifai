import React, { Component } from 'react';

var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;

export default class Results extends Component {
    constructor(props) {
      super();

      this.state = {
        url: false
      }

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
        flex: 1,
      },
      ethnicityWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
      },
      ageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
      },
      genderWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
      }
    }

    render() {
        return (
          <div style={this.styles.resultsWrapper}>
            <div style={this.styles.ethnicityWrapper}>

            </div>
            <div style={this.styles.ageWrapper}>

            </div>
            <div style={this.styles.genderWrapper}>

            </div>
          </div>
        )
    }
}

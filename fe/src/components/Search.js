import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;

export default class Search extends Component {
    constructor(props) {
      super();

      this.state = {
        url: false,
        error: false
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateValue = this.updateValue.bind(this);
    }

    handleSubmit (event) {
      event.preventDefault();
      if (this.props.onSubmit && this.state.url) {
        console.log('submitted');
        this.props.onSubmit(this.state.url);
      }
    }

    validateValueOnChange(value) {
      return urlRegex.test(value) || value === '';
    }

    style = {
      form: {
        display: 'flex',
        justifyContent: 'center',
      },
      inputWrapper: {
        display: 'flex',
        justifyContent: 'center',
      }
    }

    updateValue(event) {
      if (this.validateValueOnChange(event.target.value)) {
        this.setState({
          error: false,
          url: event.target.value
        })
      } else {
        this.setState({
          error: true,
          url: false
        })
      }
    }

    calcWidth() {
      return document.body.clientWidth * 0.66
    }

    render() {
        return (
          <div>
            <form style={this.style.form} onSubmit={this.handleSubmit}>
              <TextField style={{width: this.calcWidth(), margin: 50}} floatingLabelText="Enter a URL" onChange={this.updateValue} errorText={this.state.error ? "😑 Enter a valid URL " : null} />
              <FlatButton style={{marginTop: 80, marginLeft: 15}} label="Diversify" type="submit" primary={true} />
            </form>
          </div>
        )
    }
}

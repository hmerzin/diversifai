import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;

export default class Search extends Component {
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
        display: 'flex',
        justifyContent: 'center',
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

    render() {
        return (
            <form style={this.style} onSubmit={this.handleSubmit}>
              <TextField floatingLabelText="Floating Label Text" onChange={this.updateValue} />
              <FlatButton style={{marginTop: 30, marginLeft: 15}} label="Submit" type="submit" primary={true} />
            </form>
        )
    }
}

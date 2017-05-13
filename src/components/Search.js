import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class Search extends Component {
    constructor(props) {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
      event.preventDefault();
      if (this.props.onSubmit) {
        this.props.onSubmit();
      }
    }

    style = {
        display: 'flex',
        justifyContent: 'center',
    }

    render() {
        return (
            <form style={this.style} onSubmit={this.handleSubmit}>
            <TextField floatingLabelText="Floating Label Text" />
              <FlatButton style={{marginTop: 30, marginLeft: 15}} label="Submit" type="submit" primary={true} />
            </form>
        )
    }
}

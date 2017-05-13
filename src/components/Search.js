import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

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

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
              <TextField floatingLabelText="Floating Label Text" />
              <input type="submit" />
            </form>
        )
    }
}

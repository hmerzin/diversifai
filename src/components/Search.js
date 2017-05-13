import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class Search extends Component {
    constructor(props) {
        super();
    }

    style = {
        display: 'flex',
        justifyContent: 'center',

    }

    render() {
        return (

            <div style={this.style}>
                <TextField floatingLabelText="Floating Label Text" /> 
                <FlatButton style={{marginTop: 30, marginLeft: 15}} label="Submit" primary={true} />
            </div>
                       
        )
    }
}
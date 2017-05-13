import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class Search extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <TextField floatingLabelText="Floating Label Text" />
        )
    }
}

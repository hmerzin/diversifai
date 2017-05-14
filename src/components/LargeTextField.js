import React, {Component} from 'react';

export default class LargeTextField extends Component {

    getError() {
        return this.props.error ? 'red' : null;
    }

    calcWidth() {
        return parseInt(document.width * 0.75);
    }

    style = {
        width: this.calcWidth(),
        height: 100,
        fontSize: 50,
        letterSpacing: 5,
        borderColor: this.getError()
        
    }

    render() {
        return <input style={this.style} onChange={this.props.onChange} />
    }

}
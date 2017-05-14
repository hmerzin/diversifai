import React, {Component} from 'react';
import './Bar.css';

export default class Bar extends Component {


    wrapperStyle = {
        borderColor: '#CFD8DC',
        border: 'solid LightGrey',
        borderOpacity: .25,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        width: document.body.clientWidth * .2,
        height: 20,
        borderWidth: 1,
    }

    render() {
        return (
            <div className="barWrapper" style={this.wrapperStyle}>
                <div style={{width: .2 * document.body.clientWidth * this.props.rating}} className={this.props.ratingColor} />

                <div style={{width: .2 * document.body.clientWidth * (1 - this.props.rating)}} />
            </div>
        )
    }
}
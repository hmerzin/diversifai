import React, {Component} from 'react';
import './Bar.css';

export default class Bar extends Component {


    getColor() {
        if (this.props.rating > 0 && this.props.rating<= 0.30) {
            return 'red';
        }
        else if (this.props.rating > 0.30 && this.props.rating <= 0.60) {
            return 'yellow';
        }
        else if (this.props.rating > 0.60 && this.props.rating <= 1.00) {
            return 'green';
        }
    }

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
        margin: 20
    }

    render() {
        return (
            <div className="barWrapper" style={this.wrapperStyle}>
                <div style={{width: .2 * document.body.clientWidth * this.props.rating}} className={this.getColor()} />

                <div style={{width: .2 * document.body.clientWidth * (1 - this.props.rating)}} />
            </div>
        )
    }
}
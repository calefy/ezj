import React from 'react';

let timer;

class Snackbar extends React.Component{
    static defaultProps = {
        time: 5000,
    };

    state = {
        text: '',
    };

    show = (msg) => {
        this.setState({text: msg});
        clearTimeout(timer);
        timer = setTimeout((() => {
           this.setState({text: null});
        }).bind(this), this.props.time);
    };


    render() {
        if (!this.state.text) return null;

        return <div className="snackbar">{this.state.text}</div>
    }
}

module.exports = Snackbar;

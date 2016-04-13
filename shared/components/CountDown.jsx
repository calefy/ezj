/**
 * 倒计时
 */
import React from 'react';

let CountDown = React.createClass({
    propTypes: {
        onFinished: React.PropTypes.func.isRequired,
        number: React.PropTypes.number
    },
    getInitialState: function() {
        return { number: (this.props.number || 60) + 1 };
    },

    componentDidMount: function() {
        this.count();
    },
    componentWillUnmount: function() {
        clearTimeout(this.timer);
    },

    count: function() {
        if (this.state.number <= 0) {
            this.props.onFinished();
            return;
        }
        this.setState({ number: this.state.number - 1 });
        this.timer = setTimeout(this.count, 1000);
    },

    render: function() {
        return <span>{this.state.number}</span>;
    }
});

module.exports = CountDown;


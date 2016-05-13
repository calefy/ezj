import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

if (process.env.BROWSER) {
    require('css/notFound.css')
}

class Error extends Component {

    onBack = e => {
        e.preventDefault();
        this.props.history.goBack();
    };

    render() {
        return (
            <div className="content not-found">
                <div className="container cl">
                    <p>很抱歉，系统繁忙...</p>
                    <Link to="/">返回首页</Link>
                    <Link to="/" onClick={this.onBack}>返回上一页</Link>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({}) )(Error);


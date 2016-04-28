import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

if (process.env.BROWSER) {
    require('css/notFound.css')
}

class NotFound extends Component {

    onBack = e => {
        e.preventDefault();
        this.props.history.goBack();
    };

    render() {
        return (
            <div className="content not-found">
                <div className="container cl">
                    <p>很抱歉，您访问的页面已经断开...</p>
                    <Link to="/">返回首页</Link>
                    <Link to="/" onClick={this.onBack}>返回上一页</Link>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({}) )(NotFound);


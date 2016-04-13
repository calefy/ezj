import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
    require('css/pwd.css')
}

class ResetPwd extends Component {

    render() {
        return (
            <div className="container mar40 bg-white">
                <h1 className="h1-title">找回密码</h1>
                {this.props.children}
            </div>
        );
    }
}

module.exports = ResetPwd;

import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class ResetPwd extends Component {

    render() {
        return (
            <div className="container mar40 bg-white">
                <h1 className="h1-title">找回密码</h1>
                <div className="bg-white pwd">
                    <div className="stepflex">
                        <dl className="first doing">
                            <dt className="s-num">1</dt>
                            <dd className="s-text">输入账号</dd>
                        </dl>
                        <dl className="normal">
                            <dt className="s-num">2</dt>
                            <dd className="s-text">验证账号</dd>
                        </dl>
                        <dl className="normal last">
                            <dt className="s-num">3</dt>
                            <dd className="s-text">设置密码</dd>
                        </dl>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

module.exports = ResetPwd;
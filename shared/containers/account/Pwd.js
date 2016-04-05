import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Account extends Component {

    render() {
        return (
            <div className="account-pwd">
                <dl>
                    <dt>用户名：</dt>
                    <dd>xmn</dd>
                </dl>
                <dl>
                    <dt>当前密码：</dt>
                    <dd className="formsy-input">
                        <input type="password" ref="pass" name="pass" value="" />
                    </dd>
                </dl>
                <dl>
                    <dt>新密码：</dt>
                    <dd className="formsy-input">
                        <input type="password" ref="newpass" name="pass" value="" />
                    </dd>
                    <dd>
                        <div className="password-strength">
                            <div className="password-strength-text" aria-live="assertive"></div>
                            <div className="password-strength-title">密码强度：</div>
                            <div className="password-indicator">
                                <div id="indicator" className=""></div>
                            </div>
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt>确认密码：</dt>
                    <dd className="formsy-input">
                        <input type="password" ref="repass" name="pass" value="" />
                    </dd>
                </dl>
                <dl>
                    <dt>&nbsp;</dt>
                    <dd>
                        <button className="btn" ref="submit">保存</button>
                    </dd>
                </dl>
            </div>
        );
    }
}

module.exports = Account;
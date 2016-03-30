import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
    require('css/account.css')
}

class Account extends Component {

    render() {
        return (
            <div className="account-info">
            	<dl>
                    <dt>昵称：</dt>
                    <dd>紫荆教育用户</dd>
                </dl>
                <dl>
                    <dt>注册邮箱：</dt>
                    <dd>testing@ezijing.com</dd>
                </dl>
                <dl>
                    <dt>手机号码：</dt>
                    <dd>暂无</dd>
                </dl>
                <dl>
                    <dt>用户名：</dt>
                    <dd>testing_01</dd>
                </dl>
                <dl>
                    <dt>性别：</dt>
                    <dd>男</dd>
                </dl>
                <dl>
                    <dt>出生日期：</dt>
                    <dd>1900-01-01</dd>
                </dl>
                <dl>
                    <dt>所在地区：</dt>
                    <dd>北京</dd>
                </dl>
                <Link to="user">修改我的资料></Link>
            </div>
        );
    }
}

module.exports = Account;
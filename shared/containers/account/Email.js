import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Account extends Component {

    render() {
        return (
            <div className="account-email">
            	<dl>
                    <dt>当前邮箱：</dt>
                    <dd>esting@ezijing.com</dd>
                </dl>
                <dl>
                    <dt>更改邮箱：</dt>
                    <dd className="formsy-input">
                        <input type="text" name="" value="" placeholder="请输入新邮箱" />
                    </dd>
                    <dd>
                    	<em className="text-success">验证码已发送</em>
                    </dd>
                </dl>
                <dl>
                    <dt>&nbsp;</dt>
                    <dd>
                        <button className="btn btn-send-code" name="" value="发送验证码" type="submit">发送验证码</button>
                    </dd>
                </dl>
                <br />
                <dl>
                    <dt>验证：</dt>
                    <dd className="formsy-input input-error">
                        <input type="text" name="" value="" placeholder="4位验证码" />
                    </dd>
                    <dd>
                    	<em className="text-error">验证码错误</em>
                    </dd>
                </dl>
                <dl>
                    <dt>密码：</dt>
                    <dd className="formsy-input">
                        <input type="text" name="" value="" placeholder="请输入登录密码" />
                    </dd>
                    <dd>
                    	<em className="text-success"></em>
                    </dd>
                </dl>
                <button className="btn" name="" value="确认修改" type="submit">确认修改</button>
            </div>
        );
    }
}

module.exports = Account;
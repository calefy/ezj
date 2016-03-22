import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import LoginDialog from './LoginDialog.jsx';
import FormsyText from './formsy/FormsyText.jsx';

module.exports = class RegDialog extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        error: PropTypes.object // 返回的错误信息
    };

    state = {
        regOpen: false,
        modified: false, // 当登录失败后，标记第一次修改
        errorUsername: null,
        errorPassword: null
    };

    regOpen = () => {
        this._setState({ regOpen: true });
    };

    enableButton = () => {
        this.setState({
          canSubmit: true,
          bgColor: '#a22645'
        });
    };

    disableButton = () => {
        this.setState({
          canSubmit: false,
          bgColor: 'rgb(229,229,229)'
        });
    };

    onEnter = () => {
        // 检查输入
        if (this._validUsername() && this._validPassword()) {
            this.props.onSubmit({
                username: this.refs.username.getValue().trim(),
                password: this.refs.password.getValue(),
                remember: this.refs.remember.isChecked() ? 1 : 0
            });
            this._setState({ modified: false }); // 登录请求发出后，重置modified
        }
    };
    close = () => {
        this._setState({ regOpen: false });
    };

    _modify = () => {
        return !!this.props.error;
    };
    _validUsername = () => {
        const val = this.refs.username.getValue().trim();
        this._setState({ errorUsername: val ? null : '请输入邮箱或ID', modified: this._modify() });

        return !!val;
    };
    _validPassword = () => {
        const val = this.refs.password.getValue();
        this._setState({ errorPassword: val ?  null : '请输入密码', modified: this._modify() });

        return !!val;
    };

    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    render() {


        return (
            <div className={ this.state.regOpen ? "show" : "hide" }>
                <div className="pop register-pop">
                    <i className="iconfont icon-close"></i>
                    <div className="pop-content">
                        <div className="pop-logo">
                            紫荆教育
                        </div>
                        <Formsy.Form onSubmit={this.props.onEnter} onValid={this.enableButton} onInvalid={this.disableButton} className="pop-text">
                            <FormsyText 
                                name="name" 
                                title={
                                    <div>
                                        <i className="iconfont icon-username"></i>手机号/邮箱
                                        <em className="fr text-error">该账号未验证</em>
                                        <em className="fr text-success">可注册</em>
                                    </div>
                                }
                                type="text"
                                required />
                            <FormsyText 
                                name="validate" 
                                title={
                                    <div>
                                        <i className="iconfont icon-yz"></i>验证码
                                        <em className="fr text-error">验证码错误</em>
                                        <em className="fr text-success">验证短信已发到您的手机</em>
                                    </div>
                                } 
                                type="text" 
                                required />
                            <FormsyText 
                                name="validate" 
                                title={
                                    <div>
                                        <i className="iconfont icon-name"></i>昵称
                                        <em className="fr text-error">用户名为1-16个字符</em>
                                    </div>
                                } 
                                type="text" 
                                required />
                            <FormsyText 
                                name="validate" 
                                title={
                                    <div>
                                        <i className="iconfont icon-pass"></i>密码
                                        <em className="fr text-error">密码格式错误</em>
                                    </div>
                                } 
                                type="text" 
                                required />
                            <dl className="formsy-list cl">
                                <dt className="fl"><input type="radio" />表示同意<Link to="">隐私政策</Link></dt>
                            </dl>
                            <div className="pop-btn">
                              <button type="submit" disabled={!this.state.canSubmit} 
                                    className={ this.state.canSubmit ? "" : "disabled"}>注册</button>
                            </div>
                            <div className="pop-other cl">
                                <span className="fl">已有账号？<button onClick={this.openLoginDialog}>请登录</button></span>
                            </div>
                        </Formsy.Form>
                    </div>
                </div>
                <div className="screen-bg"></div>
                <LoginDialog
                    ref="loginDialog"
                />
            </div>
        );
    }
};

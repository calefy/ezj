import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import FormsyText from './formsy/FormsyText.jsx';
import FormsyRadio from './formsy/FormsyRadio.jsx';

module.exports = class LoginDialog extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        error: PropTypes.object // 返回的错误信息
    };

    state = {
        open: false,
        logOpen: false,
        regOpen: false,
        errorUsername: null,
        errorPassword: null
    };

    /**
     * 处理注册框与登录框显示与否
     */
    openLogDialog = () => {
        this.refs.loginDialog.logOpen();
    };

    open = () => {
        this._setState({ open: true, logOpen: true, regOpen: false });
    };

    logOpen = () => {
        this._setState({ logOpen: true, regOpen: false });
    };

    regOpen = () => {
        this._setState({ regOpen: true, logOpen: false });
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
        this.props.onSubmit({
            name: this.refs.username.getValue().trim(),
            pass: this.refs.password.getValue()
        });
    };

    close = () => {
        this._setState({ open: false });
    };

    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    render() {


        return (
            <div className={ this.state.open ? "show" : "hide" }>
                {this.state.logOpen ? 
                    <div className="pop login-pop">
                        <i className="iconfont icon-close" onClick={this.close}></i>
                        <div className="pop-content">
                            <div className="pop-logo">
                                紫荆教育
                            </div>
                            <Formsy.Form
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                onValidSubmit={this.onEnter}
                                className="pop-text">
                                <FormsyText
                                    ref="username"
                                    name="username"
                                    type="text"
                                    title={
                                        <div>
                                            <i className='iconfont icon-username'></i>手机号/邮箱/用户名
                                        </div>
                                    }
                                    required />
                                <FormsyText
                                    ref="password"
                                    name="password"
                                    type="password"
                                    title={
                                        <div>
                                            <i className="iconfont icon-pass"></i>密码
                                        </div>
                                    }
                                    required />
                                <dl className="formsy-list cl">
                                    <dt className="fl">
                                        <input type="checkbox" ref="remember" defaultChecked={true} />记住我
                                    </dt>
                                    <dd className="fr text-error">
                                        {this.state.errorPassword || (!this.state.modified && this.props.error && (this.props.error.message || '登录失败'))}
                                    </dd>
                                </dl>
                                <div className="pop-btn">
                                    <button type="submit" disabled={!this.state.canSubmit} 
                                        className={ this.state.canSubmit ? "" : "disabled"} >登录</button>
                                </div>
                                <div className="pop-other cl">
                                    <span className="fl">没有账号？<button onClick={this.regOpen}>马上注册</button></span><Link to="/pwd/index" className="fr" onClick={this.close}>忘记密码</Link>
                                </div>
                            </Formsy.Form>
                        </div>
                    </div>
                    :
                    <div className="pop register-pop">
                        <i className="iconfont icon-close"></i>
                        <div className="pop-content">
                            <div className="pop-logo">
                                紫荆教育
                            </div>
                            <Formsy.Form
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                className="pop-text">
                                <FormsyText 
                                    name="regusername" 
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
                                    name="regvalidate" 
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
                                    name="regname" 
                                    title={
                                        <div>
                                            <i className="iconfont icon-name"></i>昵称
                                            <em className="fr text-error">用户名为1-16个字符</em>
                                        </div>
                                    } 
                                    type="text" 
                                    required />
                                <FormsyText 
                                    name="regpass" 
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
                                    <span className="fl">已有账号？<button onClick={this.logOpen}>请登录</button></span>
                                </div>
                            </Formsy.Form>
                        </div>
                    </div>
                }
                <div className="screen-bg"></div>
            </div>
        );
    }
};

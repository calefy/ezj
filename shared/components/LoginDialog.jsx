import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import md5 from 'blueimp-md5'

import UserAction from '../actions/UserAction';
import OperateAction from '../actions/OperateAction';
import FormsyText from './formsy/FormsyText.jsx';
import FormsyValid from './formsy/FormsyValid.jsx';

import { getRequestTypes } from '../libs/utils';

let actionTimer = null;

module.exports = class LoginDialog extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        error: PropTypes.object, // 返回的错误信息
        dispatch: PropTypes.func.isRequired
    };

    state = {
        open: false,
        logOpen: false,
        regOpen: false,
        sendSubmit: true,//是否点击验证码按钮
        errorValidMoblie: null,//手机号码验证信息
        sendText: '发送验证码',
        errorSend: null,//是否发送失败
        sendMsg: null,//发送邮件返回信息
        errorCode: null//验证码是否错误
    };

    componentDidMount() {
        this.userAction = new UserAction();
    }

    componentWillReceiveProps(nextProps) {
        // 登录成功关闭对话框
        const loginType = getRequestTypes('login');
        if (nextProps.action.type === loginType.success) {
            this._setState({ open: false });
        }

        if(this.state.regOpen){
        //注册框显示

            if(this.state.sendSubmit){
            //点击验证码按钮
                const sendType = getRequestTypes("send");

                if (nextProps.action.type === UserAction.SEND) {
                    // this.refs.snackbar.show(nextProps.action.message, nextProps.action.label);
                } else if (nextProps.action.type === sendType.success) {
                    const userAction = new UserAction();
                    const name = this.refs.contact.getValue().trim();

                    // nextProps.dispatch( userAction.send() );
                    this._setState({ 
                        errorValidMoblie: nextProps.action.response ? '可注册' : '', 
                        errorSend: false, 
                        sendMsg: '验证短信已发到您的手机', 
                        sendText: "60s后重发",
                        sendSubmit: false
                    });
                }
                else if (nextProps.action.type === sendType.failure) {
                    this._setState({ 
                        errorValidMoblie: nextProps.action.error.message || '该账号未验证', 
                        errorSend: true, 
                        sendMsg: null, 
                        sendText: '发送验证码'
                    });
                }
            }

            else{
            //点击注册按钮
                const regType = getRequestTypes("reg");

                if (nextProps.action.type === regType.success) {
                    this._setState({
                        errorCode: false,
                        open: false
                    });
                } else if (nextProps.action.type === regType.failure) {
                    this._setState({
                        sendMsg: nextProps.action.error.message || '验证码错误',
                        errorCode: true
                    });
                }
            }

        }
    }
    /**
     * 处理注册框与登录框显示与否
     */
    open = () => {
        this._setState({ open: true, logOpen: true, regOpen: false });
    };

    logOpen = () => {
        this._setState({ open: true, logOpen: true, regOpen: false });
    };

    regOpen = () => {
        this._setState({ open: true, regOpen: true, logOpen: false });
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
        const pass=this.refs.password.getValue();
        const fpass=pass.split("").reverse().join("");
        this.props.onSubmit({
            name: this.refs.username.getValue().trim(),
            pass: md5("uokoaduw"+fpass+"auhgniq")
        });
    };

    sendEmail = () => {
        // 检查输入
        if (this._validRegusername()) {
            const contact = this.refs.contact.getValue().trim();
            this.props.dispatch(this.userAction.send(contact));
        }
        
    };

    _validRegusername = () => {
        const val = this.refs.contact.getValue();
        this._setState({ errorRegusername: val ? null : '请输入手机号或邮箱' });
        return !!val;
    };

    close = () => {
        this._setState({ open: false });
    };

    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    regSubmit = () => {
        this._setState({ sendSubmit: false });
        const nickname = this.refs.nickname.getValue();
        const password = this.refs.regpass.getValue();
        const code = this.refs.code.getValue();
        const contact = this.refs.contact.getValue();
        this.props.dispatch(this.userAction.reg({nickname,password,code,contact}));
    };

    render() {
        const { action } = this.props;

        return (
            <div className={ this.state.open ? "show" : "hide" }>
                {this.state.logOpen ? 
                    <div className="pop login-pop">
                        <i className="iconfont icon-close" onClick={this.close}></i>
                        <div className="pop-content">
                            <div className="pop-logo">
                                <em>紫荆教育</em>
                            </div>
                            <Formsy.Form
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                onValidSubmit={this.onEnter}
                                className="pop-text"
                                ref="regform">
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
                                        {this.props.error && (this.props.error.message || '登录失败')}
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
                        <i className="iconfont icon-close" onClick={this.close}></i>
                        <div className="pop-content">
                            <div className="pop-logo">
                                <em>紫荆教育</em>
                            </div>
                            <Formsy.Form
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                onValidSubmit={this.regSubmit}
                                className="pop-text">
                                <FormsyText
                                    ref="contact"
                                    name="contact"
                                    title={
                                        <div>
                                            <i className="iconfont icon-username"></i>手机号/邮箱
                                            <em className={`fr ${this.state.errorSend ? "text-error" :  "text-success" }`}>
                                                {this.state.errorValidMoblie}
                                            </em> 
                                        </div>
                                    }
                                    required />
                                <FormsyValid 
                                    name="code"
                                    ref="code"
                                    title={
                                        <div>
                                            <i className="iconfont icon-yz"></i>验证码
                                            <em className={`fr ${this.state.errorCode ? "text-error" :  "text-success" }`}>
                                                {this.state.sendMsg}
                                            </em>
                                        </div>
                                    }
                                    sendButton={this.state.sendSubmit ? "" : "yz-btn" }
                                    valid={this.state.sendText}
                                    required
                                    validClick={this.sendEmail} />
                                <FormsyText 
                                    ref="nickname"
                                    name="nickname" 
                                    title={
                                        <div>
                                            <i className="iconfont icon-name"></i>昵称
                                            <em className="fr text-error"></em>
                                        </div>
                                    }
                                    validations={{
                                        minLength: 4,
                                        maxLength: 30
                                    }}
                                    validationErrors={{
                                        minLength: "昵称为4-30个字符",
                                        maxLength: "昵称为4-30个字符"
                                    }}
                                    required />
                                <FormsyText 
                                    ref="regpass"
                                    name="regpass" 
                                    title={
                                        <div>
                                            <i className="iconfont icon-pass"></i>密码
                                            <em className="fr text-error"></em>
                                        </div>
                                    }
                                    validations={{
                                        minLength: 6,
                                        maxLength: 20
                                    }}
                                    validationErrors={{
                                        minLength: "密码为6-20个字符",
                                        maxLength: "密码为6-20个字符"
                                    }}
                                    type="password" 
                                    required />
                                <dl className="formsy-list cl">
                                    <dt className="fl">
                                        <input type="checkbox" ref="secret" defaultChecked={true} />表示同意<Link to="">隐私政策</Link>
                                    </dt>
                                    <dd className="fr text-error">
                                        {this.props.error && (this.props.error.message || '注册失败')}
                                    </dd>
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

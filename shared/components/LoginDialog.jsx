import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import UserAction from '../actions/UserAction'
import FormsyText from './formsy/FormsyText.jsx';
import FormsyValid from './formsy/FormsyValid.jsx';

import { getRequestTypes } from '../libs/utils';

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
        errorValidMoblie: null,
        validText: '发送验证码',
        errorValid: null
    };

    componentDidMount() {
        this.userAction = new UserAction();
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.regOpen){
            this.setState({
                likesIncreasing: nextProps.likeCount > this.props.likeCount
            });
            const sendType = getRequestTypes("send");

            if (nextProps.action.type === UserAction.SEND) {
                alert("aaa");
                // this.refs.snackbar.show(nextProps.action.message, nextProps.action.label);
            } else if (nextProps.action.type === sendType.success) {
                const userAction = new UserAction();
                const name = this.refs.regusername.getValue().trim();
                nextProps.dispatch( userAction.send() );
                this._setState({ errorValidMoblie: nextProps.action.error.message || '账号可注册', errorValid: false });
            }
            else if (nextProps.action.type === sendType.failure) {
                this._setState({ errorValidMoblie: nextProps.action.error.message || '该账号未验证', errorValid: true });
            }
            else{
                this._setState({ validText: '60s后发送', errorValid: false });
            }
        }
        else{
            const loginType = getRequestTypes(UserAction.LOGIN);

            if (nextProps.action.type === OperateAction.SHOW_MESSAGE) {
                this.refs.snackbar.show(nextProps.action.message, nextProps.action.label);
            } else if (nextProps.action.type === loginType.success) {
                //const noticeAction = new NoticeAction();
                //nextProps.dispatch( noticeAction.loadMessageNumber() );
            }

            // 清理action，防止路由变更，但是action数据没变更，二次展示问题
            clearTimeout(actionTimer);
            if (nextProps.action.type && nextProps.action.type !== OperateAction.CLEAR_ACTION) {
                actionTimer = setTimeout(function() {
                    const operateAction = new OperateAction();
                    nextProps.dispatch( operateAction.clearAction() );
                }, 300);
            }
        }
        
    }
    /**
     * 处理注册框与登录框显示与否
     */
    openLogDialog = () => {
        this.refs.loginDialog.logOpen();
    };

    open = () => {
        console.log('1');
        this._setState({ open: true, logOpen: true, regOpen: false });
    };

    logOpen = () => {
        console.log('2');
        this._setState({ logOpen: true, regOpen: false });
    };

    regOpen = () => {
        console.log('3');
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

    sendEmail = () => {
        // 检查输入
        if (this._validRegusername()) {
            const name = this.refs.regusername.getValue().trim();
            this.props.dispatch(this.userAction.send(name));
        }
    };

    _validRegusername = () => {
        const val = this.refs.regusername.getValue();
        this._setState({ errorRegusername: val ? null : '请输入手机号或邮箱' });
        return !!val;
    };

    close = () => {
        console.log('4fff');
        this._setState({ open: false });
    };

    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
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
                                紫荆教育
                            </div>
                            <Formsy.Form
                                onValid={this.enableButton}
                                onInvalid={this.disableButton}
                                className="pop-text">
                                <FormsyText
                                    ref="regusername"
                                    name="regusername"
                                    title={
                                        <div>
                                            <i className="iconfont icon-username"></i>手机号/邮箱
                                            { action.type ?
                                                <em className="fr text-error">
                                                    {this.state.errorValidMoblie}
                                                </em> 
                                                :
                                                <em className="fr text-success">可注册</em>
                                            }
                                        </div>
                                    }
                                    required />
                                <FormsyValid 
                                    name="regvalid" 
                                    title={
                                        <div>
                                            <i className="iconfont icon-yz"></i>验证码
                                            <em className="fr text-error">验证码错误</em>
                                            <em className="fr text-success">验证短信已发到您的手机</em>
                                        </div>
                                    }
                                    valid={this.state.validText}
                                    required
                                    validClick={this.sendEmail} />
                                <FormsyText 
                                    name="regname" 
                                    title={
                                        <div>
                                            <i className="iconfont icon-name"></i>昵称
                                            <em className="fr text-error">用户名为1-16个字符</em>
                                        </div>
                                    }
                                    required />
                                <FormsyText 
                                    name="regpass" 
                                    title={
                                        <div>
                                            <i className="iconfont icon-pass"></i>密码
                                            <em className="fr text-error">密码格式错误</em>
                                        </div>
                                    } 
                                    type="password" 
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

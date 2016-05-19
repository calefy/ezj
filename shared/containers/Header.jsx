/**
 * 页面header
 *
 * - 用户登录后下拉菜单
 * - 登录、注册弹框
 * - 退出
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import trim from 'lodash/trim';

import { getRequestTypes, avatar } from '../libs/utils';
import UserAction from '../actions/UserAction';
import OperateAction from '../actions/OperateAction';
import Dialog     from '../components/Dialog.jsx';
import RegistForm from '../components/RegistForm.jsx';
import LoginForm  from '../components/LoginForm.jsx';
import Protocol from '../components/Protocol.jsx';

class Header extends Component {
    state = {
        showMenu: false,  // 头像下来菜单显示与否
        showDialog: false,  // 显示登录注册框
        dialogType: 'login', // 对话框类型
        showProtocol: null, // 显示协议：pay/private
    };

    userAction = new UserAction();

    componentWillReceiveProps(nextProps) {
        const loginType = getRequestTypes(UserAction.LOGIN);
        const sendType = getRequestTypes(UserAction.SEND);
        const registType = getRequestTypes(UserAction.REGIST);
        switch(nextProps.action.type) {
            case loginType.success:
                this.hideDialog();
                // 因登录返回的用户数据不全，因此登录成功后加载用户完整数据
                const userAction = new UserAction();
                nextProps.dispatch(userAction.loadAccount());
                // 以上加载userinfo数据用刷新页面代替，保证退出后立马登录数据的清洁
                //document.location.reload(); // 该方式会导致加载完成前就点击的会被跳转
                break;
            case loginType.failure:
                this.refs.loginForm.handleResponse(nextProps.action.error);
                break;

            case sendType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_VALID_CODE, nextProps.action.error);
                break;

            case registType.success:
                this.hideDialog();
                // 刷新以更新数据，防止regist接口返回数据不全
                document.location.reload();
                break;
            case registType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_REGIST, nextProps.action.error);
                break;

            case OperateAction.OPEN_LOGIN_DIALOG: // 从其他组件调用打开登录对话框
                this._setState({ showDialog: true, dialogType: 'login' });
                break;
            case OperateAction.OPEN_REGIST_DIALOG: // 从其他组件调用打开注册对话框
                this._setState({ showDialog: true, dialogType: 'regist' });
                break;
        }
    }

    /**
     * 设置state
     */
    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    /**
     * 用户菜单显示与否
     */
    toggleMenu = () => {
        this._setState({ showMenu: !this.state.showMenu });
    };
    showMenu = () => {
        this._setState({showMenu: true});
    };
    hideMenu = () => {
        this._setState({showMenu: false});
    };

    /**
     * 登录框显示与否
     */
    showDialog = (e) => {
        this._setState({ showDialog: true, dialogType: e.currentTarget.value });
    };
    hideDialog = () => {
        this._setState({ showDialog: false });
    };

    hideProtocolDialog = () => {
        this._setState({ showProtocol: null });
    };

    /**
     * 切换不同表单
     */
    handleTurnToLogin = () => {
        this._setState({dialogType: 'login'});
    };
    handleTurnToRegist = () => {
        this._setState({dialogType: 'regist'});
    };
    handleTurnToPasswd = () => {
        this._setState({ showDialog: false });
    };

    /**
     * 执行注册
     */
    handleSendValidCode = (contact) => {
        this.props.dispatch(this.userAction.send(contact));
    };
    handleRegist = (data) => {
        this.props.dispatch(this.userAction.reg(data));
    };
    handleShowProtocol = type => {
        this._setState({ showProtocol: type });
    };

    /**
     * 执行登录
     */
    handleLogin = data => {
        this.props.dispatch(this.userAction.login(data));
    };

    handleLogout = () => {
        this._setState({ showMenu: false });
        // 清空其他需要登录的数据
        const operateAction = new OperateAction();
        this.props.dispatch(operateAction.clearLoginedData());
        // 执行退出
        this.props.dispatch(this.userAction.logout());
        // 清除本地cookie
        document.cookie = '_SUP=;domain=.ezijing.com;path=/;expires='+(new Date()).toGMTString()+';';
        // 跳转以清空缓存数据
        //setTimeout(() => { // 保证跳转后，cookie已清
        //    document.location = '/';
        //}, 300);
    };

    // 搜索
    onSearchSubmit = e => {
        e.preventDefault();
        e.nativeEvent.returnValue = false;
        let v = trim(this.refs.q.value);
        if (v) {
            this.props.history.push({ pathname: '/courses', query: { q: v } });
        }
    };

    render() {
        const user = this.props.user.data || {}
        const pathname = this.props.location.pathname;
        return (
            <div className="header cl">
                <div className="container">
                    <div className="logo fl">
                        <Link to="/"><img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/1bb87d41d15fe27b500a4bfcde01bb0e.png" alt="" /></Link>
                    </div>
                    <nav className="header-nav fl mar-r22">
                        <ul>
                            <li>
                                <Link to="/" className={pathname === '/' ? 'cur' : null}>首页</Link>
                            </li>
                            <li>
                                <Link to="/courses" className={pathname === '/courses' ? 'cur' : null}>全部课程</Link>
                            </li>
                            <li>
                                <Link to={user.uid ? '/study/all' : '/study/intro'} className={/^\/study/.test(pathname) ? 'cur' : null}>学习中心</Link>
                            </li>
                        </ul>
                    </nav>
                    <form className="header-search fl" action="/courses" method="GET" onSubmit={this.onSearchSubmit}>
                        <input type="text" ref="q" name="q" placeholder="请输入您要搜索的关键词" />
                        <button type="submit"><i className="iconfont icon-search"></i></button>
                    </form>
                    {user.uid ?
                        <div className="header-user fr">
                            <div className="head-account fr" onClick={this.toggleMenu} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
                                <div className="user-picture fr">
                                    <img src={avatar(user.avatar, 'pipe1')}/>
                                </div>
                                <span className="user-name fr">{user.nickname}</span>
                                <ul className={`menu nav ${this.state.showMenu ? '' : 'hide' }` } >
                                    <li className="first leaf">
                                        <Link to="/account/index">个人中心</Link>
                                    </li>
                                    <li className="last leaf">
                                        <Link to="/" onClick={this.handleLogout} >退出登录</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="unread_count fr hide"><i className="iconfont icon-username"></i><span>5</span></div>
                        </div>
                        :
                        <div className="header-user fr">
                            <button onClick={this.showDialog} value="login">登录</button>
                            <button onClick={this.showDialog} value="regist">注册</button>
                        </div>
                    }
                </div>

                {/*登录与注册弹框*/}
                <Dialog
                    ref="dialog"
                    className={`pop ${this.state.dialogType === 'login' ? 'login-pop' : 'register-pop'}`}
                    open={this.state.showDialog}
                    onRequestClose={this.hideDialog}
                >
                    <div className="pop-logo"><em>紫荆教育</em></div>
                    {this.state.dialogType === 'login' ?
                        <LoginForm
                            ref="loginForm"
                            onLogin={this.handleLogin}
                            onTurnToRegist={this.handleTurnToRegist}
                            onTurnToPasswd={this.handleTurnToPasswd}
                        />
                        :
                        <RegistForm
                            ref="registForm"
                            onSendValidCode={this.handleSendValidCode}
                            onRegist={this.handleRegist}
                            onTurnToLogin={this.handleTurnToLogin}
                            onTurnToProtocol={this.handleShowProtocol}
                        />
                    }
                </Dialog>

                {/*隐私/付费协议*/}
                <Dialog
                    className="agreement-pop pop"
                    open={!!this.state.showProtocol}
                    onRequestClose={this.hideProtocolDialog}
                >
                    <Protocol type={this.state.showProtocol} />
                </Dialog>

            </div>
        );
    }
};

module.exports = connect( state => ({
    action: state.action,
    user: state.user
}) )(Header);


/**
 * 页面header
 *
 * - 用户登录后下拉菜单
 * - 登录、注册弹框
 * - 退出
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'

import { getRequestTypes } from '../libs/utils';
import UserAction from '../actions/UserAction';
import OperateAction from '../actions/OperateAction';
import Dialog     from '../components/Dialog.jsx';
import RegistForm from '../components/RegistForm.jsx';
import LoginForm  from '../components/LoginForm.jsx';

class Header extends Component {
    // 初始加载数据
    static fetchData({dispatch, apiClient}) {
        const userAction = new UserAction({ apiClient: apiClient });
        return Promise.all([
            dispatch(userAction.loadAccount()),
        ]);
    }
    state = {
        showMenu: false,  // 头像下来菜单显示与否
        showDialog: false,  // 显示登录注册框
        dialogType: 'login', // 对话框类型
    };

    componentDidMount() {
        this.userAction = new UserAction();
        if (this.props.user.isFetching) {
            Header.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        const loginType = getRequestTypes(UserAction.LOGIN);
        const sendType = getRequestTypes(UserAction.SEND);
        const registType = getRequestTypes(UserAction.REGIST);
        switch(nextProps.action.type) {
            case loginType.success:
                this.hideDialog();
                break;
            case loginType.failure:
                this.refs.loginForm.handleResponse(nextProps.action.error);
                break;

            case sendType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_VALID_CODE, nextProps.action.error);
                break;

            case registType.success:
                this.hideDialog();
                break;
            case registType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_REGIST, nextProps.action.error);
                break;

            case OperateAction.OPEN_LOGIN_DIALOG:
                this._setState({ showDialog: true, dialogType: 'login' });
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

    /**
     * 执行登录
     */
    handleLogin = data => {
        this.props.dispatch(this.userAction.login(data));
    };

    handleLogout = () => {
        this._setState({ showMenu: false });
        this.props.dispatch(this.userAction.logout());
    };

    render() {
        const user = this.props.user.data || {}
        const pathname = this.props.location.pathname;
        return (
            <div className="header cl">
                <div className="container">
                    <div className="logo fl">
                        <Link to="/"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1bb87d41d15fe27b500a4bfcde01bb0e.png" alt="" /></Link>
                    </div>
                    <nav className="header-nav fl mar-r22">
                        <ul>
                            <li>
                                <Link to="/" activeClassName={pathname === '/' ? 'cur' : null}>首页</Link>
                            </li>
                            <li>
                                <Link to="study.html">课程中心</Link>
                            </li>
                            <li>
                                <Link to="service.html">学习中心</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-search fl">
                        <input type="text" name="" placeholder="请输入您要搜索的关键词" /><a href="search"><i className="iconfont icon-search"></i></a>
                    </div>
                    {user.uid ?
                        <div className="header-user fr">
                            <div className="head-account fr" onClick={this.toggleMenu} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
                                <div className="user-picture fr">
                                    <img src={user.avatar || 'http://xplat-avatar.oss-cn-beijing.aliyuncs.com/a462f8c334e328ba8f572ca0a51c4861.jpg'}/>
                                </div>
                                <span className="user-name fr">{user.nickname}</span>
                                <ul className={`menu nav ${this.state.showMenu ? '' : 'hide' }` } >
                                    <li className="first leaf">
                                        <Link to="/account/index">我的账号</Link>
                                    </li>
                                    <li className="last leaf">
                                        <Link to="/" onClick={this.handleLogout} >退出</Link>
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

                <Dialog
                    ref="dialog"
                    className={`pop ${this.state.dialogType === 'login' ? 'login-pop' : 'register-pop'}`}
                    open={this.state.showDialog}
                    onRequestClose={this.hideDialog}
                >
                    <div className="pop-logo">紫荆教育</div>
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
                        />
                    }
                </Dialog>
            </div>
        );
    }
};

module.exports = connect( state => ({
    action: state.action,
    user: state.user
}) )(Header);


/**
 * 页面header
 *
 * - 用户登录后下拉菜单
 * - 登录、注册弹框
 * - 退出
 */
import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom'
import { Link } from 'react-router'
import LoginDialog from './LoginDialog.jsx';

class Header extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        action: PropTypes.object.isRequired,
        handleLoginSubmit: PropTypes.func.isRequired,
        handleLogout: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    
    state = {
        show: false,  // 头像下来菜单显示与否
    };

    /**
     * 设置state
     */
    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    /**
     * 处理登录显示与否
     */
    openLoginDialog = () => {
        this.refs.loginDialog.open();
    };
    openReg = () => {
        this.refs.loginDialog.regOpen();
    }

    /**
     * 用户菜单显示与否
     */
    showToggle = () => {
        let obj = { show: !this.state.show };
        this._setState(obj);
    };

    onClickLogout = () => {
        this._setState({ show: false });
        this.props.handleLogout();
    };

    componentWillReceiveProps(nextProps) {
        // 只要有了user数据，就不显示登录框
        if (nextProps.user.data) {
            this.refs.loginDialog.close();
        }
    }

    render() {
        const user = this.props.user.data || {}
        return (
            <div className="header cl" open={this.state.show}>
                <div className="container">
                    <div className="logo fl">
                        <a href="/"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1bb87d41d15fe27b500a4bfcde01bb0e.png" alt="" /></a>
                    </div>
                    <nav className="header-nav fl mar-r22">
                        <ul>
                            <li className="cur">
                                <Link to="/">首页</Link>
                            </li>
                            <li>
                                <Link to="study.html">课程中心</Link>
                            </li>
                            <li>
                                <Link to="service.html">学习中心</Link>
                            </li>
                            <li>
                                <Link to="service.html">创业学院</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-search fl">
                        <input type="text" name="" placeholder="请输入您要搜索的关键词" /><a href="#"><i className="iconfont icon-search"></i></a>
                    </div>
                    <div className={ `header-user fr ${user.uid ? 'hide' : '' }` }>
                        <button onClick={this.openLoginDialog} className="curr">登录</button>
                        <button onClick={this.openReg}>注册</button>
                    </div>
                    <div className={ `header-user fr ${user.uid ? '' : 'hide'}` }>
                        <div id="headerAccount" className="">
                            <div className="head-account" onClick={this.showToggle} ref="head_avatar">
                                <div className="user-picture" uid={user.uid}>
                                    <a href="javascript:;">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/a462f8c334e328ba8f572ca0a51c4861.jpg" />
                                    </a>
                                </div>
                                <a href={`/users/ ${user.uid}`} className="username">{user.nickname}</a>
                            </div>
                            <ul className={` menu nav ${this.state.show ? '' : 'hide' }` } >
                                <li className="first leaf">
                                    <a href="/users.shtml?14679">我的账号</a>
                                </li>
                                <li className="last leaf">
                                    <a href="javascript:;" id="logout">退出</a>
                                </li>
                            </ul>
                        </div>
                        <div id="unreadCount">
                            <div className="unread_count"><i className="iconfont icon-username"></i><span>5</span></div>
                        </div>
                    </div>
                </div>
                <LoginDialog
                    ref="loginDialog"
                    error={this.props.user.loginError}
                    onSubmit={this.props.handleLoginSubmit}
                    dispatch={this.props.dispatch}
                    action={this.props.action}
                />
            </div>
        );
    }
}


module.exports = Header


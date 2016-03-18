import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom'
import { Link } from 'react-router'
import LoginDialog from './LoginDialog.jsx';

class Header extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        handleLoginSubmit: PropTypes.func.isRequired,
        handleLogout: PropTypes.func.isRequired
    };
    static menus = [
        { path: '/courses/mine', name: '我的课程' },
        { path: '/courses/all', name: '选课广场' },
        { path: '/changepass', name: '修改密码' },
        { path: '/avatar', name: '修改头像' },
    ];

    state = {
        show: false,  // 头像下来菜单显示与否
        anchorEl: null // 头像对象
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

    /**
     * 用户菜单显示与否
     */
    showToggle = () => {
        let obj = { show: !this.state.show };
        if (!this.state.anchorEl) {
            obj.anchorEl = ReactDom.findDOMNode(this.refs.head_avatar);
        }
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
                    <div className="header-user fr">
                        <button onClick={this.openLoginDialog} className="curr">登录</button>
                        <button>注册</button>
                    </div>
                </div>
                <LoginDialog
                    ref="loginDialog"
                    error={this.props.user.loginError}
                    onSubmit={this.props.handleLoginSubmit}
                />
            </div>
        );
    }
}


module.exports = Header


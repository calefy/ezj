import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom'
import { Link } from 'react-router'

class Header extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        handleLoginSubmit: PropTypes.func.isRequired,
        handleLogout: PropTypes.func.isRequired
    };

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
            <div className="header cl">
                <div className="container">
                    <div className="logo fl">
                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1bb87d41d15fe27b500a4bfcde01bb0e.png" alt="" />
                    </div>
                    <nav className="header-nav fl mar-r22">
                        <ul>
                            <li className="cur">
                                <a href="/">首页</a>
                            </li>
                            <li>
                                <a href="study.html">课程中心</a>
                            </li>
                            <li>
                                <a href="service.html">学习中心</a>
                            </li>
                            <li>
                                <a href="service.html">创业学院</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-search fl">
                        <input type="text" name="" placeholder="请输入您要搜索的关键词" /><a href="#"><i className="icon iconfont">&#xe60c;</i></a>
                    </div>
                    <div className="header-user fr">
                        <a href="#" id="login" className="curr">登录</a>
                        <a href="#" id="register">注册</a>
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = Header


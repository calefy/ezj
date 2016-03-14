import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom'
import { Link } from 'react-router'

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

    static styles = {
        headStyle: {
            width: '100%',
            maxWidth: '1000px',
            margin: '19px auto',
            backgroundColor: '#fff',
            boxShadow: '0 0 0 #fff',
            padding: 0
        },
        headTitleStyle: {
            color: '#a32646',
            backgroundImage: 'url(/static/images/logo.png)',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left center',
            textIndent: '-99em',
            display: 'inline-block',
            width: '100%',
            maxWidth: 600,
        },
        menuStyle: {
            top: 70
        }
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
            <div className="header clearfix">
                Header
            </div>
        );
    }
}


module.exports = Header


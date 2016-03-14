import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom'
import { Link } from 'react-router'
import { AppBar, Avatar, ListItem, Badge, RaisedButton, Dialog, FlatButton, TextField, Checkbox, Popover, Menu, MenuItem } from 'material-ui'
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
        const user = this.props.user.data || {}
        const styles = Header.styles;
        const menus = Header.menus;
        let unreadMsg = this.props.user.unread_number;
        unreadMsg = unreadMsg <= 0 ? '' : unreadMsg > 99 ? '99+' : unreadMsg;
        const headRight = (
            <div className="head-info fr clearfix">
                <div className={ `head-log fl ${user.id ? 'hide' : '' }` }>
                    <RaisedButton 
                        style={ styles.loginBtnStyle } 
                        primary={ true } 
                        label="登录" 
                        backgroundColor="#a22645" 
                        onClick={this.openLoginDialog} />
                </div>
                <div className={ `head-user fr ${user.id ? '' : 'hide'}` }>
                    <Avatar
                        ref="head_avatar"
                        title={user.real_name}
                        src={user.avatar || '/static/images/user.jpg'}
                        style={{ zIndex:10000, left:0, top: 0 }}
                        onClick={this.showToggle}
                        className="head-avatar" />
                    <Link to='/messages'>
                        <Badge
                            badgeContent={unreadMsg || 0}
                            primary={true}
                            badgeStyle={{top: -2, right: 0, textAlign: "center", lineHeight: "24px", display: unreadMsg ? 'block' : 'none'}}
                        >
                            <Avatar src="/static/images/head-message.png" alt="消息" />
                        </Badge>
                    </Link>
                </div>
            </div>
        );
        return (
            <div className="header clearfix">
                <AppBar
                    title={<Link to="/" style={ styles.headTitleStyle }>紫荆教育mba在线学习系统</Link>}
                    zDepth={1}
                    showMenuIconButton={false}
                    iconElementRight={ headRight }
                    iconStyleRight={{ marginRight: 0, position: "absolute", right: 0, top: 10 }}
                    style={ styles.headStyle } />
                <Popover open={this.state.show}
                    style={styles.menuStyle}
                    className="head-list"
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.showToggle} >
                    <Menu>
                        {menus.map( (item, index) => {
                            return  <MenuItem
                                        key={index}
                                        primaryText={
                                            <Link
                                                to={item.path}>{item.name}</Link>
                                        }
                                        style={{ textAlign: 'center' }}
                                        onClick={this.showToggle} />
                        })}
                        <MenuItem primaryText="退出" style={{ textAlign: 'center' }} onClick={this.onClickLogout} />
                    </Menu>
                </Popover>

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


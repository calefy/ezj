import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import LoginDialog from '../../components/LoginDialog.jsx';
import UserAction from '../../actions/UserAction'

class ResetPwd extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        action: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    /**
     * 处理登录显示与否
     */
    openLoginDialog = () => {
        this.refs.loginDialog.open();
    };

    componentDidMount() {
        this.userAction = new UserAction();
    };
    /**
     * 执行登录
     */
    handleLoginSubmit = data => {
        this.props.dispatch(this.userAction.login(data));
    };

    render() {
        return (
            <div className="content pwd-success">
                密码设置成功，请<button onClick={this.openLoginDialog} className="pwd-login-btn">重新登录</button>
                <LoginDialog
                    ref="loginDialog"
                    error={this.props.user.loginError}
                    onSubmit={this.handleLoginSubmit}
                    dispatch={this.props.dispatch}
                    action={this.props.action}
                />
            </div>
        );
    }
}


module.exports = connect( state => ({ action: state.action, user: state.user }) )(ResetPwd);


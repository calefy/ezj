import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import OperateAction from '../../actions/OperateAction';

class Success extends Component {

    /**
     * 处理登录显示与否
     */
    openLoginDialog = () => {
        let operateAction = new OperateAction();
        this.props.dispatch(operateAction.openLoginDialog());
    };

    render() {
        return (
            <div className="content pwd-success">
                密码设置成功，请<button onClick={this.openLoginDialog} className="pwd-login-btn">重新登录</button>
            </div>
        );
    }
}


module.exports = connect( state => ({ action: state.action }) )(Success);


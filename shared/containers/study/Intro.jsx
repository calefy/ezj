/**
 * 学习中心未登录页面
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserAction from '../../actions/UserAction';
import { getRequestTypes } from '../../libs/utils';

class Intro extends Component {
    componentWillReceiveProps(nextProps) {
        // 登录加载user信息时，跳转
        let userType = getRequestTypes(UserAction.USER);
        if (nextProps.action.type === userType.request) {
            nextProps.history.push('/study/all');
        }
    }
    render() {
        return (
            <div style={{padding:'40px 0 80px'}}>
                <img src="http://zj-avatar.img-cn-beijing.aliyuncs.com/505eb3e66ace5b50689c532b3770b16b315002589.png@100p" alt=""/>
            </div>
        );
    }
}

module.exports = connect( state => ({
    action: state.action,
}) )(Intro);

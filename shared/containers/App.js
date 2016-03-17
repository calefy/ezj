import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import UserAction from '../actions/UserAction'
import OperateAction from '../actions/OperateAction';
import CoursesAction from '../actions/CoursesAction'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRequestTypes } from '../libs/utils';


if (process.env.BROWSER) {
    require('css/reset.css')
    require('css/style.css')
    require('css/index.css')
    require('css/classify.css')
    require('css/iconfont/iconfont.css')
}

let actionTimer = null;

class App extends Component {

    // 初始加载数据
    static fetchData({dispatch, apiClient}) {
        return Promise.all([
            //dispatch(userAction.loadAccount()),
            //dispatch(noticeAction.loadMessageNumber())
        ]);
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        const loginType = getRequestTypes(UserAction.LOGIN);

        if (nextProps.action.type === OperateAction.SHOW_MESSAGE) {
            this.refs.snackbar.show(nextProps.action.message, nextProps.action.label);
        } else if (nextProps.action.type === loginType.success) {
            //const noticeAction = new NoticeAction();
            //nextProps.dispatch( noticeAction.loadMessageNumber() );
        }

        // 清理action，防止路由变更，但是action数据没变更，二次展示问题
        clearTimeout(actionTimer);
        if (nextProps.action.type && nextProps.action.type !== OperateAction.CLEAR_ACTION) {
            actionTimer = setTimeout(function() {
                const operateAction = new OperateAction();
                nextProps.dispatch( operateAction.clearAction() );
            }, 300);
        }
    }

    /**
     * 执行登录
     */
    handleLoginSubmit = data => {
        this.props.dispatch(this.userAction.login(data));
    };
    /**
     * 退出登录
     */
    handleLogout = () => {
        this.props.dispatch(this.userAction.logout())
            .then(() => {
                document.location = '/';
            });
    };

    render() {
        return (
            <div>
                <Header
                    user={this.props.user}
                    handleLoginSubmit={this.handleLoginSubmit}
                    handleLogout={this.handleLogout}
                />
                <div className="body">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

module.exports = connect( state => ({
    action: state.action,
    user: state.user
}) )(App);


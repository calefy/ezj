import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import OperateAction from '../actions/OperateAction';
import UserAction from '../actions/UserAction';
import Header from './Header.jsx';
import Footer from '../components/Footer';


if (process.env.BROWSER) {
    require('css/reset.css')
    require('css/style.css')
    require('css/iconfont/iconfont.css')
}

let actionTimer = null;

class App extends Component {
    // 初始加载数据
    static fetchData({dispatch, apiClient}) {
        const userAction = new UserAction({ apiClient: apiClient });
        return Promise.all([
            dispatch(userAction.loadAccount()),
        ]);
    }

    componentDidMount() {
        this.userAction = new UserAction();
        if (this.props.user.isFetching) {
            App.fetchData(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        let prevPath = this.props.location.pathname + this.props.location.search;
        let nextPath = nextProps.location.pathname + nextProps.location.search;
        if (prevPath !== nextPath) {
            window.scrollTo(0, 0);
        }

        // 清理action，防止路由变更时，action数据没变更，导致二次处理问题
        clearTimeout(actionTimer);
        if (nextProps.action.type && nextProps.action.type !== OperateAction.CLEAR_ACTION) {
            actionTimer = setTimeout(function() {
                const operateAction = new OperateAction();
                nextProps.dispatch( operateAction.clearAction() );
            }, 300);
        }
    }

    render() {
        return (
            <div>
                <Header location={this.props.location} history={this.props.history} />
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


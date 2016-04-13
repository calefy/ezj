import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import OperateAction from '../actions/OperateAction';
import Header from './Header.jsx';
import Footer from '../components/Footer';


if (process.env.BROWSER) {
    require('css/reset.css')
    require('css/style.css')
    require('css/index.css')
    require('css/classify.css')
    require('css/iconfont/iconfont.css')
}

let actionTimer = null;

class App extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.action.type === OperateAction.SHOW_MESSAGE) {
            //this.refs.snackbar.show(nextProps.action.message, nextProps.action.label);
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

    render() {
        return (
            <div>
                <Header />
                <div className="body">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

module.exports = connect( state => ({
    action: state.action
}) )(App);


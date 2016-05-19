import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

import OperateAction from '../actions/OperateAction';
import UserAction from '../actions/UserAction';
import Header from './Header.jsx';
import Footer from '../components/Footer';
import Snackbar from '../components/Snackbar.jsx';
import { getIdt } from '../libs/utils';


if (process.env.BROWSER) {
    require('css/reset.css')
    require('css/style.css')
    require('css/iconfont/iconfont.css')
}

let actionTimer = null;
let analysisTimer = null;

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
        this.operateAction = new OperateAction();
        if (this.props.user.isFetching) {
            App.fetchData(this.props);
        }

        // 添加上送接口统计
        this.props.dispatch(this.operateAction.addAnalysisAction({ type: 'PAGEVIEW', ts: (new Date()).getTime(), key: this.props.location.pathname + this.props.location.search }));

        // 上传接口统计数据
        analysisTimer = setInterval(this.doUploadAnalysis.bind(this), 10 * 1000);

        // 添加piwik统计代码
        setTimeout(() => { this.doPiwikCode(); }, 100);
    }

    componentWillReceiveProps(nextProps) {
        let prevPath = this.props.location.pathname + this.props.location.search;
        let nextPath = nextProps.location.pathname + nextProps.location.search;
        if (prevPath !== nextPath) {
            window.scrollTo(0, 0);
            // 添加上送接口统计
            this.props.dispatch(this.operateAction.addAnalysisAction({ type: 'PAGEVIEW', ts: (new Date()).getTime(), key: nextPath }));
            // 添加piwik统计代码
            setTimeout(() => {
                if (window._paq) {
                    _paq.push(['setCustomUrl', nextPath]);
                    _paq.push(['trackPageView']);
                }
            }, 0);
        }

        // 显示错误消息
        if (nextProps.action.type === OperateAction.SHOW_MESSAGE) {
            this.refs.snackbar.show(nextProps.action.message);
        }

        // 登录暂时只能通过匹配message控制
        if (nextProps.action.error) {
            if (nextProps.action.error.message == '需要登录') {
                nextProps.dispatch(this.operateAction.showErrorMessage('登录已过期，请重新登录后访问。'));
            } else if (nextProps.action.error.message == 'Failed to fetch') {
                nextProps.dispatch(this.operateAction.showErrorMessage('获取数据失败，请检查网络连接情况，或稍后重试。'));
            }
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

    componentWillUnmount() {
        clearInterval(analysisTimer);
        this.doUploadAnalysis();
    };

    // 执行分析数据上传
    doUploadAnalysis = () => {
        let actions = this.props.analysis_actions;
        if (actions.length) {
            this.props.dispatch(this.operateAction.uploadAnalysis({
                _idt: getIdt(),
                device: 1, // 网站
                actions: actions,
            }));

            this.props.dispatch(this.operateAction.clearAnalysisAction())
        }
    };

    // Piwik统计代码，每次URL变更重新部署
    doPiwikCode = () => {
        window._paq = [];
        _paq.push(["setDomains", ["*.www.ezijing.com","*.w3.ezijing.com"]]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);

        var u="//piwik.ezijing.com/", domId = '__piwik_script';
        _paq.push(['setTrackerUrl', u+'piwik.php']);
        _paq.push(['setSiteId', 1]);

        var d=document, g=d.createElement('script'), s;
        g.type='text/javascript'; g.src=u+'piwik.js';
        g.async=true; g.defer=true;
        s=d.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(g,s);
    };

    render() {
        const { location } = this.props;
        // 是否隐藏头尾：
        //  - 手机页 /m
        //  - 银联页面 /topic/unipay
        let shouldHide = /^(\/m\/|\/topic\/unipay)/.test(location.pathname);

        return (
            <div>
                {shouldHide ? null : <Header location={location} history={this.props.history} /> }

                <div className="body">
                    {this.props.children}
                </div>

                {shouldHide ? null : <Footer />}

                <Snackbar ref="snackbar" />
            </div>
        );
    }
}

module.exports = connect( state => ({
    action: state.action,
    user: state.user,
    analysis_actions: state.analysis_actions,
}) )(App);


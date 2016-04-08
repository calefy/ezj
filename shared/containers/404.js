import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

if (process.env.BROWSER) {
    require('css/notFound.css')
}

class Classify extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        return Promise.all([
            // 默认首页取5个
            //dispatch( noticeAction.loadNotices({pageSize: 5}, getOwnRequestIdentity(location)) )
        ]);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="content not-found">
                <div className="container cl">
                    <p>很抱歉，您访问的页面已经断开...</p>
                    <Link to="">返回首页</Link>
                    <Link to="">返回上一页</Link>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Classify);


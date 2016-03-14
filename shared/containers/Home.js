import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getOwnRequestIdentity, isOwnRequest } from '../libs/utils';

class Home extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const noticeAction = new NoticeAction({ apiClient: apiClient });
        return Promise.all([
            // 默认首页取5个
            //dispatch( noticeAction.loadNotices({pageSize: 5}, getOwnRequestIdentity(location)) )
        ]);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='container mar20'>
                <h1 className="h1-title">
                    最新动态
                    <Link to="/notices" className="fr">查看全部</Link>
                </h1>

            </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Home);


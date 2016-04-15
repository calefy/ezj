import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getOwnRequestIdentity, isOwnRequest } from '../libs/utils';

class Course extends Component {

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
            <div className="content classify">
                <h1 className="h1-title">
                    课程详情....
                </h1>
            </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Course);


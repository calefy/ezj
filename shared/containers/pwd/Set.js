import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

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
            <div className="content">
                <h1 className="h1-title">
                    这里是课程中心
                </h1>
            </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Course);


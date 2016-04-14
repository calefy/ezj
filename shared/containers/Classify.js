import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getOwnRequestIdentity, isOwnRequest } from '../libs/utils';

if (process.env.BROWSER) {
    require('css/classify.css');
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
            <div className="content classify">
                <div className="container cl">
                    <div className="classify-left fl">
                        <h4>金融专业实务精品课</h4>
                        <a href="" title="">财富管理<i className="iconfont icon-arrow fr"></i></a>
                        <a href="" title="">企业理财顾问师<i className="iconfont icon-arrow fr"></i></a>
                        <a href="security" title="">资产证券化<i className="iconfont icon-arrow fr"></i></a>
                        <a href="" title="">互联网金融<i className="iconfont icon-arrow fr"></i></a>
                        <h5><a href="" title="">金融领导力<i className="iconfont icon-arrow fr"></i></a></h5>
                        <h5><a href="" title="">学位教育<i className="iconfont icon-arrow fr"></i></a></h5>
                    </div>
                    <div className="classify-right fl">
                        <p className="classify-course">查看关于<a href="">互联网金融商业模式</a><br /><a href="" title="">资产证券化</a><a href="" title="">企业理财</a>的精品课程</p>
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Classify);


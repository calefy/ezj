import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getOwnRequestIdentity, isOwnRequest } from '../libs/utils';

if (process.env.BROWSER) {
    require('css/search.css')
}

class Security extends Component {

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
            <div className="content classify-security">
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
                    <div className="classify-title">
                        <h4>搜索结果</h4>
                        <p>为您搜索到 <em>6</em> 门关于“<em>关键词</em>”的课程</p>
                    </div>
                    <div className="search-course bg-white">
                        <h4 className="classify-h4">搜索结果</h4>
                        <div className="course-list" style={{ padding: 20}}>
                            <ul className="index-course cl">
                                <li>
                                    <a href="/courses/22">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>22</h6>
                                        <p>$700</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/courses/22">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>22</h6>
                                        <p>$700</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/courses/22">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>22</h6>
                                        <p>$700</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/courses/22">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>22</h6>
                                        <p>$700</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/courses/22">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>22</h6>
                                        <p>$700</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/courses/22">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>22</h6>
                                        <p>$700</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/courses/22">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>22</h6>
                                        <p>$700</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Security);


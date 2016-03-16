import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getOwnRequestIdentity, isOwnRequest } from '../libs/utils';

class Home extends Component {

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
            <div>
                <div className="banner">
                    <div className="container">
                        <div className="banner-top">
                            在这里学习全中国最好的金融课程
                        </div>
                        <div className="banner-center">
                            <a href="Classify" title="" className="banner-all-course">查看全部课程</a>
                        </div>
                        <div className="banner-bottom">
                            <a href="" title="">财富管理</a>
                            <a href="" title="" className="curr">企业理财</a>
                            <a href="" title="">资产证券化</a>
                            <a href="" title="">互联网金融</a>
                            <a href="" title="">金融领导力</a>
                            <a href="" title="">学位项目</a>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="content-module1">
                        <div className="container cl">
                            <a href="" title="" className="module module1">
                                <div className="module-icon">
                                    <i className="iconfont icon-module11"></i>
                                </div>
                                <h4>CFC</h4>
                                <div className="module-title">企业理财师（CFC）认证</div>
                                <p>一张通行国内、国际金融界的专业资质</p>
                            </a>
                            <a href="" title="" className="module module2">
                                <div className="module-icon">
                                    <i className="iconfont icon-module21"></i>
                                </div>
                                <h4>公开课</h4>
                                <div className="module-title">全球互联网金融商业模式及案例 深度解析公开课</div>
                                <p>权威、全面、深入、前沿、实战、超值</p>
                            </a>
                            <a href="" title="" className="module module3">
                                <div className="module-icon">
                                    <i className="iconfont icon-module31"></i>
                                </div>
                                <h4>公开课</h4>
                                <div className="module-title">《资产证券化创新》公开课</div>
                                <p>为资产证券化业务提供实践的操作指南</p>
                            </a>
                        </div>
                    </div>
                    <div className="content-module2">
                        <h3 className="index-title">免费课程</h3>
                        <ul className="index-course container cl">
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="content-module3">
                        <h3 className="index-title">最热课程</h3>
                        <div className="hot-course container cl">
                            <div className="fl hot-course-left">
                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/fb735a0af45e4588932bbd2495df2519.jpg" alt="" />
                            </div>
                            <ul className="index-course fr" style={{ width: 958}}>
                                <li>
                                    <a href="/node/756.shtml">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>127</h6>
                                        <p>¥ 199.00</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/node/756.shtml">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>127</h6>
                                        <p>¥ 199.00</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/node/756.shtml">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>127</h6>
                                        <p>¥ 199.00</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/node/756.shtml">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>127</h6>
                                        <p>¥ 199.00</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/node/756.shtml">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>127</h6>
                                        <p>¥ 199.00</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/node/756.shtml">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>127</h6>
                                        <p>¥ 199.00</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/node/756.shtml">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>127</h6>
                                        <p>¥ 199.00</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="/node/756.shtml">
                                        <div className="course-list-img">
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                        </div>
                                        <h5>企业理财与公司金融综合服务业务</h5>
                                        <h6><i className="iconfont icon-user"></i>127</h6>
                                        <p>¥ 199.00</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="content-module4">
                        <h3 className="index-title">最新课程</h3>
                        <ul className="index-course container cl">
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/c2a5230ddbc0d95bfa3436530692df89.jpg" alt="" />
                                    </div>
                                    <h5>企业理财与公司金融综合服务业务</h5>
                                    <h6><i className="iconfont icon-user"></i>127</h6>
                                    <p>¥ 199.00</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="content-module5">
                        <h3 className="index-title">名师大咖</h3>
                        <ul className="index-teacher container cl">
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/159f0c367a6e2634bf9e17d3815cd6c1.jpg" alt="" />
                                    </div>
                                    <h5>王岳澎</h5>
                                    <h6>中国人民大学教授</h6>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/159f0c367a6e2634bf9e17d3815cd6c1.jpg" alt="" />
                                    </div>
                                    <h5>王岳澎</h5>
                                    <h6>中国人民大学教授</h6>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/159f0c367a6e2634bf9e17d3815cd6c1.jpg" alt="" />
                                    </div>
                                    <h5>王岳澎</h5>
                                    <h6>中国人民大学教授</h6>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/159f0c367a6e2634bf9e17d3815cd6c1.jpg" alt="" />
                                    </div>
                                    <h5>王岳澎</h5>
                                    <h6>中国人民大学教授</h6>
                                </a>
                            </li>
                            <li>
                                <a href="/node/756.shtml">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/159f0c367a6e2634bf9e17d3815cd6c1.jpg" alt="" />
                                    </div>
                                    <h5>王岳澎</h5>
                                    <h6>中国人民大学教授</h6>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Home);


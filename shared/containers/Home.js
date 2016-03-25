import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import CoursesAction from '../actions/CoursesAction';

let Home = React.createClass({
    statics: {
        // 初始加载数据
        fetchData: function({dispatch, params={}, location={}, apiClient}) {
            const coursesAction = new CoursesAction({ apiClient: apiClient });
            return Promise.all([
                dispatch( coursesAction.loadFreeCourses({limit: 5}) ), // 免费课程默认首页取5个
                dispatch( coursesAction.loadHotCourses({limit: 8}) ), // 热门课程默认首页取8个
                dispatch( coursesAction.loadLatestCourses({limit: 5}) ), // 最新课程默认首页取8个
            ]);
        }
    },

    componentDidMount: function() {
        const { freecourses, hotcourses, latestCourses, location, dispatch } = this.props;

        if ( freecourses.isFetching ||
                hotcourses.isFetching ||
                latestCourses.isFetching ) {
            Home.fetchData(this.props);
        }
    },

    /**
     * 渲染单个课程项
     */
    renderCourseItems: function(list) {
        return list.map((item, key) => {
            return  <li key={key}>
                        <a href={`/courses/${item.id}`}>
                            <div className="course-list-img">
                                <img src={item.course_picture} alt="" />
                            </div>
                            <h5>{item.course_name}</h5>
                            <h6><i className="iconfont icon-user"></i>{item.student_count}</h6>
                            <p>{ item.course_price == 0 ? "免费" : "¥ " + item.course_price }</p>
                        </a>
                    </li>
        });
    },

    render: function() {
        const { freecourses, hotcourses, latestCourses } = this.props;
        const freecourseslist = freecourses && freecourses.data && freecourses.data.list || [];
        const hotcourseslist = hotcourses && hotcourses.data && hotcourses.data.list || [];
        const latestCourseList = latestCourses && latestCourses.data && latestCourses.data.list || [];

        return (
            <div>
                <div className="banner">
                    <div className="container">
                        <div className="banner-top">
                            在这里学习全中国最好的金融课程
                        </div>
                        <div className="banner-center">
                            <Link to="classify" className="banner-all-course">查看全部课程</Link>
                        </div>
                        <div className="banner-bottom">
                            <Link to="/">财富管理</Link>
                            <Link to="/" className="curr">企业理财</Link>
                            <Link to="/">资产证券化</Link>
                            <Link to="/">互联网金融</Link>
                            <Link to="/">金融领导力</Link>
                            <Link to="/">学位项目</Link>
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
                        {freecourseslist.isFetching ?
                            <div className="loading">
                                <i className="iconfont icon-loading fa-spin"></i>
                            </div>
                            :
                            <div className="course-list">
                                { freecourseslist.error ?
                                    <p className="no-course">暂无课程</p>
                                    :
                                    <ul className="index-course container cl">
                                        {this.renderCourseItems(freecourseslist)}
                                    </ul>
                                }
                            </div>
                        }
                    </div>
                    <div className="content-module3">
                        <h3 className="index-title">最热课程</h3>
                        <div className="hot-course container cl">
                            <div className="fl hot-course-left">
                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/fb735a0af45e4588932bbd2495df2519.jpg" alt="" />
                            </div>
                            {hotcourseslist.isFetching ?
                                <div className="loading">
                                    <i className="iconfont icon-loading fa-spin"></i>
                                </div>
                                :
                                <div className="course-list fr">
                                    { hotcourseslist.error ?
                                        <p className="no-course">暂无课程</p>
                                        :
                                        <ul className="index-course fr" style={{ width: 958}}>
                                            {this.renderCourseItems(hotcourseslist)}
                                        </ul>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="content-module4">
                        <h3 className="index-title">最新课程</h3>
                        {latestCourses.isFetching ?
                            <div className="loading">
                                <i className="iconfont icon-loading fa-spin"></i>
                            </div>
                            :
                            <div className="course-list">
                                { latestCourseList.error ?
                                    <p className="no-course">暂无课程</p>
                                    :
                                    <ul className="index-course container cl">
                                        {this.renderCourseItems(latestCourseList)}
                                    </ul>
                                }
                            </div>
                        }
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
});


module.exports = connect( state => ({ freecourses: state.freecourses, hotcourses: state.hotcourses, latestCourses: state.latestCourses }) )(Home);


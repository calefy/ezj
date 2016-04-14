import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import CoursesAction from '../actions/CoursesAction';
import OtherAction from '../actions/OtherAction';
import { adsType } from '../libs/const';

let Home = React.createClass({
    statics: {
        // 初始加载数据
        fetchData: function({dispatch, params={}, location={}, apiClient}) {
            const coursesAction = new CoursesAction({ apiClient: apiClient });
            const otherAction = new OtherAction({ apiClient: apiClient });
            return Promise.all([
                dispatch( coursesAction.loadHotCourses({limit: 8}) ), // 热门课程默认首页取8个
                dispatch( coursesAction.loadFreeCourses({limit: 5}) ), // 免费课程默认首页取5个
                dispatch( otherAction.loadIndexAds() ), // 加载首页广告
            ]);
        }
    },

    componentDidMount: function() {
        const { courses_free, courses_hot, ads_index } = this.props;

        if ( courses_free.isFetching ||
                courses_hot.isFetching ||
                ads_index.isFetching) {
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
        const { courses_hot, courses_free, ads_index } = this.props;
        const freeList = courses_free.data && courses_free.data.list || [];
        const hotList = courses_hot.data && courses_hot.data.list || [];

        // 从广告数据中抽离热门广告与讲师
        let hotAd = {};
        let lecturers = [];
        (ads_index.data || []).forEach(item => {
            if (item.ad_type === adsType.CONTENT) {
                hotAd = item;
            } else if (item.ad_type === adsType.LECTURER) {
                lecturers.push(item);
            }
        });


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
                            <Link to="/">企业理财</Link>
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
                    <div className="content-module3">
                        <h3 className="index-title">大家都在学</h3>
                        <div className="hot-course container cl">
                            <div className="fl hot-course-left">
                                <a target="_blank" href={hotAd.action}><img src={hotAd.image} alt={hotAd.title} /></a>
                            </div>
                            {courses_hot.isFetching ?
                                <div className="loading">
                                    <i className="iconfont icon-loading fa-spin"></i>
                                </div>
                                :
                                <div className="course-list fr">
                                    { hotList.length ?
                                        <ul className="index-course fr" style={{ width: 958}}>
                                            {this.renderCourseItems(hotList)}
                                        </ul>
                                        :
                                        <p className="no-course">暂无热门课程</p>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="content-module2">
                        <h3 className="index-title">免费课程</h3>
                        {courses_free.isFetching ?
                            <div className="loading">
                                <i className="iconfont icon-loading fa-spin"></i>
                            </div>
                            :
                            <div className="course-list">
                                { freeList.length ?
                                    <ul className="index-course container cl">
                                        {this.renderCourseItems(freeList)}
                                    </ul>
                                    :
                                    <p className="no-course">暂无免费课程</p>
                                }
                            </div>
                        }
                    </div>
                    <div className="content-module5">
                        <h3 className="index-title">名师大咖</h3>
                        {ads_index.isFetching ?
                            <div className="loading">
                                <i className="iconfont icon-loading fa-spin"></i>
                            </div>
                            :
                            <div className="index-teacher container">
                                {lecturers.length ?
                                    <ul className="cl">
                                        {lecturers.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link to={item.action}>
                                                        <div className="course-list-img">
                                                            <img src={item.image} alt={item.lecture_name} />
                                                        </div>
                                                        <h5>{item.lecture_name}</h5>
                                                        <p>{item.lecture_title}</p>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    :
                                    <p className="no-course">暂无名师大咖信息</p>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = connect( state => ({
    courses_hot: state.courses_hot,
    courses_free: state.courses_free,
    ads_index: state.ads_index,
}) )(Home);


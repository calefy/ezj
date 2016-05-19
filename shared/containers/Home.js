import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { adsType, baseCourseCategories } from '../libs/const';
import { image, avatar } from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';
import OtherAction from '../actions/OtherAction';

if (process.env.BROWSER) {
    require('css/index.css');
}
let Home = React.createClass({
    statics: {
        // 初始加载数据
        fetchData: function({dispatch, params={}, location={}, apiClient}) {
            const coursesAction = new CoursesAction({ apiClient: apiClient });
            const otherAction = new OtherAction({ apiClient: apiClient });
            return Promise.all([
                dispatch( coursesAction.loadCourseCategories() ), // 分类
                dispatch( coursesAction.loadHotCourses({limit: 8}) ), // 热门课程默认首页取8个
                dispatch( coursesAction.loadFreeCourses({limit: 5}) ), // 免费课程默认首页取5个
                dispatch( otherAction.loadIndexAds() ), // 加载首页广告
            ]);
        }
    },

    componentDidMount: function() {
        const { course_categories, courses_free, courses_hot, ads_index } = this.props;

        if ( course_categories.isFetching ||
                courses_free.isFetching ||
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
            return  <li key={key} className={ list.length == 8 ? (key+1)%4==0 ? "last-child" : null : (key+1)%5==0 ? "last-child" : null}>
                        <Link to={`/courses/${item.id}`} target="_blank">
                            <div className="course-list-img">
                                <img src={image(item.course_picture, 'nc')} alt="" />
                            </div>
                            <h5>{item.course_name}</h5>
                            <h6><i className="iconfont icon-user"></i>{item.student_count}</h6>
                            <p>{ item.course_price == 0 ? "免费" : "¥ " + item.course_price }</p>
                        </Link>
                    </li>
        });
    },

    render: function() {
        const { course_categories, courses_hot, courses_free, ads_index } = this.props;
        const freeList = courses_free.data && courses_free.data.list || [];
        const hotList = courses_hot.data && courses_hot.data.list || [];
        let categories = course_categories.data || [];
        categories = categories.slice(-4).concat(baseCourseCategories.slice(1));

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
            <div className="home">
                <div className="banner">
                    <div className="container">
                        <div className="banner-top">
                            在这里学习全中国最好的金融课程
                        </div>
                        <div className="banner-center">
                            <Link to="/courses" className="banner-all-course">查看全部课程</Link>
                        </div>
                        <div className="banner-bottom">
                            {categories.map((item, index) => {
                                return <Link to="/courses" query={{category: item.id}} key={index}>{item.name}</Link>
                            })}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="content-module1 wide">
                        <div className="container cl">
                            <Link to="/topic/cfc" title="" target="_blank" className="module module1">
                                <div className="module-icon">
                                    <i className="iconfont icon-module11"></i>
                                </div>
                                <h4>CFC</h4>
                                <div className="module-title">企业理财师（CFC）认证</div>
                                <p>一张通行国内、国际金融界的专业资质</p>
                            </Link>
                            <Link to="/courses" query={{category: 'competitive'}} title="" target="_blank" className="module module2">
                                <div className="module-icon">
                                    <i className="iconfont icon-daoshi"></i>
                                </div>
                                <h4>学位教育</h4>
                                <div className="module-title">紫荆-索菲亚 财富管理方向MBA</div>
                                <p>国内首家授予美国正式学位的在线MBA项目</p>
                            </Link>
                            <Link to="/topic/security" title="" target="_blank" className="module module3">
                                <div className="module-icon">
                                    <i className="iconfont icon-module31"></i>
                                </div>
                                <h4>公开课</h4>
                                <div className="module-title">《资产证券化创新》公开课</div>
                                <p>为资产证券化业务提供实践的操作指南</p>
                            </Link>
                        </div>
                    </div>
                    <div className="content-module3 wide">
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
                                        <p className="no-data">暂无热门课程</p>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    <div className="content-module2 wide">
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
                                    <p className="no-data">暂无免费课程</p>
                                }
                            </div>
                        }
                    </div>
                    <div className="content-module5 wide">
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
                                                <li key={index} className={ (index+1)%5==0 ? "last-child" : null }>
                                                    <Link to={item.action} target="_blank">
                                                        <div className="course-list-img">
                                                            <img src={image(item.image, 'll')} alt={item.lecture_name} />
                                                        </div>
                                                        <h5>{item.lecture_name}</h5>
                                                        <h6>{item.lecture_org + ' ' + item.lecture_title}</h6>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    :
                                    <p className="no-data">暂无名师大咖信息</p>
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
    course_categories: state.course_categories,
    courses_hot: state.courses_hot,
    courses_free: state.courses_free,
    ads_index: state.ads_index,
}) )(Home);


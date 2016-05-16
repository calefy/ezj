import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { baseCourseCategories } from '../libs/const';
import CoursesAction from '../actions/CoursesAction';
import OperateAction from '../actions/OperateAction';

import CourseCategoryDetail from '../components/CourseCategoryDetail.jsx';
import CourseSearch from '../components/CourseSearch.jsx';
import CourseCompetitive from '../components/CourseCompetitive.jsx';
import CourseFinancial from '../components/CourseFinancial.jsx';

if (process.env.BROWSER) {
    require('css/classify.css');
}

// 是否某个通过ID获取的分类
function isCategory(location) {
    return /\d+/.test(location.query.category);
}
// 是否是特别定义的分类
function isSpecial(location) {
    return location.query.category && !isCategory(location);
}
// 是否是搜索
function isSearch(location) {
    return !!location.query.q;
}

class Classify extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const coursesAction = new CoursesAction({ apiClient: apiClient });
        let arr = [
            dispatch( coursesAction.loadCourseCategories() ) // 所有分类信息
        ];
        // 如果请求的是具体的某个分类，则加载分类详情
        if (isCategory(location)) {
            arr = arr.concat([
                dispatch( coursesAction.loadCourseCategory(location.query.category) ),
                dispatch( coursesAction.loadCourseCategoryCourses(location.query.category) )
            ]);
        }
        // 如果请求的是搜索，则加载搜索信息
        else if (isSearch(location)) {
            arr = arr.concat([
                dispatch( coursesAction.loadSearch( Object.assign({'per-page': CourseSearch.PAGE_SIZE}, location.query) ) )
            ]);
        }
        return Promise.all( arr );
    }

    componentDidMount() {
        const { course_categories, location } = this.props;
        if ( course_categories.isFetching ||
                // 单一分类时，需要检查是否已有数据与请求categoryId一致
                (isCategory(location) && (this.props.course_category.isFetching || this.props.course_category.data.id != location.query.category)) ||
                // 搜索时，要检查已有数据搜索key是否与当前请求关键字一致
                (isSearch(location) && (this.props.courses_search.isFetching || (this.props.courses_search._req && (this.props.courses_search._req.keyword != location.query.q || this.props.courses_search._req.page != location.query.page))))
            ) {
            Classify.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        let prevPath = this.props.location.pathname + this.props.location.search;
        let nextPath = nextProps.location.pathname + nextProps.location.search;
        if (prevPath !== nextPath) {
            const coursesAction = new CoursesAction();
            // url变更后加载分类数据
            if (isCategory(nextProps.location)) {
                nextProps.dispatch( coursesAction.loadCourseCategory(nextProps.location.query.category) );
                nextProps.dispatch( coursesAction.loadCourseCategoryCourses(nextProps.location.query.category) );
            }
            // url变更后加载搜索数据
            else if (isSearch(nextProps.location)) {
                nextProps.dispatch( coursesAction.loadSearch(Object.assign({'per-page': CourseSearch.PAGE_SIZE}, nextProps.location.query)) );
            }
        }
    }

    // 购买课程
    handleBuyCourse = e => {
        // 检查登录
        if (!this.props.user.data) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;

            let operateAction = new OperateAction();
            this.props.dispatch(operateAction.openLoginDialog());
        }
    };

    render() {
        const { course_categories, location } = this.props;
        const categories = course_categories.data || [];
        const query = location.query;

        return (
            <div className={`content classify${isCategory(location) || isSearch(location) || isSpecial(location) ? '-category' : ''}`}>
                <div className="container cl">
                    <div className="classify-left fl">
                        {baseCourseCategories.map((item, key) => {
                            if (key === 0) {
                                return (
                                    <div key={key}>
                                        <h4>{item.name}</h4>
                                        {categories.map((c, i) => {
                                            return <Link to="/courses" query={{category: c.id}} key={i} className={query.category == c.id ? 'cur' : null}>{c.name}<i className="iconfont icon-arrow fr"></i></Link>
                                        })}
                                    </div>
                                );
                            } else {
                                return <h5 key={key}><Link to="/courses" query={{category: item.id}} className={query.category == item.id ? 'cur' : null}>{item.name}<i className="iconfont icon-arrow fr"></i></Link></h5>
                            }
                        })}
                    </div>
                    <div className="classify-right fl">
                        {!isCategory(location) && !isSearch(location) && !isSpecial(location) ?
                            <p className="classify-course">
                                查看关于
                                <Link to="/courses" query={{category: 784}}>互联网金融商业模式</Link> <br/>
                                <Link to="/courses" query={{category: 785}}>资产证券化</Link> &emsp;
                                <Link to="/courses" query={{category: 662}}>企业理财</Link>
                                的精品课程
                            </p>
                            : null
                        }
                        {isSpecial(location) && location.query.category === 'competitive' ?
                            <CourseCompetitive />
                            : null
                        }
                        {isSpecial(location) && location.query.category === 'financial' ?
                            <CourseFinancial/>
                            : null
                        }
                        {!isCategory(location) ? null :
                            this.props.course_category.isFetching || this.props.category_courses.isFetching ?
                                <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                                :
                                <CourseCategoryDetail
                                    category={this.props.course_category.data}
                                    courses={this.props.category_courses.data.list}
                                    handleBuyCourse={this.handleBuyCourse}
                                />
                        }
                        {!isSearch(location) ? null :
                            this.props.courses_search.isFetching ?
                                <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                                :
                                this.props.courses_search.data ?
                                    <CourseSearch
                                        courses={this.props.courses_search.data.list}
                                        total = {this.props.courses_search.data.total}
                                        location = {location}
                                    />
                                    : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({
    user: state.user,
    course_category: state.course_category,
    course_categories: state.course_categories,
    courses_search: state.courses_search,
    category_courses: state.category_courses,
}) )(Classify);


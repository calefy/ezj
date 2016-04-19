import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import CoursesAction from '../../actions/CoursesAction';
import Pagination from '../../components/Pagination.jsx';

class All extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadMyCourses(location.query) ),
        ]);
    }

    componentDidMount() {
        const { courses_mine, location } = this.props;
        if (courses_mine.isFetching ||
                (courses_mine._req && (courses_mine._req.type != location.query.type || courses_mine._req.page != location.query.page))) {
            All.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.search != nextProps.location.search) {
            All.fetchData(nextProps);
        }
    }

    render() {
        const {courses_mine, location} = this.props;
        let query = location.query;
        let courses = courses_mine.data && courses_mine.data.list || [];

        return (
            <div className="study-center-right shadow bg-white fr">
                <ul className="nav-tabs cl">
                    <li className={!query.type ? 'current' : ''}>
                        <Link to="/study/all">全部课程</Link>
                    </li>
                    <li className={query.type === 'learning-list' ? 'current' : ''}>
                        <Link to="/study/all" query={{type: 'learning-list'}}>只看学习</Link>
                    </li>
                    <li className={query.type === 'purchased-list' ? 'current' : ''}>
                        <Link to="/study/all" query={{type: 'purchased-list'}}>只看购买</Link>
                    </li>
                </ul>
                <ul className="my-all-courses">
                    <li className="cl">
                        <div className="my-all-courses-left fl">
                            <p>学习</p>
                            <em>今天 22:15</em>
                        </div>
                        <div className="my-all-courses-right fl">
                            <div>
                                <h4 className="cl">
                                    <Link to="" className="fl">财富管理市场概况与发展趋势</Link>
                                    <em className="fr">已学习</em>
                                </h4>
                                <p>
                                    1.4高净值及超高净值人群的分布和特点（上）
                                    <Link to="" className="fr">继续学习</Link>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="cl">
                        <div className="my-all-courses-left fl">
                            <p>购买</p>
                            <em>今天 22:15</em>
                        </div>
                        <div className="my-all-courses-right fl">
                            <div>
                                <h4 className="cl">
                                    <Link to="" className="fl">财富管理市场概况与发展趋势</Link>
                                </h4>
                                <p>
                                    分类：财富管理／基础理论／
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="cl my-all-course-bag">
                        <div className="my-all-courses-left fl">
                            <p>购买</p>
                            <em>今天 22:15</em>
                        </div>
                        <div className="my-all-courses-right fl">
                            <div>
                                <h4 className="cl">企业战略管理课程包</h4>
                                <p>
                                    战略概览方法与介绍战略概览方法与
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                                <p>
                                    战略概览方法与介绍战略概览方法与
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                                <p>
                                    战略概览方法与介绍战略概览方法与
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                                <p>
                                    战略概览方法与介绍战略概览方法与
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

module.exports = connect( state => ({
    courses_mine : state.courses_mine,
}) )(All);

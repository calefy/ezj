import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import { getRequestTypes } from '../../libs/utils';
import CoursesAction from '../../actions/CoursesAction';
import Pagination from '../../components/Pagination.jsx';

class Collect extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadMyCollectedCourses(location.query) ),
        ]);
    }

    state = { canceledMap: {} };
    componentDidMount() {
        const { courses_mine_collected, location } = this.props;
        if (courses_mine_collected.isFetching ||
                (courses_mine_collected._req && courses_mine_collected._req.page != location.query.page)) {
            Collect.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.search != nextProps.location.search) {
            Collect.fetchData(nextProps);
        }
        // 监听取消收藏的返回
        const cancelType = getRequestTypes(CoursesAction.CANCEL_COLLECT_COURSE);
        if (nextProps.action && nextProps.action.type === cancelType.success) {
            let map = Object.assign({}, this.state.canceledMap);
            map[nextProps.action._req.courseId] = true;
            this.setState({ canceledMap: map });
        }
    }

    // 取消收藏
    onCancelCollect = e => {
        e.preventDefault();
        e.nativeEvent.returnValue = false;
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.cancelCollect(e.currentTarget.getAttribute('data-id')) );
    };

    render() {
        const { courses_mine_collected } = this.props;
        let courses = courses_mine_collected.data && courses_mine_collected.data.list || [];

        return (
            <div className="study-center-right shadow bg-white fr">
                <div className="study-collect">
                    <h4 className="h4-title">我收藏的课程</h4>
                    {courses_mine_collected.isFetching ?
                        <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                        :
                        courses.length ?
                            <ul className="index-course cl" style={{ width: 884, margin: "20px auto"}}>
                                {courses.map((item, index) => {
                                    if (this.state.canceledMap[item.id]) return null;

                                    return (
                                        <li key={index}>
                                            <Link to={`/courses/${item.id}`}>
                                                <div className="course-list-img">
                                                    <img src={item.picture} alt="" />
                                                </div>
                                                <h5>{item.title}</h5>
                                                <h6>
                                                    <i className="iconfont icon-user"></i>{item.joined_count}
                                                    {this.state.canceledMap[item.id] ? null :
                                                        <i className="iconfont icon-heart fr" onClick={this.onCancelCollect} data-id={item.id}></i>
                                                    }
                                                </h6>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            :
                            <p className="no-data">暂无收藏课程</p>
                    }

                    <Pagination
                        total={courses_mine_collected.data && courses_mine_collected.data.total || 0}
                        page = {(this.props.location.query.page || 1) - 0}
                        link = {this.props.location.pathname}
                        search = {this.props.location.search}
                    />
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    action: state.action,
    courses_mine_collected : state.courses_mine_collected,
}) )(Collect);

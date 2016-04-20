import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { toTimeString, avatar } from '../../libs/utils';

import CoursesAction from '../../actions/CoursesAction';

class Course extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadCourseDetail(params.courseId) ), // 课程详情,包含讲师
            dispatch( courseAction.loadCourseChapters(params.courseId) ), // 课程章节
        ]);
    }

    componentDidMount() {
        const { course, course_private, params } = this.props;
        if (course.isFetching ||// course_private.isFetching ||
                (course.data && course.data.id != params.courseId)) {
            Course.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.courseId != nextProps.params.courseId) {
            const courseAction = new CoursesAction();
            nextProps.dispatch( courseAction.loadCourseDetail(nextProps.params.courseId) ); // 课程详情,包含讲师
            nextProps.dispatch( courseAction.loadCourseChapters(nextProps.params.courseId) ); // 课程章节
        }
    }

    render() {
        let course = this.props.course.data || {};
        let chapters = this.props.chapters.data && this.props.chapters.data.list || [];

        return (
            <div className="course-bottom-info">
                <div className="course-bottom-about">
                    <h4 className="course-title">课程简介</h4>
                    <div dangerouslySetInnerHTML={{__html: course.course_outlines}}></div>
                    <div>
                        {chapters.map((item, index) => {
                            let isRoot = item.rgt - item.lft > 1;
                            return isRoot ? <p key={index}>{item.chapter_name}</p> : null;
                        })}
                    </div>
                </div>
                <div className="course-bottom-recommend">
                    <h4 className="course-title">推荐受众</h4>
                    <div dangerouslySetInnerHTML={{__html: course.recommends_audience}}>

                    </div>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({
    course: state.course,
    course_private: state.course_private,
    chapters: state.chapters,
    students: state.students,
    examination: state.examination,
}) )(Course);

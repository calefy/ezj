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
            dispatch( courseAction.loadCoursePrivate(params.courseId) ), // 课程私密信息
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
            nextProps.dispatch( courseAction.loadCoursePrivate(nextProps.params.courseId) ); // 课程私密信息
            nextProps.dispatch( courseAction.loadCourseChapters(nextProps.params.courseId) ); // 课程章节
        }
    }

    render() {
        let priv = this.props.course_private.data || {};
        let progress = priv.chapters_progress || {};
        let chapters = this.props.chapters.data && this.props.chapters.data.list || [];

        return (
            <div className="content course-chapter">
                <dl>
                {chapters.map((item, index) => {
                    let isRoot = item.rgt - item.lft > 1;
                    // let schedule = progress[item.id].chapter_progress;
                    let inner = <div 
                        key ={index}
                        className={`cl ${ progress[item.id] ? 
                            progress[item.id].chapter_progress > 0 && progress[item.id].chapter_progress < 50 ?
                            'one-four' :
                            progress[item.id].chapter_progress >= 50 && progress[item.id].chapter_progress < 70 ? 
                            'two-four' : 
                            progress[item.id].chapter_progress >= 70 && progress[item.id].chapter_progress < 100 ?
                            'three-four' : 'four-four'
                            : 
                            '' }`}>
                        <i className="icon icon-pro"></i>
                        {item.chapter_name}
                        <span className="course-audition">{item.free_trial_status ? <Link to={`/courses/${item.course_id}/chapters/${item.id}`}>[试听]</Link> : ''}</span>
                        {isRoot ? '' : <span className="fr course-time"><i className="iconfont icon-time"></i>{toTimeString(item.video.video_duration, 'm:s')}</span>}
                    </div>;
                    return isRoot ?
                        <dt key={index}>{inner}</dt>
                        :
                        <dd key={index}>{inner}</dd>
                })}
                </dl>
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


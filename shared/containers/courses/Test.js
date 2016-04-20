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
            dispatch( courseAction.loadCoursePrivate(params.courseId) ), // 课程私密信息
            dispatch( courseAction.loadCourseChapters(params.courseId) ), // 课程章节
            dispatch( courseAction.loadCourseStudents(params.courseId) ), // 课程学员
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
            nextProps.dispatch( courseAction.loadCoursePrivate(nextProps.params.courseId) ); // 课程私密信息
            nextProps.dispatch( courseAction.loadCourseChapters(nextProps.params.courseId) ); // 课程章节
            nextProps.dispatch( courseAction.loadCourseStudents(nextProps.params.courseId) );
        }
    }

    /**
     * 点击显示测验内容
     */
    onClickExam = e => {
        const examId = this.props.course.data.course_examination_id;
        console.log(examId);
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.loadCourseExamination(examId) );
    };

    onCollect = e => {
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.collect(this.props.params.courseId) );
    };
    onCancelCollect = e => {
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.cancelCollect(this.props.params.courseId) );
    };

    render() {
        let course = this.props.course.data || {};
        let priv = this.props.course_private.data || {};
        let progress = priv.chapters_progress || {};
        let chapters = this.props.chapters.data && this.props.chapters.data.list || [];
        let students = this.props.students.data || [];
        let examination = this.props.examination.data || {};
        let questions = examination.questions || [];
        examination = examination.examination || {};
        console.log(examination);
        // 计算总时长
        let tminute = course.duration / 60;
        let thour = Math.floor(tminute / 60);
        tminute = Math.ceil(tminute) % 60;
        let timeStr = (thour ? thour + '小时' : '') + tminute + '分';

        return (
            <div className="content course-test">
                <h2>【测验】{course.course_examination_id > 0 ? <button type="button" onClick={this.onClickExam}>点击展示</button> : '无'}</h2>
                {course.course_examination_id <= 0 ?
                    null :
                    <div>
                        <h4>{examination.examination_title}</h4>
                        <dl>
                            {questions.map((item, index) => {
                                let q = item.question;
                                let os = item.options;
                                return [
                                    <dt key={index}>
                                        {index + 1}.
                                        <div className="dib vat" dangerouslySetInnerHTML={{__html: q.examination_question_content}} />
                                    </dt>,
                                    os.map((o, i) => {
                                        return <dd key={i}>{String.fromCharCode(65 + i)}. {o.option_text}</dd>
                                    })
                                ];
                            })}
                        </dl>
                    </div>
                }
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


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { toTimeString, avatar } from '../libs/utils';

import CoursesAction from '../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/course.css')
}

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
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.loadCourseExamination(examId) );
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

        // 计算总时长
        let tminute = course.duration / 60;
        let thour = Math.floor(tminute / 60);
        tminute = Math.ceil(tminute) % 60;
        let timeStr = (thour ? thour + '小时' : '') + tminute + '分';

        return (
            <div className="content course-detail">
                <div className="container">
                    <div className="course-top bg-white cl" style={{ marginTop: 20 }}>
                        <div className="course-img fl">
                            <img src={course.course_picture} />{course.course_picture}
                        </div>
                        <div className="course-info">
                            <h1>{course.course_name}</h1>
                            <p>
                                {course.category_info.map((item, index) => {
                                    return  <span key={index}>
                                                {item.id == course.course_category_id ?
                                                    '/' + item.name :
                                                    <Link to="/courses" query={{category: item.id}}>{item.name}</Link>
                                                }
                                            </span>
                                })}
                            </p>
                            <p>
                                <em><i className="iconfont icon-clock"></i>{timeStr}</em>&emsp;<em><i className="iconfont icon-user"></i>{course.student_count}人</em>&emsp;<em><i className="iconfont icon-share"></i>分享</em>
                            </p>
                            <p className="course-price">&yen;{course.course_price}</p>
                        </div>
                    </div>
                </div>
                <p>
                    是否已收藏: {priv.is_collected ? 'Yes' : 'No'},
                    是否已购买: {priv.is_purchased ? 'Yes' : 'No'},
                    是否已过期: {priv.is_expired ? 'Yes' : 'No'} (过期时间 {priv.expiring_date}),
                    是否已学习: {priv.is_learned ? 'Yes' : 'No'} (学习进度 {priv.progress}%)
                </p>
                <p>预计开课时间：{course.scheduled_open_date}</p>

                <p>------</p>

                <h2>【课程简介】</h2>
                <div dangerouslySetInnerHTML={{__html: course.course_outlines}}></div>
                <div>
                    {chapters.map((item, index) => {
                        let isRoot = item.rgt - item.lft > 1;
                        return isRoot ? <p key={index}>{item.chapter_name}</p> : null;
                    })}
                </div>

                <p>------</p>

                <h3>【推荐受众】</h3>
                <p>{course.recommends_audience}</p>

                <p>------</p>

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


                <p>------</p>

                <h2>【讲师】</h2>
                {course.lecturers.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>
                                <Link to={`/lecturers/${item.id}`}>
                                    <img src={avatar(item.lecturer_avatar)} alt="" width="80"/>
                                    {item.lecturer_name}
                                    {item.lecturer_org} {item.lecturer_title}
                                </Link>
                            </p>
                            <div dangerouslySetInnerHTML={{__html: item.lecturer_introduction}}></div>
                        </div>
                    );
                })}

                <p>------</p>

                <h3>【学员】({course.student_count})</h3>
                <div>
                {students.map((item, index) => {
                    return (
                        <p key={index}><Link to={`/students/${item.student_id}`}><img src={avatar(item.avatar)} alt="" height="50"/> {item.nickname}</Link></p>
                    );
                })}
                </div>

                <p>------</p>

                <h3>【章节】</h3>
                <dl>
                {chapters.map((item, index) => {
                    let isRoot = item.rgt - item.lft > 1;
                    let inner = <p>
                        {item.chapter_name}
                        {item.free_trial_status ? '[试听]' : ''}
                        {isRoot ? '' : `时长: ${toTimeString(item.video.video_duration, 'm:s')}`}
                        {isRoot ? '' : progress[item.id] ? '学习进度:' + progress[item.id].chapter_progress + '%' : ''}
                    </p>;
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


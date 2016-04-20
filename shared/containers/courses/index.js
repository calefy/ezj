import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { toTimeString, avatar } from '../../libs/utils';

import CoursesAction from '../../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/course.css')
}

class Course extends Component {
    static menus = [
        { path: 'introduce', name: '介绍' },
        { path: 'content', name: '内容' },
        { path: 'test', name: '测验' }
    ];
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

    onCollect = e => {
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.collect(this.props.params.courseId) );
    };
    onCancelCollect = e => {
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.cancelCollect(this.props.params.courseId) );
    };

    render() {
        const { menus } = Course;
        const locationPath = this.props.location.pathname;

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
                    <div className="course-top course-shadow bg-white cl" style={{ marginTop: 20 }}>
                        <div className="course-img fl">
                            <p>预计开课时间{course.scheduled_open_date}</p>
                            <img src={course.course_picture} />{course.course_picture}
                        </div>
                        <div className="course-top-info">
                            <p className="course-classify">
                                {course.category_info.map((item, index) => {
                                    return  <span key={index}>
                                                {item.id == course.course_category_id ?
                                                    '/' + item.name :
                                                    <Link to="/courses" query={{category: item.id}}>{item.name}</Link>
                                                }
                                            </span>
                                })}
                            </p>
                            <h1>{course.course_name}</h1>
                            <p className="course-status">
                                <em><i className="iconfont icon-clock"></i>{timeStr}</em><em><i className="iconfont icon-user"></i>{course.student_count}人</em><em><i className="iconfont icon-share"></i>分享</em>
                            </p>
                            <p className="course-price">&yen;{course.course_price}</p>
                            <p className="course-state">付款后90天内有效/课程已到期，请续费/支付待确认</p>
                            <div className="course-buy cl">
                                <button type="btn" className="btn fl">刷新</button>
                                <button type="btn" className="btn fl">立即购买</button>
                                {priv.is_collected ?
                                    <button type="btn" className="fl course-collected" onClick={this.onCancelCollect}><i className="iconfont icon-heart"></i>取消收藏</button>
                                    :
                                    <button type="btn" className="fl course-collect" onClick={this.onCollect}><i className="iconfont icon-heart"></i>收藏</button>
                                }
                            </div>
                            <p>
                                是否已收藏: {priv.is_collected ? 'Yes' : 'No'},
                                是否已购买: {priv.is_purchased ? 'Yes' : 'No'},
                                是否已过期: {priv.is_expired ? 'Yes' : 'No'} (过期时间 {priv.expiring_date}),
                                是否已学习: {priv.is_learned ? 'Yes' : 'No'} (学习进度 {priv.progress}%)
                            </p>
                        </div>
                    </div>
                    <div className="course-bottom cl">
                        <div className="course-bottom-left course-shadow fl bg-white">
                            <ul className="nav-tabs course-tabs cl">
                                {menus.map( (item, index) => {
                                    return  <li className={locationPath.indexOf(item.path) >-1 ? 'current' : null} key={index}>
                                                <Link to={`/courses/${course.id}/${item.path}`}>{item.name}</Link>
                                            </li>
                                })}
                            </ul>
                            {this.props.children}
                        </div>
                        <div className="course-bottom-right fr">
                            <div className="course-bottom-teacher course-shadow bg-white">
                                <h4 className="course-title">课程讲师</h4>
                                {course.lecturers.map((item, index) => {
                                    return (
                                        <dl key={index}>
                                            <dt>
                                                <Link to={`/lecturers/${item.id}`} className="cl">
                                                    <img src={avatar(item.lecturer_avatar)} alt="" width="68" className="fl"/>
                                                    {item.lecturer_name}
                                                    {item.lecturer_org} {item.lecturer_title}
                                                </Link>
                                            </dt>
                                            <dd dangerouslySetInnerHTML={{__html: item.lecturer_introduction}}></dd>
                                        </dl>
                                    );
                                })}
                            </div>
                            <div className="course-bottom-user course-shadow bg-white">
                                <h4 className="course-title">117人参加该课程<Link to="" className="fr">换一换</Link></h4>
                                <div className="course-user-list cl">
                                    {students.map((item, index) => {
                                        return (
                                            <div key={index}>

                                                <Link key={index} to={`/students/${item.student_id}`}>
                                                    <img src={avatar(item.avatar)} alt="" width="50" height="50"/>
                                                </Link>
                                                <div>
                                                    <i></i>
                                                    <img src={avatar(item.avatar)} alt="" width="50" height="50" /><p>{item.nickname}</p>
                                                </div>
                                            </div>
                                        );
                                    })} 
                                </div>
                                
                            </div>
                        </div>
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

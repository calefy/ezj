import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { payType } from '../../libs/const';
import { toTimeString, avatar, getRequestTypes } from '../../libs/utils';

import OperateAction from '../../actions/OperateAction';
import CommerceAction from '../../actions/CommerceAction';
import CoursesAction from '../../actions/CoursesAction';
import CourseExam from '../../components/CourseExam.jsx';
import Dialog from '../../components/Dialog.jsx';

if (process.env.BROWSER) {
    require('css/course.css')
}

class Course extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadCourseDetail(params.courseId) ), // 课程详情,包含讲师
                // node服务器端获取不到url中的hash，因此无法用在这里识别exam; 先暴力获取exam
                //.then(res => {
                //    // 如果当前要显示测验，并且课程有测验，则加载测验信息
                //    let examId = res.data && res.data.course_examination_id;
                //    if (/*location.hash === '#exam' &&*/ examId && examId !== '0') {
                //        return [
                //            dispatch( courseAction.loadExamination(res.data.course_examination_id) ),
                //            dispatch( courseAction.loadCourseSheet(res.data.id) ),
                //        ];
                //    }
                //    return res;
                //}),
            dispatch( courseAction.loadCoursePrivate(params.courseId) ), // 课程私密信息
            dispatch( courseAction.loadCourseChapters(params.courseId) ), // 课程章节
            dispatch( courseAction.loadCourseStudents(params.courseId) ), // 课程学员
        ]);
    }

    state = {
        isShowTipBuy: false, // 是否显示提示需要购买框
    };

    componentDidMount() {
        const { course, course_sheet, params } = this.props;
        // 因课程sheet不会在其他页面出现，因此用该变量与课程标识是否该课程的数据完整
        // TODO: 判断加载数据应该逐条判断，以防止其他页面部分数据替换问题
        if (course.isFetching ||
                (course.data && course.data.id != params.courseId)) {
            Course.fetchData(this.props);
            return;
        }

        // 判断是否需要展示测验
        this.loadExamData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        // courseID变化，所有相关数据重新加载
        if (this.props.params.courseId != nextProps.params.courseId) {
            Course.fetchData(nextProps);
            return;
        }

        this.loadExamData(nextProps);
    }

    loadExamData = (props) => {
        // 切换到测验，如果数据不是当前课程的，需要重新加载测验数据
        if (props.location.hash === '#exam') {
            let exam = props.examination;
            let sheet = props.course_sheet;
            let eid = props.course.data && props.course.data.course_examination_id;
            eid = eid && eid !== '0' ? eid : '';

            const courseAction = new CoursesAction();
            if (!exam._req || (eid && exam._req.examId != eid)) {
                props.dispatch( courseAction.loadExamination(eid) );
            }
            if (!sheet._req || sheet._req.courseId != props.params.courseId) {
                props.dispatch( courseAction.loadCourseSheet(props.params.courseId) );
            }
        }
    };

    // 收藏
    onCollect = e => {
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.collect(this.props.params.courseId) );
    };
    // 取消收藏
    onCancelCollect = e => {
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.cancelCollect(this.props.params.courseId) );
    };

    // 学员列表换一换
    onChangeStudents = e => {
        e.preventDefault();
        const { students, course } = this.props;
        if (!students.data || !course.data) return;

        let page = students._req.page || 1;
        let total = course.data.student_count || 0;
        let totalPage = Math.ceil(total / 9); // 每页9个
        page = (page+totalPage) % totalPage + 1;

        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.loadCourseStudents(this.props.params.courseId, { page: page }) );
    };

    onStudentHover = e => {
        let key = e.currentTarget.getAttribute('data-key');
        this.refs['student_' + key].style.display = 'block';
    };
    onStudentLeave = e => {
        let key = e.currentTarget.getAttribute('data-key');
        this.refs['student_' + key].style.display = 'none';
    };

    // 点击章节，跳转到视频播放
    onToVideo = e => {
        let course = this.props.course.data || {};
        let priv = this.props.course_private.data || {};
        // 需要购买的课程，要判断购买状态
        if (course.course_price != 0 && (!priv.is_purchased || priv.is_expired)) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;
            this.setState({ isShowTipBuy: true });
        }
    };

    // 关闭提示购买框
    onCloseTipBuy = e => {
        e.preventDefault();
        this.setState({ isShowTipBuy: false });
    };

    // 点击立即购买时，
    // - 如果未登录，弹出登录框
    // - 如果是免费课程，直接支付
    onClickBuy = e => {
        // 检测登录状态
        if (!this.props.user.data) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;

            let operateAction = new OperateAction();
            this.props.dispatch(operateAction.openLoginDialog());
        }

        // 判断免费课程
        let course = this.props.course.data || {};
        if (course.course_price <= 0) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;

            const commerceAction = new CommerceAction();
            this.props.dispatch(commerceAction.pay({
                items: course.id,
                item_type: payType.COURSE, // 购买类型
                payment_method: 10, // 紫荆币支付
            }));
        }
    };

    handleLoadSheetAnswer = sheetId => {
        const courseAction = new CoursesAction();
        this.props.dispatch(courseAction.loadSheet(sheetId));
    };
    handleExamSubmit = model => {
        const courseAction = new CoursesAction();
        this.props.dispatch(courseAction.submitSheet(model));
    };

    render() {
        const { menus } = Course;
        const locationPath = this.props.location.pathname;

        let course = this.props.course.data || {};
        let priv = this.props.course_private.data || {};
        let progress = priv.chapters_progress || {};
        let chapters = this.props.chapters.data && this.props.chapters.data.list || [];
        let students = this.props.students.data || [];
        let hasExam = course.course_examination_id;
        hasExam = hasExam && hasExam !== '0';
        let hash = this.props.location.hash || '#intro'; // 如果没有课程测验，则仅显示intro
        if (hash === '#exam' && (!hasExam || !priv.is_purchased)) {
            hash = '#intro';
        }

        // 计算总时长
        let tminute = course.duration / 60;
        let thour = Math.floor(tminute / 60);
        tminute = Math.ceil(tminute) % 60;
        let timeStr = (thour ? thour + '小时' : '') + tminute + '分';

        // 如果购买了,又没有学习，需要获取第一个章节ID
        let firstChapterId;
        if (priv.is_purchased && priv.is_learned) {
            for (let i=0,len=chapters.length; i < len; i++) {
                if (chapters[i].rgt - chapters[i].lft === 1) {
                    firstChapterId = chapters[i].id;
                    break;
                }
            }
        }


        return (
            <div className="content course-detail">
                <div className="container">
                    <div className="course-top course-shadow bg-white cl" style={{ marginTop: 20 }}>
                        <div className="course-img fl">
                            {course.course_open_status ?
                                null :
                                <p>预计开课时间{course.scheduled_open_date}</p>
                            }
                            <img src={course.course_picture} alt="" />
                        </div>
                        <div className="course-top-info">
                            <p className="course-classify">
                                {(course.category_info || []).map((item, index) => {
                                    return  <span key={index}>
                                                {index === 0 ? // 仅一级分类可点击
                                                    <Link to="/courses" query={{category: item.id}}>{item.name}</Link>
                                                    :
                                                    '/' + item.name
                                                }
                                            </span>
                                })}
                            </p>
                            <h1>{course.course_name}</h1>
                            <p className="course-status">
                                <em><i className="iconfont icon-clock"></i>{timeStr}</em>
                                <em><i className="iconfont icon-user"></i>{course.student_count}人</em>
                                <em className="hide"><i className="iconfont icon-share"></i>分享</em>
                            </p>
                            <p className="course-price">{course.course_price > 0 ? '¥' + course.course_price : '免费'}</p>
                            <p className="course-state">
                                {priv.is_purchased ?
                                    (priv.is_expired ? '课程已到期，请续费' : '有效期至' + priv.expiring_date)
                                    :
                                    '付款后90天内有效'
                                }
                            </p>
                            <div className="course-buy cl">
                                {priv.is_purchased ?
                                    (priv.is_expired ?
                                        <Link to="/pay" query={{type: payType.COURSE, id: course.id}} className="btn fl">立即续费</Link>
                                        :
                                        (course.course_open_status ?
                                            (priv.is_learned ?
                                                <Link to={`/courses/${course.id}/chapters/${priv.latest_play && priv.latest_play.chapter_id}`} className="btn fl">继续学习</Link>
                                                :
                                                <Link to={`/courses/${course.id}/chapters/${firstChapterId}`} className="btn fl">立即学习</Link>
                                            )
                                            :
                                            <button className="btn disabled fl" type="button" disabled="disabled">暂未开课</button>
                                        )
                                    )
                                    :
                                    <Link to="/pay" query={{type: payType.COURSE, id: course.id}} className="btn fl" onClick={this.onClickBuy}>立即购买</Link>
                                }
                                {priv.is_collected ?
                                    <button type="btn" className="fl course-collected" onClick={this.onCancelCollect}><i className="iconfont icon-heart"></i>取消收藏</button>
                                    :
                                    <button type="btn" className="fl course-collect" onClick={this.onCollect}><i className="iconfont icon-heart"></i>收藏</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="course-bottom cl">
                        <div className="course-bottom-left course-shadow fl bg-white">
                            <ul className="nav-tabs course-tabs cl">
                                <li className={hash === '#intro' ? 'current' : ''}><Link to={'/courses/' + course.id} hash="#intro">介绍</Link></li>
                                <li className={hash === '#cont' ? 'current' : ''}><Link to={'/courses/' + course.id} hash="#cont">内容</Link></li>
                                {hasExam && priv.is_purchased ?
                                    <li className={hash === '#exam' ? 'current' : ''}><Link to={'/courses/' + course.id} hash="#exam">测验</Link></li>
                                    : null
                                }
                            </ul>
                            {hash === '#intro' ?
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
                                : hash === '#cont' ?
                                    <div className="content course-chapter">
                                        <dl>
                                        {chapters.map((item, index) => {
                                            let isRoot = item.rgt - item.lft > 1;
                                            let prog = progress[item.id] || {};
                                            prog = prog.chapter_progress || 0;
                                            if (prog) {
                                                prog = Math.max(Math.round(prog / 25) - 1, 0);
                                                prog = ['one', 'two', 'three', 'four'][prog] + '-four';
                                            } else {
                                                prog = '';
                                            }

                                            return isRoot ?
                                                <dt key={index}>
                                                    {item.chapter_name}
                                                </dt>
                                                :
                                                <dd key={index}>
                                                    <div className={`cl ${prog}`}>
                                                        <i className="icon icon-pro"></i>
                                                        <Link to={`/courses/${item.course_id}/chapters/${item.id}`} onClick={this.onToVideo}>{item.chapter_name}</Link>
                                                        <span className="course-audition">{item.free_trial_status ? <Link to={`/courses/${item.course_id}/chapters/${item.id}`}>[试听]</Link> : ''}</span>
                                                        <span className="fr course-time"><i className="iconfont icon-time"></i>{toTimeString(item.video && item.video.video_duration || 0, 'm:s')}</span>
                                                    </div>
                                                </dd>
                                        })}
                                        </dl>
                                    </div>
                                    : hash === '#exam' ?
                                        this.props.examination.isFetching || this.props.course_sheet.isFetching ?
                                            <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                                            :
                                            <CourseExam
                                                course = {course}
                                                examination = {this.props.examination.data || {}}
                                                sheet = {this.props.course_sheet.data || {}}
                                                action = {this.props.action}
                                                onLoadSheet = {this.handleLoadSheetAnswer}
                                                onSubmit = {this.handleExamSubmit}
                                            />
                                        : null
                            }

                        </div>
                        <div className="course-bottom-right fr">
                            <div className="course-bottom-teacher course-shadow bg-white">
                                <h4 className="course-title">课程讲师</h4>
                                {(course.lecturers || []).map((item, index) => {
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
                                <h4 className="course-title">{course.student_count}人参加该课程<a href="#" className="fr" onClick={this.onChangeStudents}>换一换</a></h4>
                                {this.props.students.isFetching ?
                                    <div className="loading" style={{display:'block'}}><i className="iconfont icon-loading fa-spin"></i></div>
                                    :
                                    <div className="course-user-list cl">
                                        {students.map((item, index) => {
                                            return (
                                                <div key={index} data-key={index} onMouseEnter={this.onStudentHover} onMouseLeave={this.onStudentLeave}>
                                                    <Link to={`/students/${item.student_id}`}>
                                                        <img src={avatar(item.avatar)} alt="" width="50" height="50"/>
                                                    </Link>
                                                    <div ref={`student_${index}`}>
                                                        <Link to={`/students/${item.student_id}`}>
                                                            <i></i>
                                                            <img src={avatar(item.avatar)} alt="" width="50" height="50" />
                                                            <p>{item.nickname}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <Dialog className="popover pop" open={this.state.isShowTipBuy} onRequestClose={this.onCloseTipBuy}>
                    <h4>提示</h4>
                    <div className="popover-info">
                        购买课程后才可继续观看，现在购买吗？
                    </div>
                    <div className="popover-btn">
                        <Link to="/pay" query={{ type: payType.COURSE, id: course.id }} className="btn">确认</Link>
                        <a href="#" className="btn disabled" onClick={this.onCloseTipBuy}>取消</a>
                    </div>
                </Dialog>
            </div>
        );
    }
}


module.exports = connect( state => ({
    action: state.action,
    user: state.user,
    course: state.course,
    course_private: state.course_private,
    course_sheet: state.course_sheet,
    chapters: state.chapters,
    students: state.students,
    examination: state.examination,
}) )(Course);


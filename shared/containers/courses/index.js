import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { payType } from '../../libs/const';
import { toTimeString, image, avatar, getRequestTypes } from '../../libs/utils';

import OperateAction from '../../actions/OperateAction';
import CommerceAction from '../../actions/CommerceAction';
import CoursesAction from '../../actions/CoursesAction';
import UserAction from '../../actions/UserAction';
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
        this.loadNeededData(this.props);

        // 判断是否需要展示测验
        this.loadExamData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.loadNeededData(nextProps);

        this.loadExamData(nextProps);

        // 1. 购买免费课程成功后，需要更新private
        // 2. 登录成功后，也要更新private
        let payType = getRequestTypes(CommerceAction.PAY);
        let userType = getRequestTypes(UserAction.USER); // 因登录成功后会发起loadAccount操作，这里无法拦截到登录成功的action，只能选择登录后立马执行的加载账号信息
        if (nextProps.action.type === payType.success ||
                nextProps.action.type === userType.request) {
            const courseAction = new CoursesAction();
            nextProps.dispatch( courseAction.loadCoursePrivate(nextProps.params.courseId) );
        }
    }
    loadNeededData = props => {
        const {dispatch, params, course, course_private, chapters, students} = props;
        const courseAction = new CoursesAction();
        const courseId = params.courseId;
        if (!course._req || course._req.courseId != courseId) {
            dispatch( courseAction.loadCourseDetail(courseId) );
        }
        if (!course_private._req || course_private._req.courseId != courseId) {
            dispatch( courseAction.loadCoursePrivate(courseId) );
        }
        if (!chapters._req || chapters._req.courseId != courseId) {
            dispatch( courseAction.loadCourseChapters(courseId) );
        }
        if (!students._req || students._req.courseId != courseId) {
            dispatch( courseAction.loadCourseStudents(courseId) );
        }
    };

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

    isLogin = () => {
        return this.props.user.data && this.props.user.data.uid;
    };
    showLoginDialog = () => {
        let operateAction = new OperateAction();
        this.props.dispatch(operateAction.openLoginDialog());
    };

    // 收藏
    onCollect = e => {
        // 检查登录状态
        if (!this.isLogin()) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;
            this.showLoginDialog();
            return;
        }
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
        // 检查登录
        if (!this.isLogin()) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;
            this.showLoginDialog();
            return;
        }

        // 需要购买的课程，要判断购买状态
        let course = this.props.course.data || {};
        let priv = this.props.course_private.data || {};
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

    // 课程包购买检查登录态
    onClickPackageBuy = e => {
        // 检测登录状态
        if (!this.isLogin()) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;
            this.showLoginDialog();
            return;
        }
    };

    // 点击立即购买时，
    // - 如果未登录，弹出登录框
    // - 如果是免费课程，直接支付
    onClickBuy = e => {
        // 检测登录状态
        if (!this.isLogin()) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;
            this.showLoginDialog();
            return;
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
        if (hash === '#exam' && (!hasExam || !priv.is_purchased || priv.is_expired)) {
            hash = '#intro';
        }

        // 计算总时长
        let tminute = course.duration / 60;
        let thour = Math.floor(tminute / 60);
        tminute = Math.ceil(tminute) % 60;
        let timeStr = (thour ? thour + '小时' : '') + tminute + '分';

        // 如果购买了,又没有学习，或者学完了重新学习，需要获取第一个章节ID
        let firstChapterId;
        for (let i=0,len=chapters.length; i < len; i++) {
            if (chapters[i].rgt - chapters[i].lft === 1) {
                firstChapterId = chapters[i].id;
                break;
            }
        }


        return (
            <div className="content course-detail">
                <div className="container">
                    <div className="course-top course-shadow bg-white cl" style={{ marginTop: 20 }}>
                        <div className="course-img fl">
                            {course.course_open_status ?
                                course.course_open_status === 2 ?
                                    <p>正在开课中</p>
                                    : null
                                :
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
                            <p className="course-price">{course.course_price > 0 ? '¥ ' + course.course_price : '免费'}</p>
                            <p className="course-state">
                                {priv.is_purchased ?
                                    (priv.is_expired ? '课程已到期，请续费' : priv.expiring_date ? '有效期至' + priv.expiring_date : '')
                                    :
                                    course.course_open_status === 1 ? '付款后90天内有效' : '付款后，完全上线之日起90天内有效'
                                }
                            </p>
                            <div className="course-buy cl">
                                {priv.is_purchased ?
                                    (priv.is_expired ?
                                        <Link to="/pay" query={{type: payType.COURSE, id: course.id}} className="btn fl">立即续费</Link>
                                        :
                                        (course.course_open_status ?
                                            (priv.is_learned ?
                                                priv.progress >= 100 ?
                                                    <Link to={`/courses/${course.id}/chapters/${firstChapterId}`} className="btn fl">重新学习</Link>
                                                    :
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
                                    <button type="btn" className="fl course-collected" onClick={this.onCancelCollect}><i className="iconfont icon-likefill fl"></i>已收藏</button>
                                    :
                                    <button type="btn" className="fl course-collect" onClick={this.onCollect}><i className="iconfont icon-like fl"></i>收藏</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="course-bottom cl">
                        <div className="course-bottom-left course-shadow fl bg-white">
                            <ul className="nav-tabs course-tabs cl">
                                <li className={hash === '#intro' ? 'current' : ''}><Link to={'/courses/' + course.id} hash="#intro">介绍</Link></li>
                                <li className={hash === '#cont' ? 'current' : ''}><Link to={'/courses/' + course.id} hash="#cont">内容</Link></li>
                                {hasExam && priv.is_purchased && !priv.is_expired ?
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
                            {course.related_packages && course.related_packages.length ?
                                <div className="course-bottom-relpackage course-shadow bg-white">
                                    <h4 className="course-title">所属课程包</h4>
                                    {course.related_packages.map((item, index) => {
                                        return (
                                            <div className="item" key={index}>
                                                <p>《{item.title}》</p>
                                                <div className="cl">
                                                    <span className="fl">共 {item.items.replace(/,$/, '').split(',').length} 门课</span>
                                                    <Link className="fr" to='/pay' query={{type: payType.PACKAGE, id: item.id}} onClick={this.onClickPackageBuy}>&yen; {item.price}元</Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                : null
                            }
                            <div className="course-bottom-teacher course-shadow bg-white">
                                <h4 className="course-title">课程讲师</h4>
                                {(course.lecturers || []).map((item, index) => {
                                    return (
                                        <dl key={index}>
                                            <dt>
                                                <Link to={`/lecturers/${item.id}`} className="cl">
                                                    <img src={image(item.lecturer_avatar, 'sl')} alt="" width="68" className="fl"/>
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
                                                        <img src={avatar(item.avatar, 'pipe2')} alt="" width="50" height="50"/>
                                                    </Link>
                                                    <div ref={`student_${index}`}>
                                                        <Link to={`/students/${item.student_id}`}>
                                                            <i></i>
                                                            <img src={avatar(item.avatar, 'pipe2')} alt="" width="50" height="50" />
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


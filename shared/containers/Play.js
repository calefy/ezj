import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getRequestTypes } from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';
import Video from '../components/Video.jsx';
import Ppt from '../components/Ppt.jsx';

let isSkipBegin = false;
if (process.env.BROWSER) {
    require('css/play.css');
    isSkipBegin = /skip=true/.test(document.cookie); // 浏览器下根据cookie判断是否跳过片头
}

const SIDEBAR_CHAPTER = 'sidebar_chapter';
const SIDEBAR_PPT = 'sidebar_ppt';

class Play extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadCourseDetail(params.courseId) ), // 课程详情,包含讲师
            dispatch( courseAction.loadCoursePrivate(params.courseId) ), // 课程私密信息
            dispatch( courseAction.loadCourseChapters(params.courseId) ), // 课程章节
            dispatch( courseAction.loadChapterPpts(params.chapterId) ), // 章节PPT
        ]);
    }

    state = {
        sidebar: SIDEBAR_CHAPTER, // 控制侧边栏显示与否，及显示chapter还是ppt
        pptIndex: 0, // ppt当前序号
        pptBoxOnly: false, // 仅展示ppt框
        pptBoxShow: false, // 展示ppt框
        skipBegin: isSkipBegin, // 跳过片头
    };

    componentDidMount() {
        this.loadNeededData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.loadNeededData(nextProps);
    }
    /**
     * 加载需要的数据：已有数据与props中参数不一致时，加载对应的数据
     */
    loadNeededData = props => {
        const {params, course, course_private, chapters, ppts} = props;
        const courseAction = new CoursesAction();
        // 课程详情
        if (params.courseId != (course._req && course._req.courseId)) {
            props.dispatch( courseAction.loadCourseDetail(params.courseId) );
        }
        // 课程详情-个人私密信息
        if (params.courseId != (course_private._req && course_private._req.courseId)) {
            props.dispatch( courseAction.loadCoursePrivate(params.courseId) );
        }
        // 课程章节
        if (params.courseId != (chapters._req && chapters._req.courseId)) {
            props.dispatch( courseAction.loadCourseChapters(params.courseId) );
        }
        // 章节ppt
        if (params.chapterId != (ppts._req && ppts._req.chapterId)) {
            props.dispatch( courseAction.loadChapterPpts(params.chapterId) );
        }
    };
    /**
     * 设置state
     */
    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };


    setVideoTime = time => {
        this.refs.video.setTimeTo(time);
    };

    // 用户点击按钮操作
    handleChangeChapter = e => {
        this._setState({ pptIndex: 0 });
    };
    handleOver = e => { // 标记完成toggle
        e.preventDefault();
        alert('comming soon ...');
    };
    handlePptBoxShow = e => { // 播放ppt toggle
        e.preventDefault();
        this._setState({ pptBoxShow: !this.state.pptBoxShow });
    };
    handlePptBoxOnly = e => { // 仅展示ppt框
        e.preventDefault();
        this._setState({ pptBoxOnly: !this.state.pptBoxOnly });
    };
    handleSkipBegin = e => { // 跳过片头 toggle
        e.preventDefault();
        let skip = !this.state.skipBegin;
        let d = new Date();
        d.setMonth(d.getMonth() + 1);
        document.cookie = 'skip=' + skip + ';path=/;domain=.ezijing.com;expires=' + d.toGMTString();
        if (skip) {
            this.refs.video.skipBegin();
        }
        this._setState({ skipBegin: skip });
    };
    handleHideSidebar = e => { // 隐藏侧边栏
        e.preventDefault();
        this._setState({ sidebar: false });
    };
    handleShowSidebarChapter = e => { // 显示侧边章节
        e.preventDefault();
        this._setState({ sidebar: SIDEBAR_CHAPTER });
    };
    handleShowSidebarPpt = e => { // 显示侧边ppt
        e.preventDefault();
        this._setState({ sidebar: SIDEBAR_PPT });
    };
    handleSyncVideoTime = e => { // 点击ppt跳转对应的播放时间
        e.preventDefault();
        this._setState({ pptIndex: e.currentTarget.getAttribute('data-index') - 0 });
        let time = e.currentTarget.getAttribute('data-point') - 0;
        this.setVideoTime(time);
    };
    handlePlayTime = (e, data) => { // 视频播放时间变更调用此方法
        let time = parseFloat(data.time);
        let ppts = this.props.ppts.data || {};
        ppts = ppts.list || [];
        let len = ppts.length;
        let i = 0;
        for(; i < len; i++) {
            if (time < ppts[i].ppt_point) {
                break;
            }
        }
        if (this.state.pptIndex !== i - 1) {
            this._setState({ pptIndex: i - 1 });
        }
    };

    render() {
        let {course, course_private, chapters, ppts, params} = this.props;
        let progress = course_private.data && course_private.data.chapters_progress || {};
        course = course.data || {};
        chapters = chapters.data && chapters.data.list || [];
        ppts = ppts.data && ppts.data.list || [];

        // 构造chapterMap，方便查找；顺便在同一个遍历中创建层级结构
        let chapterMap = {};  // map
        let chapterLevel = []; // 层级结构
        let lastRoot = null;
        let lastLeaves = [];
        let leafIds = [];
        chapters.forEach(item => {
            chapterMap[item.id] = item;
            if (item.rgt - item.lft > 1) {
                if (lastRoot) chapterLevel.push({root: lastRoot, leaves: lastLeaves});
                lastRoot = item.id;
                lastLeaves = [];
            } else {
                leafIds.push(item.id);
                lastLeaves.push(item.id);
            }
        });
        if (lastRoot) chapterLevel.push({ root: lastRoot, leaves: lastLeaves });
        // 当前章节
        let chapter = chapterMap[params.chapterId] || {};

        // 前一个后一页
        let prevChapterId = null;
        let nextChapterId = null;
        let curIndex = leafIds.indexOf(params.chapterId);
        prevChapterId = curIndex > 0 ? leafIds[curIndex - 1] : null;
        nextChapterId = curIndex < leafIds.length - 1 ? leafIds[curIndex + 1] : null;

        return (
            <div className="play">
                <div className="left-content">
                    <div className="play-top cl">
                        <Link className="play-back fl" to={`/courses/${params.courseId}`}><i className="iconfont icon-arrowvideo"></i>&emsp;返回详情</Link>
                        <p>{course.course_name}</p>
                        <p>{chapter.chapter_name}</p>
                    </div>
                    <div className="play-center cl">
                        <div className={`play-video fl ${this.state.pptBoxOnly ? 'hide' : ''}`}>
                            <Video
                                ref="video"
                                videoId = {chapter.video.video_origional_ID}
                                width = {550}
                                height = {360}
                                handlePlayTime = {this.handlePlayTime}
                            />
                        </div>
                        <div className={`play-jiangyi fl ${this.state.pptBoxShow ? '' : 'hide'}`}>
                            <Ppt
                                ppts = {ppts}
                                currentIndex = {this.state.pptIndex}
                                onVideoSyncTime = {this.setVideoTime}
                                onPptOnly = {this.handlePptBoxOnly}
                                onClose = {this.handlePptBoxShow}
                            />
                        </div>
                    </div>
                </div>

                <div className="right-content" style={{ right: this.state.sidebar ? 0 : -388 }}>
                    <p className="right-arrow" onClick={this.handleHideSidebar}><span>&gt;</span></p>
                    <div className="control-panel">
                        <ul className="nav-tabs play-nav cl">
                            <li className={`videoChapter ${this.state.sidebar === SIDEBAR_CHAPTER ? 'current' : ''}`}><a href="#sidebar_chapter" onClick={this.handleShowSidebarChapter}>章节</a></li>
                            <li className={`videoJy ${this.state.sidebar === SIDEBAR_PPT ? 'current' : ''}`}><a href="#sidebar_ppt" onClick={this.handleShowSidebarPpt}>讲义</a></li>
                        </ul>
                        <div className="tab-content">
                            <div className={`tab-pane ${this.state.sidebar === SIDEBAR_CHAPTER ? 'current' : ''}`}>
                                <ul className="under-control chapter-list current">
                                    {chapterLevel.map((item, index) => {
                                        return (
                                            <li className="chapter-item" key={index}>
                                                <span className="cpt">{chapterMap[item.root].chapter_name}</span>
                                                <div className="knob-list-wrap">
                                                    <ul className="knob-list">
                                                        {item.leaves.map((id, i) => {
                                                            let prog = progress[id] && progress[id].chapter_progress || 0;
                                                            let part = Math.max(Math.round(prog / 25) - 1, 0);

                                                            return (
                                                                <li className={`knob-item ${chapter.id == id ? 'current' : ''} ${part ? ['one', 'two', 'three', 'four'][part] + '-four' : ''}`} key={i}>
                                                                    <i className="icon icon-pro" title={`学习进度 ${prog}%`}></i>
                                                                    <Link to={`/courses/${params.courseId}/chapters/${id}`} className="knob-name">{chapterMap[id].chapter_name}</Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className={`tab-pane ${this.state.sidebar === SIDEBAR_PPT ? 'current' : ''}`}>
                                <ul className="jiangyi-list">
                                    <div className="jy-list">

                                        {ppts.length ?
                                            ppts.map((item, index) => {
                                                return (
                                                    <div key={index} onClick={this.handleSyncVideoTime} data-index={index} data-point={item.ppt_point} className={index === this.state.pptIndex ? 'current' : ''}>
                                                        <img src={item.ppt_url} alt=""/>
                                                    </div>
                                                );
                                            })
                                            :
                                            <div className="no-data">暂无讲义</div>
                                        }

                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="play-footer">
                    <div className="container">
                        <Link to={`/courses/${params.courseId}/chapters/${prevChapterId || params.chapterId}`} className="fl" onClick={this.handleChangeChapter}>上一节</Link>
                        <Link to={`/courses/${params.courseId}/chapters/${nextChapterId || params.chapterId}`} className="fl" onClick={this.handleChangeChapter}>下一节</Link>
                        <em className="play-state fl" onClick={this.handleOver}>已学完</em>
                        <em className={`play-state fr ${this.state.skipBegin ? 'play-checked' : ''}`} onClick={this.handleSkipBegin}>始终跳过片头</em>
                        <em className={`play-state fr ${this.state.pptBoxShow ? 'play-checked' : ''}`} onClick={this.handlePptBoxShow}>同步显示PPT</em>
                    </div>
                </div>
                {this.state.sidebar ? null :
                    <div className="switch">
                        <a href="#sidebar_chapter" className="switch-chapter" onClick={this.handleShowSidebarChapter}><i className="iconfont icon-chapter"></i><br />章节</a>
                        <a href="#sidebar_ppt" className="switch-handout" onClick={this.handleShowSidebarPpt}><i className="iconfont icon-handout"></i><br />讲义</a>
                    </div>
                }
            </div>
        );

    }
}


module.exports = connect( state => ({
    action: state.action,
    course : state.course,
    course_private : state.course_private,
    chapters: state.chapters,
    ppts: state.ppts,
}) )(Play);


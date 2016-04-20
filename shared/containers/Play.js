import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getRequestTypes } from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/play.css')
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


    // 用户点击按钮操作
    handlePrev = e => { // 上一节
        e.preventDefault();
        e.nativeEvent.returnValue = false;

    };
    handleNext = e => { // 下一节
        e.preventDefault();
        e.nativeEvent.returnValue = false;

    };
    handleOver = e => { // 标记完成toggle
        e.preventDefault();

    };
    handlePlayPpt = e => { // 播放ppt toggle
        e.preventDefault();
    };
    handleSkipBegin = e => { // 跳过片头 toggle
        e.preventDefault();
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


    render() {
        let {course, course_private, chapters, ppts, params} = this.props;
        let progress = course_private.data && course_private.data.chapters_progress || {};
        course = course.data || {};
        chapters = chapters.data && chapters.data.list || [];
        ppts = ppts.data && ppts.data.list || [];

        // 构造chapterMap，方便查找；顺便在同一个遍历中创建层级结构
        let chapterMap = {};
        let chapterLevel = [];
        let lastRoot = null;
        let lastLeaves = [];
        chapters.forEach(item => {
            chapterMap[item.id] = item;
            if (item.rgt - item.lft > 1) {
                if (lastRoot) chapterLevel.push({root: lastRoot, leaves: lastLeaves});
                lastRoot = item.id;
                lastLeaves = [];
            } else {
                lastLeaves.push(item.id);
            }
        });
        if (lastRoot) chapterLevel.push({ root: lastRoot, leaves: lastLeaves });
        // 当前章节
        let chapter = chapterMap[params.chapterId] || {};

        return (
            <div className="play">
                <div className="left-content">
                    <div className="play-top cl">
                        <Link className="play-back fl" to={`/courses/${params.courseId}`}><i className="iconfont icon-arrowvideo"></i>&emsp;返回详情</Link>
                        <p>{course.course_name}</p>
                        <p>{chapter.chapter_name}</p>
                    </div>
                    <div className="play-center" style={{ display: "none" }}>
                        <div className="play-video">视频</div>
                    </div>
                    <div className="play-center cl">
                        <div className="play-video fl">视频</div>
                        <div className="play-jiangyi fl">
                            <div className="play-ppt">
                                <div className="play-preview">
                                    <img src="http://www.ezijing.com/sites/default/files/oos/ppt/song/SXH0313 (1).jpg" className="play-ppt-img" />
                                </div>
                                <div className="play-controls cl">
                                    <div className="play-page">
                                        <span className="play-now">1</span>
                                        &nbsp;/&nbsp;
                                        <span className="play-total">4</span>&nbsp;
                                        页
                                    </div>
                                    <div className="play-amazing fr">
                                        <i className="iconfont icon-big"></i>
                                        <i className="iconfont icon-play"></i>
                                        <i className="iconfont icon-del"></i>
                                    </div>
                                </div>
                            </div>
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
                                                                    <a className="knob-name">{chapterMap[id].chapter_name}</a>
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
                                                return <div key={index} className={index === 0 ? 'current' : ''}><img src={item.ppt_url} alt=""/></div>
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
                        <Link to="" className="fl">上一节</Link>
                        <Link to="" className="fl">下一节</Link>
                        <em className="play-state play-checked fl">已学完</em>
                        <em className="play-state fr">始终跳过片头</em>
                        <em className="play-state fr">同步显示PPT</em>
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


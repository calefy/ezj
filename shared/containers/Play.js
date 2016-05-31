import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { payType } from '../libs/const';
import { getIdt, getRequestTypes } from '../libs/utils';
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
        let arr = [
            dispatch( courseAction.loadCourseDetail(params.courseId) ), // 课程详情,包含讲师
            dispatch( courseAction.loadCoursePrivate(params.courseId) ), // 课程私密信息
            dispatch( courseAction.loadCourseChapters(params.courseId) ), // 课程章节
        ];
        if (params.chapterId) {
            arr.push( dispatch( courseAction.loadChapterPpts(params.chapterId) ) ); // 章节PPT
        }
        return Promise.all(arr);
    }

    state = {
        sidebar: SIDEBAR_CHAPTER, // 控制侧边栏显示与否，及显示chapter还是ppt
        pptIndex: 0, // ppt当前序号
        pptBoxOnly: false, // 仅展示ppt框
        pptBoxShow: false, // 展示ppt框
        skipBegin: isSkipBegin, // 跳过片头
    };

    intervalTimer = null;
    intervalData = [];
    currentVideoId = null;

    componentDidMount() {
        const {params, chapters}  = this.props;
        // 如果没有指定章节ID，并且又取得了章节数据，跳转到第一节
        if (!params.chapterId &&
                (params.courseId === (chapters._req && chapters._req.courseId) && chapters.data)) {
            let list = chapters.data.list || [];
            for (let i=0, len=list.length; i < len; i++) {
                if (list[i].rgt - list[i].lft === 1) {
                    this.props.history.push(`/courses/${params.courseId}/chapters/${list[i].id}`);
                    return;
                }
            }
        }

        this.loadNeededData(this.props);
        // 因flash初始化之前无法获取对象，因此需要延迟执行
        setTimeout(this.jdugeSize.bind(this), 300);

        let $ = require('jquery');
        let timer = null;
        $(window).on('resize', (function() {
            clearTimeout(timer);
            setTimeout(this.jdugeSize.bind(this), 200);
        }).bind(this));

        // 数据采集
        this.intervalTimer = setInterval(this.sendPlayerProgress.bind(this), 10 * 1000);
    }
    componentDidUpdate() {
        this.jdugeSize();
    }
    componentWillReceiveProps(nextProps) {
        this.loadNeededData(nextProps);
        // 如果章节变化，需要再次获取最新的私密信息，以便保证每次播放都检查权限
        if (this.props.location.pathname !== nextProps.location.pathname) {
            const courseAction = new CoursesAction();
            nextProps.dispatch( courseAction.loadCoursePrivate(nextProps.params.courseId) );
            this.sendPlayerProgress();
        }
    }
    componentWillUnmount() {
        clearInterval(this.intervalTimer);
        this.sendPlayerProgress();
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
        if (params.chapterId && params.chapterId != (ppts._req && ppts._req.chapterId)) {
            props.dispatch( courseAction.loadChapterPpts(params.chapterId) );
        }
    };
    /**
     * 判断并设置尺寸位置
     */
    jdugeSize = () => {
        const $ = require('jquery');
        let winH = $(window).height();
        let winW = $(window).width();
        let box = $(this.refs.box);
        let wSpace = 15, hSpace = 10;
        let h = winH - 64 - 60 - hSpace * 2; // 上下分别64px、60px，再加上留出一定的距离
        let w = winW - (this.state.sidebar ? 388 : 0) - wSpace * 2; // 侧边栏为388px
        let videoRatio = 550 / 363;
        let pptRatio = 336 / 236;
        //pptBoxOnly: false, // 仅展示ppt框
        //pptBoxShow: false, // 展示ppt框
        if (!this.state.pptBoxShow) { // 只展示视频时
            let vw = w < h * videoRatio ? w : h * videoRatio;
            let vh = h < w / videoRatio ? h : w / videoRatio;
            this.refs.video && this.refs.video.setSize(vw, vh);
            box.css({
                top: hSpace + (h - vh) / 2,
                left: wSpace + (w - vw) / 2
            });
        } else if (!this.state.pptBoxOnly) { // 同时显示video与ppt
            let halfW = w / 2;

            let vw = halfW < h * videoRatio ? halfW : h * videoRatio;
            let vh = h < halfW / videoRatio ? h : halfW / videoRatio;
            let ph = vh;
            let pw = ph * pptRatio;
            this.refs.ppt && this.refs.ppt.setSize(pw, ph);

            this.refs.video && this.refs.video.setSize(vw, vh);

            box.css({
                top: hSpace + (h - vh) / 2,
                left: wSpace + (w - pw - vw) / 2
            });
        } else { // 仅显示ppt
            let pw = w < h * pptRatio ? w : h * pptRatio;
            let ph = h < w / pptRatio ? h : w / pptRatio;
            this.refs.ppt && this.refs.ppt.setSize(pw, ph);
            box.css({
                top: hSpace + (h - ph) / 2,
                left: wSpace + (w - pw) / 2
            });
        }

    };
    /**
     * 设置state
     */
    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    // 发送到数据采集
    sendPlayerProgress = () => {
        if (this.intervalData.length && this.currentVideoId) {
            const courseAction = new CoursesAction();
            this.props.dispatch( courseAction.playerProgress({
                _idt: getIdt(),
                _cid: this.props.params.courseId,
                _vid: this.currentVideoId,
                _dt: this.intervalData.join(','),
            }) );
            this.intervalData = [];
        }
    };

    setVideoTime = time => {
        this.refs.video.setTimeTo(time);
    };

    // 点击返回详情时，重新加载课程的private信息，以便更新latest_play字段数据
    onClickToDetail = e => {
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.loadCoursePrivate(this.props.params.courseId) );
    };

    // 用户点击按钮操作
    handleChangeChapter = e => {
        this._setState({ pptIndex: 0 });
    };
    handleOver = e => { // 标记完成toggle
        e.preventDefault();
        let t = this.refs.video.getTime();

        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.playerOver({
            _idt: getIdt(),
            _cid: this.props.params.courseId,
            _vid: e.currentTarget.getAttribute('data-vid'),
            _mark: e.currentTarget.getAttribute('data-progress') < 100 ? 1 : 0,
            chapter_id: this.props.params.chapterId,
            current_time: t,
            current_progress: Math.round(t / e.currentTarget.getAttribute('data-total') * 100),
        }) );
    };
    handlePptBoxShow = e => { // 播放ppt toggle
        e.preventDefault();
        let isShow = !this.state.pptBoxShow;
        this._setState({
            pptBoxShow: isShow,
            sidebar: isShow ? null : this.state.sidebar,
            pptBoxOnly: false
        });
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

        if (time === this.lastTime) return; // 因视频播放完成后也会不断触发playing，因此比对上次时间
        this.lastTime = time;

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

        // 存储到要上传到大数据的数据集中
        time = Math.round(time);
        if (this.intervalData.indexOf(time) < 0) {
            this.intervalData.push(time);
        }
    };

    render() {
        let {course, course_private, chapters, ppts, params} = this.props;
        let priv = course_private.data || {};
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
        let chapter = params.chapterId && chapterMap[params.chapterId] || {};
        // 是否允许播放
        let canPlay = (course.course_price == 0 || chapter.free_trial_status || (priv.is_purchased && !priv.is_expired)) &&
                        chapter.video;
        // 当前章节进度
        let curProgress = params.chapterId && progress[params.chapterId] && progress[params.chapterId].chapter_progress || 0;

        this.currentVideoId = chapter.video && chapter.video.id || null;

        // 前一节、后一节
        let prevChapterId = null;
        let nextChapterId = null;
        let curIndex = leafIds.indexOf(params.chapterId);
        prevChapterId = curIndex > 0 ? leafIds[curIndex - 1] : null;
        nextChapterId = curIndex < leafIds.length - 1 ? leafIds[curIndex + 1] : null;

        // 如果仅显示ppt，设置video的样式
        let videoWrapStyle = {};
        if (this.state.pptBoxOnly) {
            videoWrapStyle.visible = 'hidden';
            videoWrapStyle.overflow = 'hidden';
            videoWrapStyle.width = 0;
        }

        return (
            <div className="play">
                <div className="left-content">
                    <div className="play-top cl">
                        <Link className="play-back fl" to={`/courses/${params.courseId}`} onClick={this.onClickToDetail}><i className="iconfont icon-arrowvideo"></i>&emsp;返回详情</Link>
                        <p>{course.course_name}</p>
                        <p>{chapter.chapter_name}</p>
                    </div>
                    <div className="play-center cl rel" ref="box">
                        {canPlay ?
                            <div>
                                <div className="play-video fl" style={videoWrapStyle}>
                                    <Video
                                        ref="video"
                                        videoId = {chapter.video.video_origional_ID}
                                        videoSrt = {chapter.video.video_subtitle_url || ''}
                                        width = {550}
                                        height = {360}
                                        handlePlayTime = {this.handlePlayTime}
                                        lastTime={priv.latest_play && priv.latest_play.chapter_id === chapter.id && priv.latest_play.last_position || 0}
                                    />
                                </div>
                                <div className={`play-jiangyi fl ${this.state.pptBoxShow ? '' : 'hide'}`}>
                                    <Ppt
                                        ref="ppt"
                                        ppts = {ppts}
                                        currentIndex = {this.state.pptIndex}
                                        onVideoSyncTime = {this.setVideoTime}
                                        onPptOnly = {this.handlePptBoxOnly}
                                        onClose = {this.handlePptBoxShow}
                                    />
                                </div>
                            </div>
                            :
                            <div style={{ padding:'50px 20px' }}>
                                {course_private.isFetching ?
                                    <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                                    :
                                    params.chapterId ? // 如果无该值，页面会被跳转到第一节
                                        <p className="text-error">
                                            {priv.is_purchased && priv.is_expired ?
                                                <span>抱歉，您的课程有效期已截止，请您重新购买学习该课程。<br/>您的学习数据将会被保存。<br/><br/></span> : null}
                                            <Link to="/pay" query={{type: payType.COURSE, id: course.id}} className="btn">请购买课程</Link>
                                        </p>
                                        : null
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className="right-content" style={{ right: this.state.sidebar ? 0 : -388 }}>
                    <p className="right-arrow" onClick={this.handleHideSidebar}><span>&gt;</span></p>
                    <div className="control-panel">
                        <ul className="nav-tabs play-nav cl">
                            <li className={`videoChapter ${this.state.sidebar === SIDEBAR_CHAPTER ? 'current' : ''}`}><a href="#sidebar_chapter" onClick={this.handleShowSidebarChapter}>章节</a></li>
                            {ppts.length ?
                                <li className={`videoJy ${this.state.sidebar === SIDEBAR_PPT ? 'current' : ''}`}><a href="#sidebar_ppt" onClick={this.handleShowSidebarPpt}>讲义</a></li>
                                : null
                            }
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
                                                            let part = Math.max(Math.round(prog / 25), 0);

                                                            return (
                                                                <li className={`knob-item ${chapter.id == id ? 'current' : ''} ${part ? ['one', 'two', 'three', 'four'][part - 1] + '-four' : ''}`} key={i}>
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
                    <div className={`container ${canPlay ? '' : 'hide'}`}>
                        <Link to={`/courses/${params.courseId}/chapters/${prevChapterId || params.chapterId}`} className="fl" onClick={this.handleChangeChapter}>上一节</Link>
                        <Link to={`/courses/${params.courseId}/chapters/${nextChapterId || params.chapterId}`} className="fl" onClick={this.handleChangeChapter}>下一节</Link>
                        <em className={`play-state fl ${curProgress == 100 ? 'play-checked' : ''}`} onClick={this.handleOver} data-vid={chapter.video && chapter.video.id || ''} data-progress={curProgress} data-total={chapter.video && chapter.video.video_duration || 1}>{curProgress == 100 ? '已学完' : '标记为已学完'}</em>
                        <em className={`play-state fr ${this.state.skipBegin ? 'play-checked' : ''}`} onClick={this.handleSkipBegin}>始终跳过片头</em>
                        {ppts.length ?
                            <em className={`play-state fr ${this.state.pptBoxShow ? 'play-checked' : ''}`} onClick={this.handlePptBoxShow}>同步显示PPT</em>
                            : null
                        }
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


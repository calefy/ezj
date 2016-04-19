import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getRequestTypes } from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/play.css')
}

class Play extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadCourseDetail(params.courseId) ), // 课程详情,包含讲师
            dispatch( courseAction.loadCourseChapters(params.courseId) ), // 课程章节
        ]);
    }

    componentDidMount() {
        const { course, params } = this.props;
        if (course.isFetching ||
                (course.data && course.data.id != params.courseId)) {
            Play.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.courseId != nextProps.params.courseId ||
                this.props.params.chapterId != nextProps.params.chapterId) {
            const courseAction = new CoursesAction();
            nextProps.dispatch( courseAction.loadCourseDetail(nextProps.params.courseId) ); // 课程详情,包含讲师
            nextProps.dispatch( courseAction.loadCourseChapters(nextProps.params.courseId) ); // 课程章节
        }
    }


    render() {
        let course = this.props.course.data || {};

        return (
            <div className="play">
                <div className="left-content">
                    <div className="play-top cl">
                        <div className="play-back fl"><i className="iconfont icon-arrowvideo"></i>&emsp;返回详情</div>
                        <p>消费金融与消费网贷的发展与实践与...</p>
                        <p>1.1消费金融的起源、类别及我国消费金融的发展</p>
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
                    <div className="switch">
                        <Link to="" className="switch-chapter"><i className="iconfont icon-chapter"></i><br />章节</Link>
                        <Link to="" className="switch-handout"><i className="iconfont icon-handout"></i><br />讲义</Link>
                    </div>
                </div>
                <div className="right-content" style={{ width: 372 }}>
                    <p>&gt;</p>
                    <div className="control-panle">
                        <ul className="nav-tabs play-nav cl">
                            <li className="videoChapter current"><Link to="">章节</Link></li>
                            <li className="videoJy"><Link to="">讲义</Link></li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane current">
                                <ul className="under-control chapter-list current">
                                    <div className="chapter-list">
                                        <li className="chapter-item">
                                            <span className="cpt">第一章：宏观经济形势分析</span>
                                            <div className="knob-list-wrap">
                                                <ul className="knob-list">
                                                    <li className="knob-item current one-four" id="2947">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：五句话塑造基本世界观</a>
                                                    </li>
                                                    <li className="knob-item two-four" id="1775">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：值得精读的五本宏观经济学著作</a>
                                                    </li>
                                                    <li className="knob-item three-four" id="1776">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：Dalio的宏观经济分析框架</a>
                                                    </li>
                                                    <li className="knob-item four-four" id="1781">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：中国宏观经济现状</a>
                                                    </li>
                                                    <li className="knob-item" id="1783">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：中国政府资产负债表解读</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="chapter-item">
                                            <span className="cpt">第二章：宏观经济的增长影响因素</span>
                                            <div className="knob-list-wrap">
                                                <ul className="knob-list">
                                                    <li className="knob-item" id="1784">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：影响宏观经济增长的三大要素</a>
                                                    </li>
                                                    <li className="knob-item" id="1785">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：99%的经济增长是欲望推动的</a>
                                                    </li>
                                                    <li className="knob-item" id="1786">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：决定国家经济增长率的关键因素</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="chapter-item">
                                            <span className="cpt">第三章：未来展望与行业机会</span>
                                            <div className="knob-list-wrap">
                                                <ul className="knob-list">
                                                    <li className="knob-item" id="1787">
                                                        <i className="icon icon-pro"></i>
                                                    <a className="knob-name">黄晓捷：目前在国内做中期投资更稳妥</a>
                                                    </li>
                                                    <li className="knob-item" id="1789">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：能赚大钱的行业方向</a>
                                                    </li>
                                                    <li className="knob-item" id="1791">
                                                        <i className="icon icon-pro"></i>
                                                        <a className="knob-name">黄晓捷：未来行业机会分析</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                            <div className="tab-pane" style={{ display: "none" }}>
                                <ul className="jiangyi-list">
                                    <div className="jy-list">

                                        <div className="">
                                            <img src="http://www.ezijing.com/sites/default/files/oos/ppt/song/SXH0313 (1).jpg" />
                                        </div>

                                        <div className="">
                                            <img src="http://www.ezijing.com/sites/default/files/oos/ppt/song/SXH0313 (2).jpg" />
                                        </div>

                                        <div className="current">
                                            <img src="http://www.ezijing.com/sites/default/files/oos/ppt/song/SXH0313 (3).jpg" />
                                        </div>

                                        <div>
                                            <img src="http://www.ezijing.com/sites/default/files/oos/ppt/song/SXH0313 (4).jpg" />
                                        </div>
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
            </div>
        );

    }
}


module.exports = connect( state => ({
    action: state.action,
    course : state.course,
    chapters: state.chapters,
}) )(Play);


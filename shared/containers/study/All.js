import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import map from 'lodash/map';
import each from 'lodash/each';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';

import CoursesAction from '../../actions/CoursesAction';
import Pagination from '../../components/Pagination.jsx';

let cacheYear = null; // 缓存已经展示过的年

class All extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadMyCourses(location.query) ),
        ]);
    }

    componentDidMount() {
        const { courses_mine, location } = this.props;
        if (courses_mine.isFetching ||
                (courses_mine._req && (courses_mine._req.type != location.query.type || courses_mine._req.page != location.query.page))) {
            All.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.search != nextProps.location.search) {
            cacheYear = null; // 页面变化时，清空缓存的年份
            All.fetchData(nextProps);
        }
    }

    // 获取目标time相对now的字符串
    // 如果跨年，则将节点放到ret中，继续计算timeString
    // 否则，返回对应的时间字符串
    getTimeString = (time, now, ret) => {
        let [ty, tm, td, th, tn] = [ time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes() ];
        let [ny, nm, nd] = [ now.getFullYear(), now.getMonth(), now.getDate() ];
        let s = '';
        // 同年判断是否今天和昨天
        if (ty === ny && tm === nm) {
            s = td === nd ? '今天' : td + 1 === nd ? '昨天' : '';
        }
        // 非同年，比较缓存的年，如果不同，则返回年节点
        else if (ty !== ny && cacheYear != ty) {
            cacheYear = ty;
            ret.push(<li key={time-1} className="cl">
                    <div className="my-all-courses-left fl">{ty}年</div>
                    <div className="my-all-courses-right fl">
                        <span>{ty}</span>
                    </div>
                </li>);
        }

        tm = tm + 1;
        tm = tm < 10 ? '0' + tm : tm;
        td = td < 10 ? '0' + td : td;
        th = th < 10 ? '0' + th : th;
        tn = tn < 10 ? '0' + tn : tn;
        s = (s ? s : tm + '/' + td) + ' ' + th + ':' + tn;
        return s;
    };

    // 渲染时间轴列表数据
    renderList = list => {
        let now = new Date();
        let ret = [];

        // 排序对象
        let arr = keys(list).sort().reverse();

        each(arr, (item, index) => {
            let time = item;
            item = list[item];
            let isPackage = item.type == 2;
            let isLearning = !!item.latest_play;

            let timeStr = this.getTimeString(new Date(time * 1000), now, ret);

            ret.push(
                <li className="cl" key={index}>
                    <div className="my-all-courses-left fl">
                        <p>{isLearning ? '学习' : '购买'}</p>
                        <em>{timeStr}</em>
                    </div>
                    <div className="my-all-courses-right fl">
                        <div>
                            <h4 className="cl">
                                {isPackage ? item.title :
                                    <a href={`/courses/${item.id}`} className="fl" target="_blank">{item.title}</a>
                                }
                                {isLearning ? <em className="fr">已学习</em> : null}
                            </h4>
                            {isPackage ?
                                item.items.map((c, i) => {
                                    return (
                                        <p key={i}>
                                            {c.title}
                                            <a href={`/courses/${c.id}`} className="fr" target="_blank">查看</a>
                                            <em className="fr">有效期至{c.expiring_date}</em>
                                        </p>
                                    );
                                })
                                :
                                !isLearning ?
                                    <p>
                                        分类：{item.course_category_info}
                                        <a href={`/courses/${item.id}`} className="fr" target="_blank">查看</a>
                                        <em className="fr">有效期至{item.expiring_date}</em>
                                    </p>
                                    :
                                    <p>
                                        {item.latest_play.chapter_name || item.latest_play.video_name}
                                        <a href={`/courses/${item.id}/chapters/${item.latest_play.chapter_id}`} className="fr" target="_blank">继续学习</a>
                                    </p>
                            }
                        </div>
                    </div>
                </li>
            );
        });
        return ret;
    };

    render() {
        const {courses_mine, location} = this.props;
        let query = location.query;
        let courses = courses_mine.data || [];
        if (courses_mine.data && courses_mine.data.list) {
            courses = courses_mine.data.list;
        }
        //let courses = courses_mine.data && courses_mine.data.list || [];

        return (
            <div className="study-center-right shadow bg-white fr">
                <ul className="nav-tabs cl">
                    <li className={!query.type ? 'current' : ''}>
                        <Link to="/study/all">全部课程</Link>
                    </li>
                    <li className={query.type === 'learning-list' ? 'current' : ''}>
                        <Link to="/study/all" query={{type: 'learning-list'}}>只看学习</Link>
                    </li>
                    <li className={query.type === 'purchased-list' ? 'current' : ''}>
                        <Link to="/study/all" query={{type: 'purchased-list'}}>只看购买</Link>
                    </li>
                </ul>

                {isEmpty(courses) ? <p className="no-data">暂无数据记录</p> : null}
                <ul className="my-all-courses">
                    {this.renderList(courses)}
                </ul>
            </div>
        );
    }
}

module.exports = connect( state => ({
    courses_mine : state.courses_mine,
}) )(All);

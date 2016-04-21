import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import map from 'lodash/map';

import { avatar } from '../libs/utils';
import UserAction from '../actions/UserAction';
import Pagination from '../components/Pagination.jsx';

let cparams = { 'per-page': 10 };

if (process.env.BROWSER) {
    require('css/student.css')
}

class Student extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const userAction = new UserAction({ apiClient });
        return Promise.all([
            dispatch( userAction.loadStudent(params.studentId, Object.assign({}, location.query, cparams)) ),
        ]);
    }

    componentDidMount() {
        const { student, params } = this.props;
        if (student.isFetching ||
                (student.data && student.data.student_brief.student_id != params.studentId)) {
            Student.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.search != nextProps.location.search) {
            Student.fetchData(nextProps);
        }
    }

    render() {
        let data = this.props.student.data || {};
        let student = data.student_brief || {};
        let courseData = data.joined_courses || {};
        let courses = courseData.items || [];

        return (
            <div className="student mar40 cl container">
                <div className="student-left fl">
                    <div className="student-info bg-white shadow">
                        <img src={avatar(student.avatar)} alt={student.nickname} />
                        <p>{student.nickname}</p>
                    </div>
                    <div className="student-course-num bg-white shadow">
                        课程：<em>6</em>
                    </div>
                </div>
                <div className="student-right fl shadow">
                    {map(courses, (item, index) => {
                        return (
                            <div key={index} className="student-courses cl">
                                <img src={item.picture} alt="" width="160" height="90" className="fl" />
                                <div className="student-courses-info fl">
                                    <h3>{item.title}
                                        <button type="btn" className="fr course-collect course-collected" style={{ display:"none" }}><i className="iconfont icon-heart"></i>收藏</button>
                                    </h3>
                                    <p>&emsp;</p>
                                    <p style={{ display:"none" }}>
                                        <em>【讲师】</em> 
                                        <Link to="">周星</Link> <Link to="">周星驰</Link></p>
                                    <p><em>【分类】</em> {item.course_category_info}</p>
                                    <p><i className="iconfont icon-rotate"></i>{item.updated_time} 更新&emsp;<i className="iconfont icon-user"></i>{item.joined_count} 学员</p>
                                </div>
                                <div className="student-courses-other">
                                    <p>&yen;{item.price}</p>
                                    <Link to={`/courses/${item.id}/introduce`} className="btn">课程详情</Link>
                                </div>
                            </div>
                        );
                    })}
                    <Pagination
                        total={courseData.total || 0}
                        pageSize={cparams['per-page']}
                        page={(this.props.location.query.page || 1) - 0}
                        link={this.props.location.pathname}
                        search={this.props.location.search}
                    />
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    student: state.student,
}) )(Student);


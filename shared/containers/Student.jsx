import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import map from 'lodash/map';

import { avatar } from '../libs/utils';
import UserAction from '../actions/UserAction';
import Pagination from '../components/Pagination.jsx';

let cparams = { 'per-page': 10 };

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
                (student.data && student.data.brief.student_id != params.studentId)) {
            Student.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.search != nextProps.location.search) {
            const userAction = new UserAction();
            nextProps.dispatch( userAction.loadStudent(nextProps.params.studentId, Object.assign({}, nextProps.location.query, cparams)) );
        }
    }

    render() {
        let data = this.props.student.data || {};
        let student = data.brief || {};
        let courses = data.courses || [];

        return (
            <div>
                <h1>学生信息</h1>
                <p>{student.nickname}</p>
                <p><img src={avatar(student.avatar)} alt=""/></p>

                <h2>课程列表</h2>
                {map(courses, (item, index) => {
                    return (
                        <div key={index}>
                            <h3>{item.title}</h3>
                            <img src={item.picture} alt="" height="150"/>
                            <p>价格：&yen;{item.price}  学员数：{item.joined_count}</p>
                            <p>分类：{item.course_category_info}</p>
                            <p><Link to={`/courses/${item.id}`}>课程详情 &gt;</Link></p>
                        </div>
                    );
                })}

                <Pagination
                    total={data.total || 0}
                    pageSize={cparams['per-page']}
                    page={this.props.location.query.page || 0}
                    link={this.props.location.pathname}
                    search={this.props.location.search}
                />
            </div>
        );
    }
}

module.exports = connect( state => ({
    student: state.student,
}) )(Student);


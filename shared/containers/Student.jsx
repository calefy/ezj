import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import UserAction from '../actions/UserAction';

class Student extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const userAction = new UserAction({ apiClient });
        return Promise.all([
            dispatch( userAction.loadPersons([params.studentId]) ),
        ]);
    }

    componentDidMount() {
        const { persons, params } = this.props;
        if (persons.isFetching ||
                (persons.data && !persons.data[params.studentId])) {
            Student.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.studentId != nextProps.params.studentId) {
            const userAction = new UserAction();
            nextProps.dispatch( userAction.loadPersons([nextProps.params.studentId]) );
        }
    }

    render() {
        let persons = this.props.persons.data || {};
        let uid = this.props.params.studentId;
        let student = persons[uid] || {};
        return (
            <div>
                <h1>学生信息</h1>
                <p>{student.nickname}</p>
                <p><img src={student.avatar || 'http://xplat-avatar.oss-cn-beijing.aliyuncs.com/a462f8c334e328ba8f572ca0a51c4861.jpg' } alt=""/></p>
                <p>学习的课程列表： 等待接口中...</p>
            </div>
        );
    }
}

module.exports = connect( state => ({
    persons: state.persons,
}) )(Student);


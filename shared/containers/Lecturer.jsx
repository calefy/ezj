import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { avatar } from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';

class Lecturer extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadLecturer(params.lecturerId) ),
        ]);
    }

    componentDidMount() {
        const { lecturer, params } = this.props;
        if (lecturer.isFetching ||
                (lecturer.data && lecturer.data.id != params.lecturerId)) {
            Lecturer.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.lecturerId != nextProps.params.lecturerId) {
            const courseAction = new CoursesAction();
            nextProps.dispatch( courseAction.loadLecturer(nextProps.params.courseId) );
        }
    }

    render() {
        let lecturer = this.props.lecturer.data || {};
        return (
            <div>
                <h1>{lecturer.lecturer_name}</h1>
                <p>{lecturer.lecturer_org} {lecturer.lecturer_title}</p>
                <p><img src={avatar(lecturer.lecturer_avatar)} alt=""/></p>
                <div dangerouslySetInnerHTML={{__html: lecturer.lecturer_introduction}}></div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    lecturer: state.lecturer,
}) )(Lecturer);

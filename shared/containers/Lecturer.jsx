import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { avatar } from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/lecturer.css');
}

class Lecturer extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadLecturer(params.lecturerId) ),
            dispatch( courseAction.loadLecturerCourses(params.lecturerId) ),
        ]);
    }

    componentDidMount() {
        this.loadNeededData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.loadNeededData(nextProps);
    }
    loadNeededData = props => {
        const {lecturer, lecturer_courses, params} = props;
        const courseAction = new CoursesAction();
        if (lecturer._req && lecturer._req.lecturerId !== params.lecturerId) {
            props.dispatch( courseAction.loadLecturer( params.lecturerId ) );
        }
        if (lecturer_courses._req && lecturer_courses._req.lecturerId !== params.lecturerId) {
            props.dispatch( courseAction.loadLecturerCourses( params.lecturerId ) );
        }
    };

    render() {
        const { lecturer, lecturer_courses } = this.props;

        let person = lecturer.data || {};
        let list = lecturer_courses.data || [];

        return (
            <div className="lecturer">
                {lecturer.isFetching || lecturer_courses.isFetching ?
                    <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                    :
                    <div>
                        <div className="lecturer-top cl">
                            <div className="container">
                                <img src={avatar(person.lecturer_avatar)} alt="" className="fl" />
                                <div className="fl">
                                    <h4>{person.lecturer_name}</h4>
                                    <p className="title">{person.lecturer_org} {person.lecturer_title}</p>
                                    <div className="intro" dangerouslySetInnerHTML={{__html: person.lecturer_summarize}} />
                                </div>
                            </div>
                        </div>
                        <div className="lecturer-bottom">
                            <div className="container">
                                <h4>讲师简介</h4>
                                <div dangerouslySetInnerHTML={{__html: person.lecturer_introduction}} className="lecturer-info"></div>
                                <h4>主讲课程</h4>
                                {list.length ?
                                    <ul className="index-course lecturer-course-list cl">
                                        {list.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <Link to={`/courses/${item.id}`} target="_blank">
                                                        <div className="course-list-img">
                                                            <img src={item.course_picture} alt="" />
                                                        </div>
                                                        <h5>{item.course_name}</h5>
                                                        <p>
                                                            <em>【讲师】</em>
                                                            {item.lecturer_names}
                                                        </p>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    :
                                    <p className="no-data">暂无主讲课程</p>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

module.exports = connect( state => ({
    lecturer: state.lecturer,
    lecturer_courses: state.lecturer_courses,
}) )(Lecturer);

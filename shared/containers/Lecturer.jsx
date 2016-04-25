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
            <div className="lecturer">
                <div className="lecturer-top cl">
                    <div className="container">
                        <img src={avatar(lecturer.lecturer_avatar)} alt="" className="fl" />
                        <div className="fl">
                            <h4>{lecturer.lecturer_name}</h4>
                            <p>{lecturer.lecturer_org} {lecturer.lecturer_title}</p>
                            <em>{lecturer.lecturer_summarize}</em>
                        </div>
                    </div>
                </div>
                <div className="lecturer-bottom">
                    <div className="container">
                        <h4>讲师简介</h4>
                        <div dangerouslySetInnerHTML={{__html: lecturer.lecturer_introduction}} className="lecturer-info"></div>
                        <h4>主讲课程</h4>
                        <ul className="index-course lecturer-course-list cl">
                            <li className="">
                                <Link to="" target="_blank">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/010d02a5a6ceb38a31394cb695303c9d.jpg" alt="" />
                                    </div>
                                    <h5>风险投资（上）-投资者说</h5>
                                    <p>
                                        <em>【讲师】</em> 
                                        <Link to="">吴蓉晖</Link> <Link to="">汤和松</Link> 
                                    </p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="" target="_blank">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/010d02a5a6ceb38a31394cb695303c9d.jpg" alt="" />
                                    </div>
                                    <h5>风险投资（上）-投资者说</h5>
                                    <p>
                                        <em>【讲师】</em> 
                                        <Link to="">吴蓉晖</Link> <Link to="">汤和松</Link> <Link to="">吴蓉晖</Link> <Link to="">汤和松</Link> 
                                    </p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="" target="_blank">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/010d02a5a6ceb38a31394cb695303c9d.jpg" alt="" />
                                    </div>
                                    <h5>风险投资（上）-投资者说</h5>
                                    <p>
                                        <em>【讲师】</em> 
                                        <Link to="">吴蓉晖</Link> <Link to="">汤和松</Link> 
                                    </p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="" target="_blank">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/010d02a5a6ceb38a31394cb695303c9d.jpg" alt="" />
                                    </div>
                                    <h5>风险投资（上）-投资者说</h5>
                                    <p>
                                        <em>【讲师】</em> 
                                        <Link to="">吴蓉晖</Link> <Link to="">汤和松</Link> 
                                    </p>
                                </Link>
                            </li>
                            <li className="last-child">
                                <Link to="" target="_blank">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/010d02a5a6ceb38a31394cb695303c9d.jpg" alt="" />
                                    </div>
                                    <h5>风险投资（上）-投资者说</h5>
                                    <p>
                                        <em>【讲师】</em> 
                                        <Link to="">吴蓉晖</Link> <Link to="">汤和松</Link> 
                                    </p>
                                </Link>
                            </li>
                            <li className="">
                                <Link to="" target="_blank">
                                    <div className="course-list-img">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/010d02a5a6ceb38a31394cb695303c9d.jpg" alt="" />
                                    </div>
                                    <h5>风险投资（上）-投资者说</h5>
                                    <p>
                                        <em>【讲师】</em> 
                                        <Link to="">吴蓉晖</Link> <Link to="">汤和松</Link> 
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    lecturer: state.lecturer,
}) )(Lecturer);

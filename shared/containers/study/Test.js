import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import { getRequestTypes } from '../../libs/utils';
import CoursesAction from '../../actions/CoursesAction';
import Pagination from '../../components/Pagination.jsx';

class Exam extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadSheets(location.query) ),
        ]);
    }

    componentDidMount() {
        const { sheets, location } = this.props;
        if (sheets.isFetching ||
                (sheets._req && sheets._req.page != location.query.page)) {
            Exam.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.search != nextProps.location.search) {
            Exam.fetchData(nextProps);
        }
    }

    render() {
        let sheets = this.props.sheets;
        let total = sheets.data && sheets.data.total || 0;
        let list = sheets.data && sheets.data.list || [];

        return (
            <div className="study-center-right shadow bg-white fr">
                <div className="study-test">
                    <h4 className="h4-title">我的测验</h4>
                    <div className="table" style={{margin:32}}>
                        <table>
                            <thead>
                                <tr>
                                    <th width="200">课程名称</th>
                                    <th width="300">答题时间</th>
                                    <th width="100">正确率</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sheets.isFetching ?
                                    <tr>
                                        <td colSpan="4">
                                            <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                                        </td>
                                    </tr>
                                    :
                                    list.length ?
                                        list.map((item, index) => {
                                            let percent = item.sheet_score || 0;
                                            percent = (percent - 0).toFixed(2);
                                            return (
                                                <tr key={index}>
                                                    <td><Link to={`/courses/${item.course_id}`}>{item.course_name}</Link></td>
                                                    <td>{item.submitted_time}</td>
                                                    <td>{percent}%</td>
                                                    <td>
                                                        <Link to={`/study/test/${item.examination_id}/${item.sheet_id}`} >查看结果</Link>
                                                        &emsp;
                                                        <Link to={`/courses/${item.course_id}#exam`} >重新测试</Link>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        :
                                        <tr>
                                            <td colSpan="4">
                                                <p className="no-data">暂无测验数据</p>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        total={total}
                        page = {(this.props.location.query.page || 1) - 0}
                        link = {this.props.location.pathname}
                        search = {this.props.location.search}
                    />
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    sheets: state.sheets,
}) )(Exam);

import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import Pagination from '../../components/Pagination.jsx';
import CoursesAction from '../../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/mobile.css');
}

class MyExams extends React.Component {

    static pageTitle = '我的测验';

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadSheets(location.query) ),
        ]);
    }

    componentDidMount() {
        document.title = MyExams.pageTitle;

        const { sheets, location } = this.props;
        if (sheets.isFetching ||
                (sheets._req && sheets._req.page != location.query.page)) {
            MyExams.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.search != nextProps.location.search) {
            MyExams.fetchData(nextProps);
        }
    }

    render() {
        let sheets = this.props.sheets;
        let total = sheets.data && sheets.data.total || 0;
        let list = sheets.data && sheets.data.list || [];

        return (
            <div className="mobile-mine">
                {/*
                <div className="mobile-header">
                    <i className="iconfont icon-left1"></i>
                    <h1>我的测验</h1>
                </div>
                */}
                <div className="mobile-content">
                    {sheets.isFetching ?
                        <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                        :
                        list.length ?
                            <ul>
                                {list.map((item, index) => {
                                    let percent = item.sheet_score || 0;
                                    percent = (percent - 0).toFixed(2);
                                    return (
                                        <li key={index}>
                                            <h4>{item.course_name}</h4>
                                            <div>
                                                <p><em>{item.submitted_time}</em></p>
                                                <p><em>正确率{percent}%</em></p>
                                                <Link to={`/m/exams/${item.course_id}/${item.examination_id}`}>重新测验</Link>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            :
                            <p className="no-data">暂无测验数据</p>
                    }

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
}) )(MyExams);

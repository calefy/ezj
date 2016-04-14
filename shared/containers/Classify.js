import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { baseCourseCategories } from '../libs/const';

import CoursesAction from '../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/classify.css');
}
class Classify extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const coursesAction = new CoursesAction({ apiClient: apiClient });
        return Promise.all([
            dispatch( coursesAction.loadCourseCategories() ), // 分类
        ]);
    }

    componentDidMount() {
        const { course_categories } = this.props;
        if ( course_categories.isFetching ) {
            Classify.fetchData(this.props);
        }
    }

    render() {
        const { course_categories, location } = this.props;
        const categories = course_categories.data || [];
        const query = location.query;

        return (
            <div className="content classify">
                <div className="container cl">
                    <div className="classify-left fl">
                        {baseCourseCategories.map((item, key) => {
                            if (key === 0) {
                                return (
                                    <div key={key}>
                                        <h4>{item.name}</h4>
                                        {categories.map((c, i) => {
                                            return <Link to="/courses" query={{category: c.id}} key={i} className={query.category == c.id ? 'cur' : null}>{c.name}<i className="iconfont icon-arrow fr"></i></Link>
                                        })}
                                    </div>
                                );
                            } else {
                                return <h5 key={key}><Link to="/courses" query={{category: item.id}} className={query.category == item.id ? 'cur' : null}>{item.name}<i className="iconfont icon-arrow fr"></i></Link></h5>
                            }
                        })}
                    </div>
                    <div className="classify-right fl">
                        <p className="classify-course">
                            查看关于
                            <Link to="/courses" query={{category: 784}}>互联网金融商业模式</Link> <br/>
                            <Link to="/courses" query={{category: 785}}>资产证券化</Link> &emsp;
                            <Link to="/courses" query={{category: 662}}>企业理财</Link>
                            的精品课程
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({
    course_categories: state.course_categories,
}) )(Classify);


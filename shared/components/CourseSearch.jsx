import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { image } from '../libs/utils';

import Pagination from './Pagination.jsx';


if (process.env.BROWSER) {
    require('css/index.css')
    require('css/classify.css')
    require('css/search.css')
}

class CourseSearch extends Component {
    static propTypes = {
        courses: PropTypes.array.isRequired,
        total: PropTypes.number.isRequired,
        location: PropTypes.object.isRequired,
    };


    render() {
        const { courses, total, location } = this.props;

        return (
            <div>
                <div className="classify-title">
                    <h4>搜索结果</h4>
                    <p>为您搜索到 <em>{total}</em> 门关于“<em>{location.query.q}</em>”的课程</p>
                </div>
                <div className="search-course bg-white">
                    <h4 className="classify-h4">搜索结果</h4>
                    <div className="course-list" style={{ padding: 20}}>
                        {courses.length ?
                            <ul className="index-course cl">
                                {courses.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <a href={`/courses/${item.id}`} target="_blank">
                                                <div className="course-list-img">
                                                    <img src={image(item.course_picture, 'nc')} alt="" />
                                                </div>
                                                <h5>{item.course_name}</h5>
                                                <h6><i className="iconfont icon-user"></i>{item.joined_count}</h6>
                                                <p>&yen;{item.course_price}</p>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                            :
                            <p className="no-data">暂无关于“{location.query.q}”的课程</p>
                        }
                    </div>
                </div>

                <Pagination
                    page={(location.query.page || 1) - 0}
                    pageSize={12}
                    total={total}
                    link={location.pathname}
                    search={location.search}
                />
            </div>
        );
    }
}


module.exports = CourseSearch;


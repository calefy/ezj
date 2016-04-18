import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Collect extends Component {

    render() {
        return (
            <div className="study-center-right shadow bg-white fr">
                <div className="study-collect">
                    <h4 className="h4-title">我收藏的课程</h4>
                    <ul className="index-course cl" style={{ width: 884, margin: "20px auto"}}>
                        <li>
                            <Link to="#">
                                <div className="course-list-img">
                                    <img src="http://www.ezijing.com/sites/default/files/oos/an_li_fen_xi_.jpg" alt="" />
                                </div>
                                <h5>企业理财与公司金融综合服务业务</h5>
                                <h6>
                                    <i className="iconfont icon-user"></i>127
                                    <i className="iconfont icon-heart fr"></i>
                                </h6>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <div className="course-list-img">
                                    <img src="http://www.ezijing.com/sites/default/files/oos/an_li_fen_xi_.jpg" alt="" />
                                </div>
                                <h5>企业理财与公司金融综合服务业务</h5>
                                <h6>
                                    <i className="iconfont icon-user"></i>127
                                    <i className="iconfont icon-heart fr"></i>
                                </h6>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <div className="course-list-img">
                                    <img src="http://www.ezijing.com/sites/default/files/oos/an_li_fen_xi_.jpg" alt="" />
                                </div>
                                <h5>企业理财与公司金融综合服务业务</h5>
                                <h6>
                                    <i className="iconfont icon-user"></i>127
                                    <i className="iconfont icon-heart fr"></i>
                                </h6>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <div className="course-list-img">
                                    <img src="http://www.ezijing.com/sites/default/files/oos/an_li_fen_xi_.jpg" alt="" />
                                </div>
                                <h5>企业理财与公司金融综合服务业务</h5>
                                <h6>
                                    <i className="iconfont icon-user"></i>127
                                    <i className="iconfont icon-heart fr"></i>
                                </h6>
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <div className="course-list-img">
                                    <img src="http://www.ezijing.com/sites/default/files/oos/an_li_fen_xi_.jpg" alt="" />
                                </div>
                                <h5>企业理财与公司金融综合服务业务</h5>
                                <h6>
                                    <i className="iconfont icon-user"></i>127
                                    <i className="iconfont icon-heart fr"></i>
                                </h6>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

module.exports = Collect;

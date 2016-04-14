import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Study extends Component {

    render() {

        return (
            <div className="study-center-right shadow bg-white fr">
                <ul className="my-all-courses">
                    <li className="cl">
                        <div className="my-all-courses-left fl">
                            <p>学习</p>
                            <em>今天 22:15</em>
                        </div>
                        <div className="my-all-courses-right fl">
                            <div>
                                <h4 className="cl">
                                    <Link to="" className="fl">财富管理市场概况与发展趋势</Link>
                                    <em className="fr">已学习</em>
                                </h4>
                                <p>
                                    1.4高净值及超高净值人群的分布和特点（上）
                                    <Link to="" className="fr">继续学习</Link>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="cl">
                        <div className="my-all-courses-left fl">
                            <p>购买</p>
                            <em>今天 22:15</em>
                        </div>
                        <div className="my-all-courses-right fl">
                            <div>
                                <h4 className="cl">
                                    <Link to="" className="fl">财富管理市场概况与发展趋势</Link>
                                </h4>
                                <p>
                                    分类：财富管理／基础理论／
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="cl my-all-course-bag">
                        <div className="my-all-courses-left fl">
                            <p>购买</p>
                            <em>今天 22:15</em>
                        </div>
                        <div className="my-all-courses-right fl">
                            <div>
                                <h4 className="cl">企业战略管理课程包</h4>
                                <p>
                                    战略概览方法与介绍战略概览方法与
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                                <p>
                                    战略概览方法与介绍战略概览方法与
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                                <p>
                                    战略概览方法与介绍战略概览方法与
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                                <p>
                                    战略概览方法与介绍战略概览方法与
                                    <Link to="" className="fr">查看</Link>
                                    <em className="fr">有效期至2016-11-11</em>
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

module.exports = Study;
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
                </ul>
            </div>
        );
    }
}

module.exports = Study;
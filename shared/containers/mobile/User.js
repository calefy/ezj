import React from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
    require('css/mobile.css');
}

let TopicIndex = React.createClass({
    render: function() {
        return (
            <div className="mobile-user">
                <div className="mobile-header">
                    <i className="iconfont icon-left1"></i>
                    <h1>紫荆账户</h1>
                </div>
                <div className="mobile-content">
                    <div className="mobile-balance">
                        您的余额：
                        <div className="fr">
                            <em>2000</em> 紫荆币 <i className="iconfont icon-jewelry"></i>
                        </div>
                    </div>
                    <div className="mobile-recharge">
                        <h4>充值记录<Link to="" className="fr">查看更多</Link></h4>
                        <ul>
                            <li>
                                <h5>宏观经济分析与未来高增长行业<em className="fr">1000</em></h5>
                                <p>充值日期：2015.10.25</p>
                            </li>
                            <li>
                                <h5>宏观经济分析与未来高增长行业<em className="fr">1000</em></h5>
                                <p>充值日期：2015.10.25</p>
                            </li>
                            <li>
                                <h5>宏观经济分析与未来高增长行业<em className="fr">1000</em></h5>
                                <p>充值日期：2015.10.25</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mobile-orders">
                        <h4>消费记录<Link to="" className="fr">查看更多</Link></h4>
                        <ul>
                            <li>
                                <h5>宏观经济分析与未来高增长行业<em className="fr">1000</em></h5>
                                <p>充值日期：2015.10.25<em className="fr">支付成功</em></p>
                            </li>
                            <li>
                                <h5>宏观经济分析与未来高增长行业<em className="fr">1000</em></h5>
                                <p>充值日期：2015.10.25<em className="fr">支付成功</em></p>
                            </li>
                            <li>
                                <h5>宏观经济分析与未来高增长行业<em className="fr">1000</em></h5>
                                <p>充值日期：2015.10.25<em className="fr">支付成功</em></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TopicIndex;

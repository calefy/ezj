import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getOwnRequestIdentity, isOwnRequest } from '../libs/utils';

class Security extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        return Promise.all([
            // 默认首页取5个
            //dispatch( noticeAction.loadNotices({pageSize: 5}, getOwnRequestIdentity(location)) )
        ]);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="content classify-security">
            <div className="container cl">
                <div className="classify-left fl">
                    <h4>金融专业实务精品课</h4>
                    <a href="" title="">财富管理<i className="iconfont icon-arrow fr"></i></a>
                    <a href="" title="">企业理财顾问师<i className="iconfont icon-arrow fr"></i></a>
                    <a href="security" title="">资产证券化<i className="iconfont icon-arrow fr"></i></a>
                    <a href="" title="">互联网金融<i className="iconfont icon-arrow fr"></i></a>
                    <h5><a href="" title="">金融领导力<i className="iconfont icon-arrow fr"></i></a></h5>
                    <h5><a href="" title="">学位教育<i className="iconfont icon-arrow fr"></i></a></h5>
                </div>
                <div className="classify-right fl">
                    <div className="classify-title">
                        <h4>资产证券化</h4>
                        <p>本系列课程从中国资产证券化市场实务操作入手，借鉴国外成熟市场的有益经验，结合中国证券化市场现状，对各类资产证券化产品的操作流程、法律要点、会计和税务法律处理要点、信用评级、登记结算、投资与交易等一系列关键关键环节分别做了详实的讲授。并辅以大量的案例解析。旨在为资产证券化业务提供实践的操作指南。</p>
                    </div>
                    <div className="classify-teacher bg-white">
                        <h4 className="classify-h4">主要讲师</h4>
                        <ul className="classify-teacher-list cl">
                            <li>
                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" className="fl" />
                                <div className="fl">
                                    <h4>林华</h4>
                                    <p>兴业银行独立董事。特许金融分析师</p>
                                </div>
                            </li>
                            <li>
                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" className="fl" />
                                <div className="fl">
                                    <h4>林华</h4>
                                    <p>兴业银行独立董事。特许金融分析师</p>
                                </div>
                            </li>
                            <li>
                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" className="fl" />
                                <div className="fl">
                                    <h4>林华</h4>
                                    <p>兴业银行独立董事。特许金融分析师</p>
                                </div>
                            </li>
                            <li>
                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/dc142a7f3f0629b89ae18115c05f3efc.jpg" alt="" className="fl" />
                                <div className="fl">
                                    <h4>林华</h4>
                                    <p>兴业银行独立董事。特许金融分析师</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="online-course bg-white">
                        <h4 className="classify-h4">在线课程</h4>
                        <dl>
                            <dt>模块一：产品设计</dt>
                            <dd>
                                <span className="online-title">1.资产证券化解析</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>266 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">2.信用卡资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>55 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>2380</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>46 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">3.银行贷款资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>10 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>33 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">4.商业地产贷款证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">5.房地产信托基金REITs</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">6.住房按揭资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">7.汽车贷款资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                        </dl>
                        <dl>
                            <dt>模块二：运营技术</dt>
                            <dd>
                                <span className="online-title">1.资产证券化解析</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">2.信用卡资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">3.银行贷款资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">4.商业地产贷款证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                        </dl>
                        <dl>
                            <dt>模块三：参与主体</dt>
                            <dd>
                                <span className="online-title">1.资产证券化解析</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>10 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">2.信用卡资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">3.银行贷款资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">4.商业地产贷款证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                        </dl>
                        <dl>
                            <dt>模块四：衍生模块</dt>
                            <dd>
                                <span className="online-title">1.资产证券化解析</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">2.信用卡资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">3.银行贷款资产证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                            <dd>
                                <span className="online-title">4.商业地产贷款证券化</span>
                                <span className="online-time"><i className="iconfont icon-price"></i>3 课时</span>
                                <span className="online-price"><i className="iconfont icon-time"></i>238</span>
                                <span className="online-num"><i className="iconfont icon-user"></i>365 人</span>
                                <a href="" title="" className="online-content">详情</a>
                                <a href="" title="" className="online-buy">购买</a>
                            </dd>
                        </dl>
                    </div>
                    <div className="open-course bg-white">
                        <h4 className="classify-h4">公开课</h4>
                        <div  className="open-summary">
                            <h5>学习本课程旨在为资产证券化业务提供实践的操作指南</h5>
                            <p>1.国内第一家聚焦资产证券全流程操作实务，从不同参与主体出发，精解发起、协调、会计、法律、评级、托管、发行、管理以及资产证券化产品投资过程。</p>
                            <p>2.聚焦学习者“技能掌握“，贯穿实操方法的大量经典案例，深度剖析不同基础资产、不同交易结构，解析和强化交易设计原理、交易结构中的注意事项重点。</p>
                            <p>3.前沿视角解密“PPP资产证券化”与”互联网金融资产证券化“实操方法和关键要点。</p>
                        </div>
                        <ul className="open-course-list">
                            <li>
                                <span className="open-title">第1期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第2期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>博林诺富特酒店</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第3期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>待定</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="">立即报名</a>
                            </li>
                            <li>
                                <span className="open-title">第4期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="">立即报名</a>
                            </li>
                            <li>
                                <span className="open-title">第1期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第2期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第3期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="">立即报名</a>
                            </li>
                            <li>
                                <span className="open-title">第4期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="">立即报名</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Security);


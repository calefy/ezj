/**
 * 课程某个分类的详情
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class CourseCategoryDetail extends Component {
    static propTypes = {
        category: PropTypes.object.isRequired, // 单个分类详情
    };


    render() {
        const category = this.props.category;

        return (
            <div>
                <div className="classify-title">
                    <h4>{category.name}</h4>
                    <p>{category.brief}</p>
                </div>
                <div className="classify-teacher bg-white">
                    <h4 className="classify-h4">主要讲师</h4>
                    {category.lecturers && category.lecturers.length ?
                        <ul className="classify-teacher-list cl">
                            {category.lecturers.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <img src={item.lecturer_avatar} alt={item.lecturer_name} className="fl" />
                                        <div className="fl">
                                            <h4>{item.lecturer_name}</h4>
                                            <p>{item.lecturer_org} {item.lecturer_title}</p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        :
                        <p className="no-data">暂无讲师信息</p>
                    }
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
                <div className="open-course bg-white hide">
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
        );
    }
}


module.exports = CourseCategoryDetail;


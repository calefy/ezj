/**
 * 课程学位教育分类
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class CourseCompetitive extends Component {
    render() {
        return (
            <div className="page-competitive">
                <div className="classify-title">
                    <h4>学位项目</h4>
                    <p></p>
                </div>
                <div className="intro">
                    <h2>紫荆-索菲亚 财富管理方向MBA</h2>
                    <div className="cl cnt">
                        <div className="fl">
                            <p>国内首家授予美国正式学位的在线MBA项目</p>
                            <p>由紫荆教育和美国索菲亚大学联合推出</p>
                            <p>首创线上线下结合的学习方式，学习期间两次美国硅谷访学(包含在学费内)</p>
                            <p>学制两年，毕业后获得美国索菲亚大学MBA学位</p>
                            <p>不用参加国内MBA联考，以最快速度开启MBA学习之旅，收获国际MBA学位证书</p>
                        </div>
                        <div className="fr">
                            <a href="http://mba.ezijing.com/" className="btn" target="_blank">报名系统</a>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <a href="http://learn.mba.ezijing.com/" className="btn" target="_blank">学习系统</a>
                        </div>
                    </div>
                </div>

                <div className="org">
                    <h2>学校机构</h2>
                    <div className="cl cnt">
                        <div className="fl">
                            <h3>紫荆教育</h3>
                            <p>清华五道口金融学院成立在线教育中心，推出清华控股旗下品牌“紫荆教育”</p>
                            <p>依托于国内顶尖学府的丰富教育资源与经验</p>
                            <p>来自“金融黄埔军校”和金融企业界的国内顶尖师资</p>
                            <p>学员云集金融行业精英及高净值人群</p>
                        </div>
                        <div className="fr">
                            <img src="http://zj-avatar.img-cn-beijing.aliyuncs.com/723fe051148d9891837d0c7699a0f1981774978473.png@100p" alt=""/>
                        </div>
                    </div>
                    <div className="cl cnt">
                        <div className="fl">
                            <img src="http://zj-avatar.img-cn-beijing.aliyuncs.com/ecc1a9365f3deb6095b25d3b2c75b0dc686584519.png@100p" alt=""/>
                        </div>
                        <div className="fr">
                            <h3>美国索菲亚大学</h3>
                            <p>全球顶尖心理学府，超个人心理学等学科方向全球第一</p>
                            <p>1975年由哈佛大学和斯坦福大学心理学教授创建</p>
                            <p>1998年即通过了中国教育部认证，与斯坦福大学、加州伯克利大学同<br/>为美国西部院校联盟（WASC）的成员</p>
                            <p>地处美国硅谷中心，毗邻斯坦福大学</p>
                            <p>擅长将心理学理念知识与其他学科融会贯通</p>
                        </div>
                    </div>
                </div>

                <div className="course">
                    <h2>课程体系</h2>
                    <div className="cnt tac"><img src="http://zj-avatar.img-cn-beijing.aliyuncs.com/aca10273cd43f5da08f9499b1628707a1276848079.png@100p" alt=""/></div>
                </div>

                <div className="signup">
                    <h2>报名体系</h2>
                    <div className="cnt">
                        <p>紫荆-索菲亚财富管理MBA项目官网：<a href="http://mba.ezijing.com" target="_blank">mba.ezijing.com</a></p>
                        <p>电话：010-57277629  13641208035</p>
                        <p>邮件：<a href="mailto:mba@ezijing.com">mba@ezijing.com</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = CourseCompetitive;

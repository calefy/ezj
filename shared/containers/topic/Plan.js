import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { image } from '../../libs/utils';
import SignUp from '../SignUp.jsx';
import CommerceAction from '../../actions/CommerceAction';

if (process.env.BROWSER) {
    require('css/special.css');
}

const LECTURERS = [
    {
        id: '22103', lecturer_name: '庄瑞豪',
        lecturer_title: '科尔尼（A.T. Kearney）Kearney 全球合伙人、大中华区总裁',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/7aadb00e2f878842be7572edede91806.jpg',
    },
    {
        id: '27678', lecturer_name: '糜懿全',
        lecturer_title: '安永会计师事务所 合伙人',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/4eb7413304c0d07f1d75eb550bdc2bcd.jpg',
    },
    {
        id: '27650', lecturer_name: '郑荣禄',
        lecturer_title: '深圳前海中领国际管理咨询有限公司 董事长',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/4ad21143dd15a9988b7f3be040dce60a.jpg',
    },
    {
        id: '27651', lecturer_name: '高 皓',
        lecturer_title: '清华大学五道口金融学院 家族企业课程主任',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/c6b2956da3ec33e24e09e3821eee6c8b.jpg',
    },
    {
        id: '27017', lecturer_name: '张 伟',
        lecturer_title: '清华大学五道口金融学院 讲师',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/e8c1008168ef556ef5726b54b9263d5a.jpg',
    },
    {
        id: '27106', lecturer_name: '宋晓恒',
        lecturer_title: '晓恒博士家族办公室 创始人',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/24b23e2299fc734d88e91c5db4561c85.jpg',
    },
    {
        id: '6138980509235019776', lecturer_name: '薛 梅',
        lecturer_title: '北京工商大学经济学院 副教授',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/a0b3ae6708d2b7f0d45550a986cf77fb.jpg',
    },
    {
        id: '6138975176638857216', lecturer_name: '何四炎',
        lecturer_title: '金融学保险研究方向管理学博士',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/e14dfc6400a8b2f70b7760f2c44edec2.jpg',
    },
];


class Plan extends React.Component {

    render() {
        //let lecturers = this.props.product_lecturers.data || [];
        let lecturers = LECTURERS;

        return (
            <div className="special-plan wide">
                <div className="special-banner special-plan-banner cl">
                    <div className="container">
                        <div className="fl">
                            <div className="synopsis_text">
                                <h4>《高级财富规划师》公开课</h4>
                                <img src="//zj-avatar.img-cn-beijing.aliyuncs.com/88e0cb7c6651312834ceb7583ddbc8a4267121333.png" />
                            </div>
                            <div className="synopsis_price cl">
                                <p className="fl">¥3280</p>
                                <em className="fl">（¥4000原价）</em>
                                <a href="#sign" className="fr">立即报名</a>
                            </div>
                        </div>
                        <div className="fr">
                            <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/ee1ba88327a47ae94c9d34f8755d0a63.png" />
                        </div>
                    </div>
                </div>
                <div className="special-content">
                    <div className="container">
                        <div className="special-security-teacher bg-white">
                            <div className="liquid">
                                <h3>相关师资</h3>
                                <ul className="cl">
                                    {lecturers.map((item, index) => {
                                        return  <li key={index}>
                                                    <Link to={`/lecturers/${item.id}`} target="_blank">
                                                        <img src={image(item.lecturer_avatar, 'll')}/>
                                                        <div>
                                                            <h4>{item.lecturer_name}</h4>
                                                            <p title={item.lecturer_title}>{item.lecturer_title}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="special-security-target cl">
                            <div className="special-security-target-left bg-white">
                                <h3>课程目标</h3>
                                <div className="cl">
                                    <p>通过集中组织精英理财经理参与“迈入一流金融学院、掌握财富规划实战”学习活动，让理财精英感受清华文化，夯实金融及财富规划的职业素养与专业知识，提升综合金融素质和市场开拓能力。</p>
                                </div>
                            </div>
                            <div className="special-security-target-right bg-white">
                                <h3>O2O学习模式</h3>
                                <div className="cl">
                                    <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/64ac4a858885861d7fce67eeb3c7056c.jpg" className="fl" />
                                    <p>面授+网络O2O形式<br />学时：共8门课，合计48学时<br />其中面授1天2门课，包括开学典礼<br />网络教学6 门课（建议6周时间学完）</p>
                                </div>
                            </div>
                        </div>
                        <div className="special-plan-trait bg-white">
                            <h3>教学特点</h3>
                            <ul>
                                <li>
                                    <h4>• 灵活学习</h4>
                                    <p>学员报名后根据时间确定归入班级，网络学习开班后可以随时学习，学习期限一直保留三个月。面授班可以采取网络和线下同时开放学习。</p>
                                </li>
                                <li>
                                    <h4>• 完备教务</h4>
                                    <p>线下教务细致入微的服务，线上高清视频，专业详细知识点的分解讲习，纸板、电子版详尽讲义。</p>
                                </li>
                                <li>
                                    <h4>• 课堂练习</h4>
                                    <p>网络课堂中包含由辅导专家精心编辑整理的练习题，以满足考生在每章节学习后的巩固练习所需。</p>
                                </li>
                                <li>
                                    <h4>• 考试形式</h4>
                                    <p>网络课程班考生可以直接在学习平台上获取或通过邮件的方式收到相关的网络测试题和结业考试题，并由辅导老师做好相应的追踪，同时要求考生在一定时间内将试题答完传到考试中心。</p>
                                </li>
                                <li>
                                    <h4>• 专属身份</h4>
                                    <p>紫荆教育将为学员建立学习档案，以学生卡为培训学员专属身份标识，可以拥有紫荆教育的系列培训课程的优先录取和学费优惠政策，同时可以学习积分，换取紫荆不定期推出的微课堂并得到紫荆教育的其他培训服务。</p>
                                </li>
                                <li>
                                    <h4>• 缴费保证</h4>
                                    <p>学员可以直接在官方有赞链接通过手机支付，可以直接网上或银行汇款到对公账户。学费收据在面授期间现场开具。</p>
                                </li>
                            </ul>
                        </div>
                        <div className="special-security-harvest bg-white">
                            <h3>课程收获</h3>
                            <h4>对完成面授及网络课程学习的学员:</h4>
                            <ul className="cl">
                                <li className="fl">
                                    <p>• 颁发正式的学习结业证书，学员有关信息正式存档到清华控股旗下紫荆教育学员档案数据库，并备案可查询</p>
                                    <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/0cfb00f220109a9122ec4abeddce8df9.jpg" alt="" />
                                </li>
                                <li className="fr">
                                    <p>• 获得美国索菲亚大学MBA学位项目学习的优先录取权<br />• 官方网站：<Link to="http://mba.ezijing.com/" target="_blank">http://mba.ezijing.com/</Link></p>
                                    <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/f301ea0db5dde29b5b5db4ff6953014b.jpg" alt="" />
                                </li>
                            </ul>
                        </div>
                        <div className="special-security-arrange cl ">
                            <h3>课程安排</h3>
                                <div className="special-security-offline fl">
                                    <h4>线下课程（1天）</h4>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="300">主题</th>
                                                <th width="440">内容</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p>互联网＋财富营销管理</p>
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>1.互联网金融与保险发展史</li>
                                                        <li>2.现代保险服务业与“新国十条”</li>
                                                        <li>3.“保险+互联网”的意义与功用</li>
                                                        <li>4.互联网保险创业与营销管理创新</li>
                                                        <li>5.互联网保险实践（案例分析）</li>
                                                        <li>6.互联网保险行业监管</li>
                                                        <li>7.互联网保险的发展方向</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>清华五道口校史与金融<br />从业者的职业素养</p>
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>清华五道口发展历程杰出校友事迹</li>
                                                        <li>清华五道口人文精神与金融从业者的职业素养</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="special-security-online bg-white fr">
                                    <h4>线上课程（41课时）</h4>
                                    <ul className="special-security-online-ul">
                                        <li>
                                            <h6 className="fl">1.“互联网+”时代的财富管理市场概况与发展趋势</h6>
                                            <em>课时：5</em>
                                        </li>
                                        <li>
                                            <h6 className="fl">2.资产配置原理</h6>
                                            <em>课时：9</em>
                                        </li>
                                        <li>
                                            <h6 className="fl">3.金融市场与投资规划</h6>
                                            <em>课时：9</em>
                                        </li>
                                        <li>
                                            <h6 className="fl">4.个人税务筹划</h6>
                                            <em>课时：7</em>
                                        </li>
                                        <li>
                                            <h6 className="fl">5.家族财富传承</h6>
                                            <em>课时：6</em>
                                        </li>
                                        <li>
                                            <h6 className="fl">6.保险产品与财富管理</h6>
                                            <em>课时：5</em>
                                        </li>
                                    </ul>
                                    <p>备注：线上课程在开班后90天内有效</p>
                                </div>
                            <p>会务组将根据有效的报名信息，通过电子邮件或手机短信方式向参会嘉宾告知培训地点及日程<br />首期班：2016年5月31日-面授地点：清华大学五道口金融学院（面授时间待定）</p>
                        </div>
                        <div className="container special-finance-join bg-white" id="sign">
                        <h3>我要报名</h3>
                        <div className="join-phone">
                            <h4>方式一：手机报名</h4>
                            <div className="join-erwei cl">
                                <div className="join-erwei-phone fl">
                                    <p>手机扫描二维码，即可报名并支付课程</p>
                                    <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/98324339a71f41210d78fe8ffdb3236f.png" style={{ width: 236 }} />
                                </div>
                                <div className="join-saoma fr">
                                    <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/ce51f6e885a781de9bad91a479eb2f88.png" />
                                </div>
                            </div>
                        </div>
                        <div className="join-web">
                            <h4>方式二：官网报名</h4>
                            <SignUp pageKey="plan" history={this.props.history} />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    action: state.action,
    //product_lecturers: state.product_lecturers,
}) )(Plan);

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
        id: '6158476206070038528', lecturer_name: 'A老师',
        lecturer_title: '国内龙头劵商并购业务部总经理',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/aaa8d21e01c92ac35adf7a449d989763.png',
        lecturer_introduce: '保荐代表人，注册金融分析师(CFA)，硕士研究生。14年投资银行从业经历，主导参与了大量A股资本市场的交易项目，交易类型覆盖重大资产重组(含借壳上市)，上市公司收购，再融资，IPO，优先股及债务融资；涉及行业包括金融、地产、建材、文化旅游、传媒等；客户群体涵盖了央企、地方国有企业、民营企业及跨国公司。还曾任职于华欧国际证券公司（湘财与里昂证券（CLSA）的合资公司，WTO后中国第一家合资券商），并赴里昂证券总部交流工作。'
    },
    {
        id: '6158476913858838528', lecturer_name: 'B老师',
        lecturer_title: '知名私募股权投资基金董事总经理，投资与并购业务总经理',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/f7e5135679e08502f91e946baf349af7.png',
        lecturer_introduce: '毕业于清华大学经管学院MBA，拥有清华大学计算机软件学士学位、北京航空航天大学环境控制学士学位。曾就职于埃森哲、金雅拓等多家国际知名企业，具有丰富的创业和投资经验，对TMT、互联网、通用航空等行业有深刻理解，在新兴行业发展研究、创新型企业可持续成长、企业并购整合等方面有丰富经验。曾主导暴风影音、道有道、华龙商务航空等多个项目的投资与并购。'
    },
    {
        id: '6158476444226813952', lecturer_name: 'C老师',
        lecturer_title: '著名市值管理专家',
        lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/223a08abd2f78621205859a9bd0d5051.png',
        lecturer_introduce: '北京鹿苑天闻公司董事长。兼任中国上市公司市值管理研究中心主任、中国上市公司协会独董委委员、上海国资运营研究院学术委员、沪深证交所上市公司高管培训班讲课教授、天士力等上市公司独立董事。历任湘财证券战略创新委主席、中国证券报常务副总编辑、新华社高级编辑、新华社驻日内瓦分社记者。主要著作：《市值管理论》、《资本的奇迹》、《创富报告》、《中国证券大全》、《世纪之交：中国券商在思考》。'
    },
];


class Plan extends React.Component {

    render() {
        //let lecturers = this.props.product_lecturers.data || [];
        let lecturers = LECTURERS;

        return (
            <div className="special-merge wide">
                <div className="special-banner special-merge-banner cl">
                    <div className="container">
                        <div className="fl">
                            <div className="synopsis_text">
                                <h4>《并购重组与市值管理》公开课</h4>
                                <img src="//zj-avatar.img-cn-beijing.aliyuncs.com/4abd46a5afcc85c93ca2ce508ef435b51879888452.png" />
                            </div>
                            <p className="synopsis-merge-text">北京、上海、深圳三地开课啦！</p>
                            <div className="synopsis_price cl">
                                <p className="fl">¥6800</p>
                                <a href="#sign" className="fl">立即报名</a>
                            </div>
                        </div>
                        <div className="fr">
                            <img src="//zj-avatar.img-cn-beijing.aliyuncs.com/ee1ba88327a47ae94c9d34f8755d0a631636122894.png" />
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
                                                            <p className="lecturer-introduce">{item.lecturer_introduce}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="special-merge-course-context bg-white">
                            <h3>课程背景</h3>
                            <p>
                                据普华永道最新报告预测，2016年中国企业并购交易将增长超过20%，伴随IPO发行放缓，借壳上市需求剧增，2016年市场注定将迎来并购重组的全面爆发。并购与重组是公司扩张最重要的手段，也是市值管理最核心的内容。清华控股旗下紫荆教育顺应时势，重磅推出线上线下结合的“并购重组与市值管理”创新实战公开课。专门为金融机构、企业及中介服务机构提供最前沿的并购重组与市值管理的专业知识和实施策略，邀请业内专家提供指导咨询，搭建资本运作高端交流平台。
                            </p>
                        </div>
                        <div className="special-merge-target cl">
                            <div className="special-merge-target-left bg-white">
                                <h3>课程特色</h3>
                                <p>权威政策解读—占领市场先机，提高方案监管审核通过率<br />实操案例分析—实操案例主导者亲授，最接地气分享<br />优质资源汇接—高端精英思想汇聚交流，优质业务资源对接<br />学习证书认证—颁发“并购重组与市值管理“高端研修结业证书<br />业界领军专家—国内并购重组和市值管理领域顶尖专家亲授</p>
                            </div>
                            <div className="special-merge-target-right bg-white">
                                <h3>课程收获</h3>
                                <p>政策把握：把握监管政策及趋势，做好并购前期战略规划<br />并购实操：解密企业并购重组核心实操要点及经典案例解析<br />创新模式：前沿获取PE参与并购的创新模式深度解析<br />市值管理：深度解码上市公司市值管理工具、方法及技巧策略</p>
                            </div>
                        </div>
                        <div className="special-merge-audiences bg-white">
                            <h3>课程受众</h3>
                            <p>银行、信托、劵商、保险、公募基金、金融资产管理公司、金融控股集团、私募股权基金、产业投资基金、担保公司、租赁公司、投融资咨询公司、实体企业（集团）、产业园区、小额信贷公司、财富管理机构、互联网金融公司、评估机构、财会机构、律师事务所等机构相关工作人士。</p>
                        </div>
                        <div className="special-security-arrange cl ">
                            <h3>课程安排</h3>
                                <div className="special-security-offline fl">
                                    <h4>线下面授(2天)</h4>
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
                                                    <p>互联网＋财富营销管理（0.5天）</p>
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>1、最新并购重组业务市场概述</li>
                                                        <li>2、并购重组的监管动态与发展趋势</li>
                                                        <li>3、并购重组的实务要点解析</li>
                                                        <li>4、并购重组相关实务案例分析</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>新形势下上市公司并购重组实务及案例解析（0.5天）</p>
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>1、上市公司并购重组的目的及利益解析</li>
                                                        <li>2、上市公司并购重组案例解析</li>
                                                        <li>3、上市公司并购重组最新监管政策分析</li>
                                                        <li>4、海外上市公司并购典型案例解析</li>
                                                        <li>5、并购重组实操关键操作细节解析</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>并购基金运行实践（0.5天）</p>
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>1、并购基金概述</li>
                                                        <li>2、上市公司主导的并购基金</li>
                                                        <li>3、PE主导的并购基金</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>上市公司市值管理实务（0.5天）</p>
                                                </td>
                                                <td>
                                                    <ul>
                                                        <li>1、市值管理战略规划与顶层设计</li>
                                                        <li>2、市值管理工具与方法</li>
                                                        <li>3、市值管理传播与营销</li>
                                                    </ul>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="special-security-online bg-white fr">
                                    <h4>线上课程（45课时）</h4>
                                    <ul className="special-security-online-ul">
                                        <li>
                                            <h6>1.公司金融</h6>
                                        </li>
                                        <li>
                                            <h6>2.企业并购重组</h6>
                                        </li>
                                        <li>
                                            <h6>3.兼并收购与并购整合</h6>
                                        </li>
                                        <li>
                                            <h6>4.私募股权基金与风险投资</h6>
                                        </li>
                                        <li>
                                            <h6>5.解读“混合所有制”国企民企如何混合</h6>
                                        </li>
                                        <li>
                                            <h6>6.房地产并购兵法</h6>
                                        </li>
                                        <li>
                                            <h6>7.海外并购及投融资法律法规解读</h6>
                                        </li>
                                        <li>
                                            <h6>8.欧洲投资并购法规要点解析</h6>
                                        </li>
                                        <li>
                                            <h6>9.企业价值评估</h6>
                                        </li>
                                    </ul>
                                </div>
                            <p>会务组将根据有效的报名信息，通过电子邮件或手机短信方式向参会嘉宾告知培训地点及日程</p>
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
                            <SignUp pageKey="merge" history={this.props.history} />
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

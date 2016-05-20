import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { image } from '../../libs/utils';
import SignUp from '../SignUp.jsx';
import CommerceAction from '../../actions/CommerceAction';

if (process.env.BROWSER) {
    require('css/special.css');
}

const BUNDLE_ID = '6119033157460164608';

class Security extends React.Component {

    // 初始加载数据
    //static fetchData({dispatch, params={}, location={}, apiClient}) {
    //    const commerceAction = new CommerceAction({ apiClient });
    //    return Promise.all([
    //        dispatch( commerceAction.loadProductLecturers([BUNDLE_ID]) ),
    //    ]);
    //}

    state = {
        schedule: 'sc5', // 要显示的课程内容
    };

    //componentDidMount() {
    //    const { dispatch, product_lecturers } = this.props;
    //    if (!product_lecturers._req || product_lecturers._req.ids.indexOf(BUNDLE_ID) >= 0) {
    //        Security.fetchData(this.props);
    //    }
    //}

    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    // 点击某一讲时，右侧展示对应课程安排
    onClickSchedule = e => {
        e.preventDefault();
        e.nativeEvent.returnValue = false;

        let key = e.currentTarget.getAttribute('data-key');
        if (this.state.schedule !== key) {
            this._setState({ schedule: key });
        }
    };

    render() {
        let lecturers = this.props.product_lecturers.data || [];
        lecturers = []; // 临时去掉

        return (
            <div className="special-security wide">
                <div className="special-banner special-security-banner cl">
                    <div className="container">
                        <div className="fl">
                            <div className="synopsis_text">
                                <h4>《资产证券化创新实践》公开课</h4>
                                <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/e7347ae795f578a40f43bdf70bd92fe4.png" />
                            </div>
                            <div className="synopsis_price cl">
                                <p className="fl">¥4980</p>
                                <a href="#sign" className="fr">立即报名</a>
                            </div>
                        </div>
                        <div className="fr">
                            <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/2404925fe3ba3da35e93737c7de2a1eb.png" />
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
                                                            <p>{item.lecturer_org} {item.lecture_title}</p>
                                                        </div>
                                                    </Link>
                                                </li>
                                    })}
                                    <li><a href="/user/3223333591" target="_blank"><img src="//zj-images.img-cn-beijing.aliyuncs.com/9aa1140f9f695cb8a0f2609032be3c9b.jpg"/><div><h4>林华</h4><p>中国资产证券化分析网董事长，厦门国家会计学院客座教授</p></div></a></li>
                                    <li><a href="/lecturers/3223333672" target="_blank"><img src="//zj-images.img-cn-beijing.aliyuncs.com/67cae20e53698661fce9a2874f5e40ac.jpg"/><div><h4>黄长清</h4><p>恒泰证券金融市场部执行总经理、产品负责人</p></div></a></li>
                                    <li><a href="/lecturers/3223333673" target="_blank"><img src="//zj-images.img-cn-beijing.aliyuncs.com/c2cf12ba6994d974bcdfee781aa47ae3.jpg"/><div><h4>李耀光</h4><p>摩根士丹利华鑫证券固定收益部结构融资总监。</p></div></a></li>
                                    <li><a href="/lecturers/3223333675" target="_blank"><img src="//zj-images.img-cn-beijing.aliyuncs.com/5322710854de236b0034f8df95f4c16d.jpg"/><div><h4>万华伟</h4><p>联合信用评级有限公司副总经理兼评级总监</p></div></a></li>
                                    <li><a href="/lecturers/3223333671" target="_blank"><img src="//zj-images.img-cn-beijing.aliyuncs.com/6e35b1c86dad5377a1fc1249ed86ec33.jpg"/><div><h4>洪浩</h4><p>北京大学理学博士</p></div></a></li>
                                    <li><a href="/lecturers/3223333674" target="_blank"><img src="//zj-images.img-cn-beijing.aliyuncs.com/627554cbc5a12a30d733d54d1b6625a6.jpg"/><div><h4>罗桂连</h4><p>陕西金融控股集团有限公司 总经理助理</p></div></a></li>
                                    <li><a href="/lecturers/3223333679" target="_blank"><img src="//zj-images.img-cn-beijing.aliyuncs.com/ce7319a0b074718be5a32bf2a8887041.jpg"/><div><h4>许余洁</h4><p>中国证监会科研工作站博士后、西南财经大学互联网金融创新及监管协同创新中心特聘研究员</p></div></a></li>
                                    <li><a href="/lecturers/3223333680" target="_blank"><img src="//zj-images.img-cn-beijing.aliyuncs.com/f7b235bff6de5449dcb7250f2d96b66f.jpg"/><div><h4>刘洪光</h4><p>上海市锦天城律师事务所，专职律师</p></div></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="special-security-target cl">
                            <div className="special-security-target-left bg-white">
                                <h3>课程目标</h3>
                                <div className="cl">
                                    <h4>学习本课程旨在为资产证券化业务提供实践的操作指南</h4>
                                    <p>1.国内第一家聚焦资产证券全流程操作实务，从不同参与主体出发，精解发起、协调、会计、法律、评级、托管、发行、管理以及资产证券化产品投资过程。</p>
                                    <p>2.聚焦学习者“技能掌握“，贯穿实操方法的大量经典案例，深度剖析不同基础资产、不同交易结构，解析和强化交易设计原理、交易结构中的注意事项重点。</p>
                                    <p>3.前沿视角解密“PPP资产证券化”与”互联网金融资产证券化“实操方法和关键要点。</p>
                                </div>
                            </div>
                            <div className="special-security-target-right bg-white">
                                <h3>O2O学习模式</h3>
                                <div className="cl">
                                    <em>¥4980</em>
                                    <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/475f459a1dd7b2c77a1e82699fd5fdaf.png" />
                                </div>
                            </div>
                        </div>
                        <div className="special-security-harvest bg-white">
                            <h3>课程收获</h3>
                            <div className="cl">
                                <p>系统全面学习资产证券化理论知识与实操技能，获得清华大学五道口金融学院旗下品牌紫荆教育结业证书</p>
                                <p>优秀的在线课程创造随时随地、灵活高效的学习计划，个人充分掌握学习主动权</p>
                                <p>与深谙国内外资产证券化的领军专家及实操精英面对面交流，轻松拓展精英人脉</p>
                            </div>
                        </div>
                        <div className="special-security-arrange cl ">
                            <h3>课程安排</h3>
                            <div className="special-security-offline fl">
                                <h4>线下课程（2天）</h4>
                                <p>会务组将根据有效的报名信息，通过邮件或短信方式向参会嘉宾告知培训地点及日程</p>
                                <ul className="special-security-offline-info" id="tabs">
                                    <li className={this.state.schedule === 'sc1' ? 'current' : ''}>
                                        <Link to="" className="tab1" data-key="sc1" onClick={this.onClickSchedule}>
                                            <h4>北京</h4>
                                            <p>第1期</p>
                                            <p>2015年11月</p>
                                        </Link>
                                    </li>
                                    <li className={this.state.schedule === 'sc2' ? 'current' : ''}>
                                        <Link to=""className="tab2" data-key="sc2" onClick={this.onClickSchedule}>
                                            <h4>上海</h4>
                                            <p>第2期</p>
                                            <p>2015年12月</p>
                                        </Link>
                                    </li>
                                    <li className={this.state.schedule === 'sc3' ? 'current' : ''}>
                                        <Link to="" className="tab3" data-key="sc3" onClick={this.onClickSchedule}>
                                            <h4>深圳</h4>
                                            <p>第3期</p>
                                            <p>2016年1月</p>
                                        </Link>
                                    </li>
                                    <li className={this.state.schedule === 'sc4' ? 'current' : ''}>
                                        <Link to="" className="tab4" data-key="sc4" onClick={this.onClickSchedule}>
                                            <h4>北京</h4>
                                            <p>第4期</p>
                                            <p>2016年3月</p>
                                        </Link>
                                    </li>
                                    <li className={this.state.schedule === 'sc5' ? 'current' : ''}>
                                        <Link to="" className="tab5" data-key="sc5" onClick={this.onClickSchedule}>
                                            <h4>上海</h4>
                                            <p>第5期</p>
                                            <p>2016年5月28日-29日</p>
                                        </Link>
                                    </li>
                                </ul>

                                <div>
                                    <div className={'tab1 ' + (this.state.schedule === 'sc1' ? '' : 'hide')}>
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
                                                        <p>资产证券化解析</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、 操作流程；</li>
                                                            <li>2、 发起人职责与流程；</li>
                                                            <li>3、 交易协调人（券商）职责与流程；</li>
                                                            <li>4、 受托机构职责与流程； </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>房地产信托基金</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、REITS与类REITS业务模式及海外发展经验</li>
                                                            <li>2、房地产投资信托REITS操作流程</li>
                                                            <li>3、REITS案例分析（汇贤产业信托、中信启航专项资管计划）</li>
                                                            <li>4、REIT产品税收处理及法律问题</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产证券化业务模式及创新案例介绍</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>从承销商和发行人角度介绍国内企业资产证券化和信贷资产证券化：</li>
                                                            <li>（1）市场概况</li>
                                                            <li>（2）业务模式</li>
                                                            <li>（3）产品设计</li>
                                                            <li>（4）创新案例</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产证券化会计</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、发起方会计处理</li>
                                                            <li>2、金融资产终止确认决策流程及具体分析</li>
                                                            <li>3、投资方会计处理</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产证券化投资分析及与资管、资本中介业务的结合</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、 从投资逻辑、分析框架、风险管理与决策流程等方面分析ABS投资业务</li>
                                                            <li>2、 ABS与资管、资本中介的业务结合模式</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产证券化评级</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、各类基础资产评级方法</li>
                                                            <li>2、资产证券化交易结构分析</li>
                                                            <li>3、国内资产证券化评级过程中存在的问题及建议</li>
                                                            <li>4、案例分析</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产证券化中的SPV和受托机构</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、资产证券化中SPV的作用和分类</li>
                                                            <li>2、SPV的创新</li>
                                                            <li>3、受托机构在资产证券化流程中的工作要点</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={'tab2 ' + (this.state.schedule === 'sc2' ? '' : 'hide')}>
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
                                                        <p>房地产信托基金与CMBS</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>（一）房地产信托基金</li>
                                                            <li>1、REITs与类REITs业务模式及海外发展经验</li>
                                                            <li>2、房地产投资信托REITs操作流程</li>
                                                            <li>3、 REITs案例分析（汇贤产业信托、中信启航专项资管计划）</li>
                                                            <li>4、REIT产品税收处理及法律问题</li>
                                                            <li>（二）商业房产贷款证券化CMBS</li>
                                                            <li>1、基础资产分析</li>
                                                            <li>2、结构和特点</li>
                                                            <li>3、案例分析（高盛抵押贷款证券）</li>
                                                            <li>4、采用双SPV进行CMBS业务创新</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>保险机构资产证券化业务政策解读与发展展望</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、保险资金特性及大类资产配资情况</li>
                                                            <li>2、保险业资产支持计划监管政策的立法思路与规制要点</li>
                                                            <li>3、保险机构资产证券化业务发展思路及能力建设</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产证券化解析</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、 资产证券化本质与市场驱动因素</li>
                                                            <li>2、 资产证券化与金融危机</li>
                                                            <li>3、 资产证券化成功因素</li>
                                                            <li>4、 资产证券化业务模式</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产证券化法律操作实务</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、 法律角度分析资产证券化本质</li>
                                                            <li>2、 资产证券化业务主要法律关系</li>
                                                            <li>3、 资产证券化操作流程的法律要点以及相关问题的法律风险及应对</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产证券化投资分析及与资管、资本中介业务的结合</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、从投资逻辑、分析框架、风险管理与决策流程等方面分析ABS投资业务</li>
                                                            <li>2、 ABS与资管、资本中介的业务结合模式</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={'tab3 ' + (this.state.schedule === 'sc3' ? '' : 'hide')}>
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
                                                        <p>证券化解析</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、 资产证券化本质与市场驱动因素</li>
                                                            <li>2、 资产证券化与金融危机</li>
                                                            <li>3、 资产证券化成功因素</li>
                                                            <li>4、 资产证券化业务模式 </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>房地产信托基金（REITs）</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、REITs与类REITs业务模式及海外发展经验</li>
                                                            <li>2、房地产投资信托REITs操作流程</li>
                                                            <li>3、REITs案例分析（汇贤产业信托、中信启航专项资管计划）</li>
                                                            <li>4、REIT产品税收处理及法律问题</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>美国资产证券化新规对我国证券化市场发展的启示</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、中国资产证券化的微观动机、宏观影响和风险</li>
                                                            <li>2、次贷危机后美国资产证券化新规解读</li>
                                                            <li>3、美国资产证券化市场发展对中国资产证券化发展启示与建议</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>资产支持证券的投资分析方法</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、资产支持证券介绍</li>
                                                            <li>2、国内资产支持证券投资市场现状</li>
                                                            <li>3、国内外机构投资者分析</li>
                                                            <li>4、资产支持证券的投资模式</li>
                                                            <li>5、资产支持证券投资分析与决策</li>
                                                            <li>6、资产支持证券投资风险分析</li>
                                                            <li>7、资产支持证券定价分析</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>从承销商和发行人角度看企业资产证券化和信贷资产证券化</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、对资产证券化实务角度的理解</li>
                                                            <li>2、资产证券化业务模式及典型案例</li>
                                                            <li>3、关于资产证券化市场发展的相关建议</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={'tab4 ' + (this.state.schedule === 'sc4' ? '' : 'hide')}>
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
                                                        <p>证券化解析：<br />经济转型下的ABS创新</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、资产证券化本质与市场驱动因素</li>
                                                            <li>2、经济转型下的ABS业务创新</li>
                                                            <li>3、不良贷款证券化会计视角</li>
                                                            <li>4、资产证券化业务模式 </li>
                                                            <li>5、中国证券化主要问题</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>房地产信托投资基金实务</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、不动产证券化在中国的本土实践</li>
                                                            <li>2、银行间债券市场的“REITs”机会</li>
                                                            <li>3、REITs与房地产信托受益券</li>
                                                            <li>4、REITs之房地产(物业)并购信托</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>PPP全流程融资与资产证券化</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、PPP及应用</li>
                                                            <li>2、PPP的三个框架</li>
                                                            <li>3、准备阶段（PPP基金）</li>
                                                            <li>4、建设阶段（PPP项目融资）</li>
                                                            <li>5、中国PPP资产证券化案例解析</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>互联网金融与资产证券化</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、新经济与互联网金融</li>
                                                            <li>2、互联网金融与资产证券化的结合点</li>
                                                            <li>3、market place lending与资产证券化</li>
                                                            <li>4、信用卡贷款证券化的资产和结构</li>
                                                            <li>5、Fintech+资产证券化：市值管理的新模式</li>
                                                            <li>6、MPL的优劣势</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={'tab5 ' + (this.state.schedule === 'sc5' ? '' : 'hide')}>
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
                                                        <p>PPP全流程融资及资产证券化</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、PPP三种收入模式</li>
                                                            <li>2、PPP基金案例</li>
                                                            <li>3、PPP项目融资及案例</li>
                                                            <li>4、PPP与资产证券化结合案例</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>REITs在房地产企业“轻资产化”运营中的创新运用</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、不动产资产证券化的类型与基础资产选择标准</li>
                                                            <li>2、REITs的前世今生</li>
                                                            <li>3、REITs交易结构、现金流重组与结构化模式选择</li>
                                                            <li>4、房地产开发企业转型为管理公司的支点：REITs</li>
                                                            <li>5、租金收益型、自营收益型、开发收益型房地产企业模拟项目分析</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>企业资产证券化的操作前沿实务及典型案例分析</p>
                                                    </td>
                                                    <td>
                                                        <ul>
                                                            <li>1、企业ABS基础资产分布课程</li>
                                                            <li>2、企业ABS定价分析课程</li>
                                                            <li>3、融资租赁ABS</li>
                                                            <li>4、基础设施收益权ABS</li>
                                                            <li>5、应收账款ABS</li>
                                                            <li>6、信托受益权ABS</li>
                                                            <li>7、小额贷款ABS</li>
                                                            <li>8、股票质押式回购ABS</li>
                                                            <li>9、住房公积金ABS</li>
                                                            <li>10、信托受益权ABS案例分析</li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="special-security-online bg-white fr">
                                <h4>线上课程（72课时）</h4>
                                <ul className="special-security-online-ul">
                                    <h5>产品设计</h5>
                                    <li>
                                        <h6 className="fl">1.资产证券化解析</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">2.信用卡资产证券化</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">3.银行贷款资产证券化</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">4.商业地产贷款证券化</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">5.房地产信托基金REITs </h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">6.住房按揭资产证券化</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">7.汽车贷款资产证券化</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <h5>运营技术</h5>
                                    <li>
                                        <h6 className="fl">8.资产证券化的法律问题</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">9.资产证券化的产品设计与评级</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">10.资产证券化中的会计处理</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">11.资产证券化中的税务处理</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <h5>参与主体</h5>
                                    <li>
                                        <h6 className="fl">12.发起人及资产服务</h6>
                                        <em>课时：8</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">13.交易协调人（券商）的工作职责与流程</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">14.资产证券化的受托机构关键职责与工作流程</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">15.资产证券化产品投资</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <h5>衍生模块</h5>
                                    <li>
                                        <h6 className="fl">16.PPP与资产证券化</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <li>
                                        <h6 className="fl">17.互联网金融与资产证券化</h6>
                                        <em>课时：4</em>
                                    </li>
                                    <p>备注：线上课程在付款后，课程全部上线之日起180天内有效</p>
                                </ul>
                            </div>
                        </div>
                        <div className="container special-finance-join bg-white" id="sign">
                        <h3>我要报名</h3>
                        <div className="join-phone">
                            <h4>方式一：手机报名</h4>
                            <div className="join-erwei cl">
                                <div className="join-erwei-phone fl">
                                    <p>手机扫描二维码，即可报名并支付课程</p>
                                    <img src="//zj-avatar.img-cn-beijing.aliyuncs.com/7d27bb2e237b23caa97888158ee0500b826411244.png" style={{ width: 236 }} />
                                </div>
                                <div className="join-saoma fr">
                                    <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/ce51f6e885a781de9bad91a479eb2f88.png" />
                                </div>
                            </div>
                        </div>
                        <div className="join-web">
                            <h4>方式二：官网报名</h4>
                            <SignUp pageKey="security" history={this.props.history} />
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
    product_lecturers: state.product_lecturers,
}) )(Security);

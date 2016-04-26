import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';

import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyText from '../../components/formsy/FormsyText.jsx';

if (process.env.BROWSER) {
    require('css/special.css');
}

const offlineCourse = {id: 123, price: 2580};
const onlineCourse = {id: 9705, price: 580};

let Finance = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    getInitialState: function() {
        return {
            schedule: 'sc1', // 要显示的课程内容
        };
    },

    _setState: function(obj) {
        this.setState(Object.assign({}, this.state, obj || {}));
    },

    // 点击某一讲时，右侧展示对应课程安排
    onClickSchedule: function(e) {
        e.preventDefault();
        e.nativeEvent.returnValue = false;

        let key = e.currentTarget.getAttribute('data-key');
        if (this.state.schedule !== key) {
            this._setState({ schedule: key });
        }
    },

    render: function() {
        return (
            <div className="special-finance">
                <div className="special-banner special-finance-banner cl">
                    <div className="container">
                        <div className="special-finance-info">
                            <h1>《全球互联网金融商业模式及案例深度解析》<small>清华大学五道口金融学院旗下品牌紫荆教育出品</small></h1>
                            <p><b>北京面授班</b><i>¥{offlineCourse.price}</i> ｜ <b>视频点播班</b><i>¥{onlineCourse.price}</i><a href="#intro" className="fr">查看详情</a></p>
                        </div>
                    </div>
                </div>
                <div className="special-content">
                    <div className="container bg-white">
                        <h3>课程描述</h3>
                        <div className="special-finance-desc">
                            <p>《全球互联网商业模式报告（2015）》由清华大学五道口金融学院互联网金融实验室和阳光互联网创新研究中心的研究人员在国家互联网信息办公室信息服务局的指导下支持下，历时2年，走遍了大半个地球，50多个国家和地区，深度调查研究了1000多家公司，访谈了数千人，查阅了数百万字资料创作而成。</p>
                            <p>清华大学五道口金融学院旗下品牌紫荆教育诚邀本报告创作团队，开发出《全球互联网金融商业模及案例深度解析》系列课程，最终凝练成10讲，详尽讲解和深度剖析无法在报告文本中一一展现的大量真实体验和鲜活案例，毫无保留地分享优秀企业的创业模式和成长经验。并特聘互联网金融优秀企业创始人及高管团队、互联网金融行业管理咨询专家、金融行业监管部门加入师资队伍。 </p>
                            <p>本课程团队以“布正道、扬正法”为目标，以探索、引导并促进互联网金融健康发展之路为使命，用多角度、最全面的实战观点为互联网金融从业者、创业者、投资者、监管者献上一堂行业必修课。 </p>
                        </div>
                    </div>
                    <div className="container bg-white">
                        <h3>适合群体</h3>
                        <div className="special-finance-student cl">
                            <p>互联网金融从业者</p>
                            <p>互联网金融创业者</p>
                            <p>互联网金融投资者</p>
                            <p>互联网金融监管者</p>
                        </div>
                    </div>
                    <div className="container bg-white">
                        <h3>课程特点</h3>
                        <div className="special-finance-special cl">
                            <dl>
                                <dt>权 威</dt>
                                <dd>《全球互联网金融商业模式报告(2015)》创作团队报告原班人马亲自参与课程开发与现场讲授，100%原创。 </dd>
                                <dt>全 面</dt>
                                <dd> 根据全球50多个国家和地区、1000多家互联网金融企业，精选归纳出四大模式、30多种细分领域、近100个案例，研究正确、靠谱的互联网金融商业模式。 </dd>
                                <dt>深 入</dt>
                                <dd className="special-finance-multi"> 百闻不如一见，创作团队走访和调研1000多家互联网金融企业，与创始人面对面交流探讨，独家获取第一手资料并长期跟踪，信息均来自一线现场，真实准确，绝非二手贩卖。 </dd>
                                <dt>前 沿</dt>
                                <dd> 汇集了全球互联网金融最新的商业模式，随时保持动态更新，报告每年进行一次全面升级，为互联网金融行业的从业、创业、投资与监管提供及时、前瞻性的指导。 </dd>
                                <dt>实 战</dt>
                                <dd className="special-finance-multi"> 理论与案例相结合，绝大部分为案例教学，特邀国内外互联网金融行业优秀企业的创始人现场授课，面对面交流。现场面授班学员还将有机会到互联网金融优秀企业参观、与创始人及高管团队面对面交流。 </dd>
                                <dt>超 值</dt>
                                <dd> 学习方式灵活，有线下现场面授、线上视频点播等多种方式可供选择。第一季学员享有特价优惠。 </dd>
                            </dl>
                        </div>
                    </div>
                    <div className="container bg-white">
                        <h3>权威师资</h3>
                        <div className="special-finance-teacher cl">
                            <ul>
                                <li>
                                    <h4 className="special-finance-title-red">学 界</h4>
                                    <div>
                                        <p>《全球互联网金融商业模式报告(2015)》创作团队，包括廖理（清华大学五道口金融学院常务副院长）、王正位、栗丽、贺裴菲、钱婧、邓颖等清华大学五道口金融学院互联网金融教授以及研究员。</p>
                                    </div>
                                </li>
                                <li>
                                    <h4 className="special-finance-title-red">业 界</h4>
                                    <div>
                                        <p>多家国内国外互联网金融优秀企业创始人(随每节课主题不断增加)及咨询公司专业研究团队，包括但不限于翟南宾（民生银行自销银行高级专家）、董刚（云投汇创始人）、张韶峰（百融金融信息服务股份有限公司CEO）、张越（波士顿咨询董事总经理）、赵萌（银联智策总经理）等。</p>
                                    </div>
                                </li>
                                <li>
                                    <h4 className="special-finance-title-red">监管层</h4>
                                    <div>
                                        <p>多名来自监管部门的领导，<br /> 提供最前方、最准确的声音。</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="container cl" id="intro">
                        <h3>超级课程表</h3>
                        <div className="special-finance-courses fl">
                            <table className="gridtable">
                                <thead>
                                    <tr>
                                        <th width="52">讲数</th>
                                        <th width="98">时间</th>
                                        <th width="310">课程主题</th>
                                    </tr>
                                </thead>
                            </table>
                            <ul className="special-finance-tabs">
                                <li className={this.state.schedule === 'sc1' ? 'current' : ''}>
                                    <Link to="tab1" title="" className="tab1" data-key="sc1" onClick={this.onClickSchedule}>
                                        <table className="gridtable">
                                            <tbody>
                                                <tr>
                                                    <td width="52">第1讲</td>
                                                    <td width="98">2016-01-16<br /> 9:00-17:00</td>
                                                    <td width="310">互联网消费金融场景及应用</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>
                                </li>
                                <li className={this.state.schedule === 'sc2' ? 'current' : ''}>
                                    <Link to="tab2" title="" className="tab2" data-key="sc2" onClick={this.onClickSchedule}>
                                        <table className="gridtable">
                                            <tbody>
                                                <tr>
                                                    <td width="52">第2讲</td>
                                                    <td width="98">2016-02-27<br />9:00-17:00</td>
                                                    <td width="310">全球P2P行业及案例</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>
                                </li> 
                                <li className={this.state.schedule === 'sc3' ? 'current' : ''}>
                                    <Link to="tab3" title="" className="tab3" data-key="sc3" onClick={this.onClickSchedule}>
                                        <table className="gridtable">
                                            <tbody>
                                                <tr>
                                                    <td width="52">第3讲</td>
                                                    <td width="98">2016-02-28<br />9:00-17:00</td>
                                                    <td width="310">互联网小贷以及第三方支付</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>
                                </li>
                                <li className={this.state.schedule === 'sc4' ? 'current' : ''}>
                                    <Link to="tab4" title="" className="tab4" data-key="sc4" onClick={this.onClickSchedule}>
                                        <table className="gridtable">
                                            <tbody>
                                                <tr>
                                                    <td width="52">第4讲</td>
                                                    <td width="98">2016-03-19<br />9:00-17:00</td>
                                                    <td width="310">新常态下银行、券商的发展与业务创新</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>
                                </li>
                                <li className={this.state.schedule === 'sc5' ? 'current' : ''}>
                                    <Link to="tab5" title="" className="tab5" data-key="sc5" onClick={this.onClickSchedule}>
                                        <table className="gridtable">
                                            <tbody>
                                                <tr>
                                                    <td width="52">第5讲</td>
                                                    <td width="98">2016-03-20<br />9:00-17:00</td>
                                                    <td width="310">互联网保险的业务创新</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>
                                </li>
                                <li className={this.state.schedule === 'sc6' ? 'current' : ''}>
                                    <Link to="tab6" title="" className="tab6" data-key="sc6" onClick={this.onClickSchedule}>
                                        <table className="gridtable">
                                            <tbody>
                                                <tr>
                                                    <td width="52">第6讲</td>
                                                    <td width="98">2016-04-15<br />9:00-17:00</td>
                                                    <td width="310">金融产品互联网营销创新</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>
                                </li>
                                <li className={this.state.schedule === 'sc7' ? 'current' : ''}>
                                    <Link to="tab7" title="" className="tab7" data-key="sc7" onClick={this.onClickSchedule}>
                                        <table className="gridtable">
                                            <tbody>
                                                <tr>
                                                    <td width="52">第7讲</td>
                                                    <td width="98">2016-04-16<br />9:00-17:00</td>
                                                    <td width="310">互联网金融关键技术-大数据技术<br />互联网金融前沿技术趋势</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>
                                </li>
                                <li className={this.state.schedule === 'sc8' ? 'current' : ''}>
                                    <Link to="tab8" title="" className="tab8" data-key="sc8" onClick={this.onClickSchedule}>
                                        <table className="gridtable">
                                            <tbody>
                                                <tr>
                                                    <td width="52">第8讲</td>
                                                    <td width="98">2016-04-17<br />9:00-17:00</td>
                                                    <td width="310">互联网金融关键技术-风险识别与定价技术</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Link>
                                </li>
                                <li>
                                    <table className="gridtable">
                                        <tbody>
                                            <tr>
                                                <td>第9讲</td>
                                                <td>2016-05-14<br />9:00-17:00</td>
                                                <td>互联网资产管理平台</td>
                                            </tr>
                                            <tr>
                                                <td width="52">第10讲</td>
                                                <td width="98">2016-05-15<br />9:00-17:00</td>
                                                <td width="310">众筹与互联网投资<br />互联网金融社交与信息服务</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </li>
                            </ul>
                        </div>
                        <div className="special-finance-cases fr">
                            <div id="content">
                                <div id="tab1" className={this.state.schedule === 'sc1' ? '' : 'hide'}>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="300">课程主题</th>
                                                <th width="300">讲师</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>互联网+消费金融的发展与实践</td>
                                                <td>民生银行直销银行高级专家   翟南宾</td>
                                            </tr>
                                            <tr>
                                                <td>案例1：京东“打白条”</td>
                                                <td>京东金融副总裁  丁晓强</td>
                                            </tr>
                                            <tr>
                                                <td>案例2－6：<br />发薪日贷款：Wonga/Lendup/Simplefi<br/>新型消费金融：Earnest/Zestfinance</td>
                                                <td>五道口金融学院互联网金融分析师 董士君</td>
                                            </tr>
                                            <tr>
                                                <td>专题：消费金融的风险定价与分析技术</td>
                                                <td>民生银行直销银行高级专家   翟南宾</td>
                                            </tr>
                                            <tr>
                                                <td><a href="#sign">报名现场面授班</a></td>
                                                <td><a href={`/courses/${onlineCourse.id}`} target="_blank" className="special-finance-jump">购买视频点播班</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="tab2" className={this.state.schedule === 'sc2' ? '' : 'hide'}>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="264">课程主题</th>
                                                <th width="264">讲师</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>P2P行业最新监管政策解读</td>
                                                <td>银监会/央行/网贷协会等监管机构领导</td>
                                            </tr>
                                            <tr>
                                                <td>P2P网贷的法律风险与防范</td>
                                                <td>知名律所合伙人</td>
                                            </tr>
                                            <tr>
                                                <td>欧美监管体系下的P2P生态与案例解析<br />（LendingClub /Prosper/Zopa）</td>
                                                <td>五道口金融学院互联网金融实验室分析师</td>
                                            </tr>
                                            <tr>
                                                <td>中国典型的P2P网贷平台模式<br />（拍拍贷、人人贷、宜人贷）</td>
                                                <td>知名咨询公司合伙人</td>
                                            </tr>
                                            <tr>
                                                <td>P2P的未来，路在何方？</td>
                                                <td>银监会/央行/网贷协会等监管机构领导</td>
                                            </tr>
                                            <tr>
                                                <td><a href="#sign">报名现场面授班</a></td>
                                                <td><a href={`/courses/${onlineCourse.id}`} target="_blank" className="special-finance-jump">购买视频点播班</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="tab3" className={this.state.schedule === 'sc3' ? '' : 'hide'}>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="264">课程主题</th>
                                                <th width="264">讲师</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>互联网小贷与传统小贷相比，赢在哪里？<br />（Able/Paypal/Kabbage / OnDeck/Blue vine）</td>
                                                <td>五道口金融学院互联网金融实验室分析师</td>
                                            </tr>
                                            <tr>
                                                <td>互联网金融时代，第三方支付的价值和未来</td>
                                                <td>知名咨询公司合伙人</td>
                                            </tr>
                                            <tr>
                                                <td>小贷与第三方支付的法律风险与防范</td>
                                                <td>知名律所合伙人</td>
                                            </tr>
                                            <tr>
                                                <td>大数据在精准营销与坏账催收中的应用实例</td>
                                                <td>百融金服集团CEO 张韶峰</td>
                                            </tr>
                                            <tr>
                                                <td><a href="#sign">报名现场面授班</a></td>
                                                <td><a href={`/courses/${onlineCourse.id}`} target="_blank" className="special-finance-jump">购买视频点播班</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="tab4" className={this.state.schedule === 'sc4' ? '' : 'hide'}>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="264">课程主题</th>
                                                <th width="264">讲师</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>互联网银行监管及发展趋势</td>
                                                <td>银监会/证监会的机构领导</td>
                                            </tr>
                                            <tr>
                                                <td>互联网银行发展及创新-直销银行及数字银行</td>
                                                <td>廖理院长发布的《全球互联网金融商业模式报告（2015）》原班创作人员</td>
                                            </tr>
                                            <tr>
                                                <td>互联网券商的发展与业务创新</td>
                                                <td>知名银行及券商高管</td>
                                            </tr>
                                            <tr>
                                                <td><a href="#sign">报名现场面授班</a></td>
                                                <td><a href={`/courses/${onlineCourse.id}`} target="_blank" className="special-finance-jump">购买视频点播班</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="tab5" className={this.state.schedule === 'sc5' ? '' : 'hide'}>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="264">课程主题</th>
                                                <th width="264">讲师</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>互联网保险监管政策与发展趋势</td>
                                                <td>保监会/金融局等监管机构领导</td>
                                            </tr>
                                            <tr>
                                                <td>互联网思维下的保险产品及场景案例</td>
                                                <td>廖理院长发布的《全球互联网金融商业模式报告（2015）》原班创作人员</td>
                                            </tr>
                                            <tr>
                                                <td>国内互联网保险探索经验分享</td>
                                                <td>知名互联网保险公司平台高管</td>
                                            </tr>
                                            <tr>
                                                <td><a href="#sign">报名现场面授班</a></td>
                                                <td><a href={`/courses/${onlineCourse.id}`} target="_blank" className="special-finance-jump">购买视频点播班</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="tab6" className={this.state.schedule === 'sc6' ? '' : 'hide'}>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="264">课程主题</th>
                                                <th width="264">拟邀讲师</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>互联网金融产品网络营销布局与策略</td>
                                                <td rowSpan="2">林大亮<br />国内移动互联网营销、运营实战领军人物，北京大学电子商务总裁班导师，创业家黑马营导师</td>
                                            </tr>
                                            <tr>
                                                <td>金融产品如何进行社会化媒体营销</td>
                                            </tr>
                                            <tr>
                                                <td><a href="#sign">报名现场面授班</a></td>
                                                <td><a href={`/courses/${onlineCourse.id}`} target="_blank" className="special-finance-jump">购买视频点播班</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="tab7" className={this.state.schedule === 'sc7' ? '' : 'hide'}>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="264">课程主题</th>
                                                <th width="264">拟邀讲师</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>区块链技术概况</td>
                                                <td>紫荆教育特约讲师</td>
                                            </tr>
                                            <tr>
                                                <td>区块链技术在金融中的应用场景及发展趋势</td>
                                                <td>吴志峰 国家开发银行研究院处长</td>
                                            </tr>
                                            <tr>
                                                <td>区块链投资机会与投资实例</td>
                                                <td>李林 火币网创始人兼CEO</td>
                                            </tr>
                                            <tr>
                                                <td><a href="#sign">报名现场面授班</a></td>
                                                <td><a href={`/courses/${onlineCourse.id}`} target="_blank" className="special-finance-jump">购买视频点播班</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div id="tab8" className={this.state.schedule === 'sc8' ? '' : 'hide'}>
                                    <table className="gridtable">
                                        <thead>
                                            <tr>
                                                <th width="264">课程主题</th>
                                                <th width="264">拟邀讲师</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>互联网金融风险识别技术</td>
                                                <td>刘志军 马上消费金融 首席数据官</td>
                                            </tr>
                                            <tr>
                                                <td>互联网金融定价技术</td>
                                                <td>黄国平 社科院研究员</td>
                                            </tr>
                                            <tr>
                                                <td><a href="#sign">报名现场面授班</a></td>
                                                <td><a href={`/courses/${onlineCourse.id}`} target="_blank" className="special-finance-jump">购买视频点播班</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container special-finance-join bg-white" id="sign">
                        <h3>我要报名</h3>
                        <div className="join-phone">
                            <h4>方式一：手机报名<em>如有疑问，请咨询课程负责人刘老师，电话或微信：13811997720</em></h4>
                            <div className="join-erwei cl">
                                <div className="join-erwei-phone fl">
                                    <p>手机扫描二维码，即可报名并支付课程</p>
                                    <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1b0283371b4fc9a33d7947f9ebdaf3ef.png" />
                                </div>
                                <div className="join-saoma fr">
                                    <h5>拿出手机，通过微信完成购买</h5>
                                    <p>1、打开微信点击“发现” &gt; “扫一扫”</p>
                                    <p>2、对准左侧二维码扫码</p>
                                    <p>3、点击底部“我想要”</p>
                                    <p>4、通过微信支付就能购买成功</p>
                                </div>
                            </div>
                        </div>
                        <div className="join-web">
                            <h4>方式二：官网报名</h4>
                            <div className="join-web-sign">
                                <div className="join-web-info">
                                    <h5 className="cl">填写信息<em className="fr">（为确保报名成功，请您输入正确的个人信息）</em></h5>
                                    <div>
                                        <dl>
                                            <dt>姓名：</dt>
                                            <dd><input type="text" placeholder="请输入您的姓名" /></dd>
                                            <dd className="text-error">请输入正确的姓名</dd>
                                        </dl>
                                        <dl>
                                            <dt>邮箱：</dt>
                                            <dd><input type="text" placeholder="请输入您的常用邮箱" /></dd>
                                            <dd className="text-success">紫荆教育已注册用户</dd>
                                            <dd className="text-success">报名后可凭邮箱登录紫荆教育</dd>
                                            <dd className="text-error">请输入正确邮箱</dd>
                                        </dl>
                                        <dl>
                                            <dt>手机：</dt>
                                            <dd><input type="text" placeholder="请输入您的联系方式" /></dd>
                                            <dd className="text-error">请输入正确的手机</dd>
                                        </dl>
                                        <dl>
                                            <dt>发票</dt>
                                            <dd><input type="checkbox" /></dd>
                                        </dl>
                                        <dl className="join-invoice">
                                            <input type="text" placeholder="请输入发票抬头" />
                                            <dd className="text-error">请输入发票抬头</dd>
                                        </dl>
                                        <div className="join-buy cl">
                                            <dl className="fl">
                                                <dt>是我本人购买</dt>
                                                <dd><input type="radio" checked="" /></dd>
                                            </dl>
                                            <dl className="fl">
                                                <dt>替其他人购买</dt>
                                                <dd><input type="radio" /></dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="join-web-choose">
                                    <h5>选择课程类型</h5>
                                    <div>
                                        <p>请选择您要参与的现场面授班，视频点播班请在上方超级课程表中购买</p>
                                        <div className="join-web-selcourse cl">
                                            <Link to="#" className="on">第六讲     2016-04-15<br />地点：五道口金融学院</Link>
                                            <Link to="#" className="">第七讲     2016-04-16<br />地点：五道口金融学院</Link>
                                            <Link to="#" className="">第八讲     2016-04-17<br />地点：五道口金融学院</Link>
                                        </div>
                                        <dl className="cl">
                                            <dt>课程信息：</dt>
                                            <dd>
                                                <div className="join-web-gift">
                                                    <div className="join-web-offline">
                                                        <h4 className="join-web-title-red">学员福利   <em>价格：¥ 2580</em></h4>
                                                        <p>1) 可参加线下面授，第一时间学到报告精髓</p>
                                                        <p>2) 与讲师现场互动、个案现场咨询服务</p>
                                                        <p>3) 可参加视频点播学习（有效期180天）</p>
                                                        <p>4) 获得授课 PPT 教材纸质版 1 份</p>
                                                        <p>5) 价值 188 元《全球互联网金融商业模式报告（2015）》1 本</p>
                                                        <p>6) 有机会到互联网金融优秀企业参观，与创始人及高管团队面对面交流</p>
                                                    </div>
                                                    <div className="join-web-online">
                                                        <h4 className="join-web-title-red">学员福利   <em>价格：¥ 2580</em></h4>
                                                        <p>1) 可参加线下面授，第一时间学到报告精髓</p>
                                                        <p>2) 与讲师现场互动、个案现场咨询服务</p>
                                                        <p>3) 可参加视频点播学习（有效期180天）</p>
                                                        <p>4) 获得授课 PPT 教材纸质版 1 份</p>
                                                        <p>5) 价值 188 元《全球互联网金融商业模式报告（2015）》1 本</p>
                                                        <p>6) 有机会到互联网金融优秀企业参观，与创始人及高管团队面对面交流</p>
                                                    </div>
                                                </div>
                                                <div className="ifc online"></div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="join-web-pay">
                                    <h5>选择支付方式<em>客服电话：13811997720 刘老师</em></h5>
                                    <div className="join-web-pay-info">
                                        <ul className="join-web-pay-type cl">
                                            <li className="fl on">在线支付</li>
                                            <li className="fl">线下汇款支付</li>
                                        </ul>
                                        <div className="join-web-pay-content">
                                            <ul className="join-web-pay-online cl">
                                                <li className="fl on"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1181bf80cd08ff6b35f58a9e6ceb1589.png" /></li>
                                                <li className="fl"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/069c882368b67fe9812018db3b5cdd39.png" /></li>
                                            </ul>
                                            <div className="join-web-pay-offline">
                                                <h5>线下汇款报名说明：</h5>
                                                <ul>
                                                    <li>步骤一：根据页面上方提示，提交报名信息</li>
                                                    <li>步骤二：汇款支付</li>
                                                    <li>请你根据下方账号信息汇款，汇款时<label className="warn-remit">务必在备注中写明报名课程、姓名、手机号</label>，我们的工作人员会在收到汇款后与您确认报名成功。</li>
                                                    <li>户名：清控紫荆（北京）科技股份有限公司</li>
                                                    <li>开户行：中国民生银行股份有限公司北京魏公村支行</li>
                                                    <li>账号：694485289</li>
                                                    <li>客服电话：13811997720 刘老师</li>
                                                </ul>
                                                <p>备注：线上课程在付款后，课程全部上线之日起180天内有效</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="join-web-btn">
                                        <button>确认</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = connect( state => ({
    action: state.action,
}) )(Finance);

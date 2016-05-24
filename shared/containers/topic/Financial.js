/*
    银联页登陆后跳转
*/

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { image } from '../../libs/utils';
import { payType } from '../../libs/const';
import OperateAction from '../../actions/OperateAction';
import CommerceAction from '../../actions/CommerceAction';

if (process.env.BROWSER) {
    require('css/special.css');
}

// const LECTURERS = [
//     {
//         id: '22103', lecturer_name: '庄瑞豪',
//         lecturer_title: '科尔尼（A.T. Kearney）Kearney 全球合伙人、大中华区总裁',
//         lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/7aadb00e2f878842be7572edede91806.jpg',
//     },
//     {
//         id: '27678', lecturer_name: '糜懿全',
//         lecturer_title: '安永会计师事务所 合伙人',
//         lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/4eb7413304c0d07f1d75eb550bdc2bcd.jpg',
//     },
//     {
//         id: '27650', lecturer_name: '郑荣禄',
//         lecturer_title: '深圳前海中领国际管理咨询有限公司 董事长',
//         lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/4ad21143dd15a9988b7f3be040dce60a.jpg',
//     },
//     {
//         id: '27651', lecturer_name: '高 皓',
//         lecturer_title: '清华大学五道口金融学院 家族企业课程主任',
//         lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/c6b2956da3ec33e24e09e3821eee6c8b.jpg',
//     },
//     {
//         id: '27017', lecturer_name: '张 伟',
//         lecturer_title: '清华大学五道口金融学院 讲师',
//         lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/e8c1008168ef556ef5726b54b9263d5a.jpg',
//     },
//     {
//         id: '27106', lecturer_name: '宋晓恒',
//         lecturer_title: '晓恒博士家族办公室 创始人',
//         lecturer_avatar: 'http://zj-images.img-cn-beijing.aliyuncs.com/24b23e2299fc734d88e91c5db4561c85.jpg',
//     },
// ];
const onlineId="6119033154381545472";
const offlineId="6119033154423488512";

class Financial extends React.Component {

    //初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
       const commerceAction = new CommerceAction({ apiClient });
       return Promise.all([
           dispatch( commerceAction.loadProduct(onlineId) ),
           dispatch( commerceAction.loadProductLecturers([onlineId]) )
       ]);
    }

    componentDidMount() {
        const { product, product_lecturers, location } = this.props;
        if ( product.isFetching || (product.data && product.data.id !== onlineId) || product_lecturers.isFetching ) {
            Financial.fetchData(this.props);
        }
    }

    onClickBuy = e => {
        // 检测登录状态
        if (!this.isLogin()) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;
            this.showLoginDialog();
            return;
        }
    };

    isLogin = () => {
        return this.props.user.data && this.props.user.data.uid;
    };

    showLoginDialog = () => {
        let operateAction = new OperateAction();
        this.props.dispatch(operateAction.openLoginDialog());
    };

    render() {
        let lecturers = this.props.product_lecturers.data || [];
        lecturers = lecturers.slice(0,6);
        // let lecturers = LECTURERS;
        const courses = this.props.product.data || {};
        return (
            <div className="special-financial wide">
                <div className="special-banner special-financial-banner cl">
                    <div className="container">
                        <div className="fl">
                            <div className="synopsis_text">
                                <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/738ffd0c876ac5351618743a08c78e54.png" />
                            </div>
                            <div className="synopsis_price">
                                <div className="synopsis-online-price cl">
                                    <em className="fl">在线方案：在线课程包&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;¥{courses.price}</em>
                                    <div className="online-btn">
                                        <Link to={`/pay?type=${payType.PRODUCT}&id=${courses.id}`} target="_blank" className="fr" onClick={this.onClickBuy}>购买</Link>
                                        {/*
                                            <div className="buy-confirm cl fr">
                                                <Link to="" className="buy-reload">刷新</Link>
                                                <Link to="">重新购买</Link>
                                                <p>支付待确认</p>
                                            </div>
                                        */}
                                        
                                    </div>
                                </div>
                                <div className="synopsis-combine-price cl">
                                    <em className="fl">综合方案：线下课程＋在线课程包&emsp;&emsp;¥2580.00</em>
                                    <div className="online-btn">
                                        <Link to={`/pay?type=${payType.PRODUCT}&id=${offlineId}`} target="_blank" className="fr" onClick={this.onClickBuy}>购买</Link>
                                        {/*
                                            <div className="buy-confirm cl fr">
                                                <Link to="" className="buy-reload">刷新</Link>
                                                <Link to="">重新购买</Link>
                                                <p>支付待确认</p>
                                            </div>
                                        */}
                                    </div>
                                </div>
                                <p className="synopsis-validity-period">在线课程包付款后180天内有效</p>
                            </div>
                        </div>
                        <div className="fr">
                            <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/fee42a9815f5d17d849550657fa5645c.png" />
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
                        <div className="special-financial-worth bg-white">
                            <h3>课程价值</h3>
                            <ul className="cl">
                                <li>
                                    <em>时代</em>
                                    <p>助力商业银行、保险、券商等传统金融就在互联网+的时代背景下，用互联网思维武装自己，将互联网技术与金融核心技术深度整合，促进二者的融合互补。</p>
                                </li>
                                <li>
                                    <em>竞争</em>
                                    <p>通过对互联网金融商业模式和互联网思维的探索，培养互联网+时代需要的兼具专业能力、数据意思与适应性的人才。</p>
                                </li>
                                <li>
                                    <em>客户</em>
                                    <p>通过对互联网金融所具有的尊重客户体验、强调交互式营销、主张平台开发等特点，对传统金融机构的服务模式提出了新的要求，以其最大程度改善客户体验，提升客户忠诚度。</p>
                                </li>
                                <li>
                                    <em>升值</em>
                                    <p>提升自身的金融服务水平，增强综合金融服务能力以及市场竞争力，提升自身价值，让你在职场无往不利，步步高升！</p>
                                </li>
                            </ul>
                        </div>
                        <div className="special-financial-target cl">
                            <div className="special-financial-target-left fl bg-white">
                                <h3>适应人群</h3>
                                <div className="cl">
                                    <p>金融机构从事与互联网业务相关的人员</p>
                                    <p>金融机构从事数据科技业务创新等相关人员</p>
                                    <p>清算机构、第三方支付机构等相关业务及管理人员</p>
                                    <p>其他泛互联网金融从业人员以及对互联网金融感兴趣有意在该领域发展者</p>
                                </div>
                            </div>
                            <div className="special-financial-target-right fr bg-white">
                                <h3>相关资料</h3>
                                <div className="cl">
                                    《风吹江南》陈宇（江南愤青）著 东方出版社<br />《互联网金融》姚文平 著 中信出版社<br />《互联网金融法律风险防范实务指导》刘永斌著 中国法制出版社<br />《互联网信贷风险与大数据——如何开始互联网金融的实践》陈红梅 著 清华大学出版社<br />《互联网银行》廖理，张伟强，王正位，赵岑 等著 清华大学出版社<br />《金融e时代》万建华 著 中信出版社<br />《支付战争》[美] 埃里克·杰克逊（Eric M. Jackson） 著；徐彬，王晓 译 中信出版社<br />《支付革命：互联网时代的第三方支付》马梅，朱晓明，周金黄 等 著 中信出版社
                                </div>
                            </div>
                        </div>
                        <div className="special-financial-courses bg-white">
                            <h3>课程安排</h3>
                            <h5>
                                在线方案：在线课程包（8门课程）<div className="fr">¥{courses.price}<Link to={`/pay?type=${payType.PRODUCT}&id=${courses.id}`} target="_blank" className="btn" onClick={this.onClickBuy}>购买</Link></div>
                            </h5>
                            <dl className="online-course">
                                {(courses.courses || []).map((item, index) => {
                                    return  <dd key={index}>
                                                <span className="online-title">{index + 1}.{item.course_name}</span>
                                                <span className="online-time"><i className="iconfont icon-time"></i>{Math.ceil( ((item.duration || 0) - 0) / 60 / 45 )} 课时</span>
                                                <span className="online-price"><i className="iconfont icon-price"></i>{item.course_price}</span>
                                                <span className="online-num"><i className="iconfont icon-user"></i>{item.student_count} 人</span>
                                                <a href={`/pay?type=${payType.COURSE}&id=${item.id}`} className="online-buy fr" target="_blank" onClick={this.onClickBuy}>购买</a>
                                                <a href={`/courses/${item.id}`} className="online-content fr" target="_blank">详情</a>
                                            </dd>
                                })}
                            </dl>
                            <h5>
                                综合方案：线下课程（2门课程）+在线课程包（8门课程）<div className="fr">¥2580.00<Link to={`/pay?type=${payType.PRODUCT}&id=${offlineId}`} target="_blank" className="btn" onClick={this.onClickBuy}>购买</Link></div>
                            </h5>
                            <div className="cl">
                                <dl className="combine-course fl">
                                    <dt>《互联网时代的金融变革》</dt>
                                    <dd>课程简介：</dd>
                                    <dd>
                                        <p>移动互联网、大数据、云计算等信息技术的迅猛发展正在改变金融业的底层架构，传统金融业被技术变革推进到了一个新的天地——互联网金融时代。</p>
                                    </dd>
                                    <dd>
                                        <p>本门课程将深入探讨有关互联网金融的产业特征、产业热点和难点问题，探索互联网金融模式下的机遇与挑战，预测互联网金融趋势，把脉金融产业布局互联网金融。包括但不限于互联网企业的金融化模式，金融机构的互联网化模式，金融服务的互联网化，以及对全新的互联网金融模式进行探讨。</p>
                                    </dd>
                                </dl>
                                <dl className="combine-course fr">
                                    <dt>《互联网金融的法律风险与监管》</dt>
                                    <dd>课程简介：</dd>
                                    <dd>
                                        <p>传统金融行业纷纷将线下业务向线上扩展，新兴互联网公司争先恐后地向金融领域进军，但当前我国金融体系尚不完善，若运作失当，则可能带来系统性和区域性金融风险，因此，维护金融安全是金融创新的首要前提。</p>
                                    </dd>
                                    <dd>
                                        <p>本课针对P2P网贷、众筹、第三方支付、大数据金融等互联网金融模式，从法律的视角，运用法律分析方法，适用现行法律法规，提炼出互联网金融的相关法律关系及其潜在的法律风险，希望能为互联网金融从业者提供一扇“窗”。</p>
                                    </dd>
                                </dl>
                            </div>
                            <p>线下课程不单独售卖，购买综合方案课程包后请与客服联系安排培训时间。联系电话：4008-363-463</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    user: state.user,
    action: state.action,
    product: state.product,
    product_lecturers: state.product_lecturers,
}) )(Financial);

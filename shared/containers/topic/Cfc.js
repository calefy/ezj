import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { payType } from '../../libs/const';
import { image } from '../../libs/utils';
import Video from '../../components/Video.jsx';
import CommerceAction from '../../actions/CommerceAction';
import CoursesAction from '../../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/special.css');
}

const bundle = { id: '6119033148207529984', price: 5700 };
const bundle_part_ids = ['6119033148161392640', '6119033145351208960', '6119033145393152000', '6119033147871985664']

const video_trys = [
    {id: '23A927AB00D7BF2B9C33DC5901307461', name: '新常态下的资产配置'},
    {id: 'A8A854B628EE505F9C33DC5901307461', name: '税收筹划、避税、偷逃漏税的定义'},
    {id: '16356A80489893559C33DC5901307461', name: '热点分析——“新国九条” 的亮点解读'},
    {id: 'A1C7A131899C96619C33DC5901307461', name: '企业融资概览（中）'},
    {id: '87088627020221F99C33DC5901307461', name: '不同行业企业价值评估—人寿保险'},
    {id: 'FFB7DE887FC3969B9C33DC5901307461', name: '商业模式与生存基础'},
];

class Cfc extends React.Component {

    state = {
        //tab_*: '' // 自动适应tab
        videoTryId: video_trys[0].id, // 默认第一个试听视频
        videoTryClicked: false,
        curBundleId: null, // 要展示的包内容
        curCourseId: null, // 要展示的课程ID
    };

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const commerceAction = new CommerceAction({ apiClient });
        return Promise.all([
            dispatch( commerceAction.loadProducts({ids: bundle_part_ids.join(',')}) ),
        ]);
    }

    componentDidMount() {
        const {products} = this.props;
        if (products.isFetching) {
            Cfc.fetchData(this.props);
        }
    }

    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    /**
     * 通用点击tab，会在state中存储 tab_key 的字段，tab的 data-value 内容为content的refs名称
     * 如
     *      <tab data-key="intro" data-value="intro_cont_1" className={this.state.tab_intro === 'intro_cont_1'}/>
     *      {this.state.tab_intro === 'intro_cont_1' ?
     *          <content ref="intro_cont_1"/>
     *          : null
     *      }
     *      点击tab会执行：
     *          1. this.setState({ 'tab_intro': 'intro_cont_1' })
     */
    onClickTab = e => {
        e.preventDefault();
        let prefix = 'tab_';
        let key = e.currentTarget.getAttribute('data-key');
        this._setState({ [prefix + key]: e.currentTarget.getAttribute('data-value') });
    };

    // 点击试听视频
    onClickTryVideo = e => {
        e.preventDefault();
        e.nativeEvent.returnValue = false;

        let vid = e.currentTarget.getAttribute('data-id');
        if (this.state.videoTryId !== vid) {
            this._setState({ videoTryId: vid, videoTryClicked: true });
        }
    };

    // 点击模块
    onClickBundle = e => {
        e.preventDefault();
        e.nativeEvent.returnValue = false;

        let bid = e.currentTarget.getAttribute('data-id');
        if (this.state.curBundleId === bid) {
            this._setState({ curBundleId: null });
        } else {
            this._setState({ curBundleId: bid });
        }
    };
    // 点击查看某门课程详情
    onClickCourse = e => {
        e.preventDefault();
        e.nativeEvent.returnValue = false;
        let cid = e.currentTarget.getAttribute('data-id');
        if (this.state.curCourseId === cid) {
            this._setState({ curCourseId: null });
        } else {
            this._setState({ curCourseId: cid });
            // 发起请求，加载课程数据
            const {course, chapters} = this.props;
            if (!(course.data && course.data.id === cid &&
                        chapters._req && chapters._req.courseId === cid)) {
                const courseAction = new CoursesAction();
                this.props.dispatch( courseAction.loadCourseDetail(cid) );
                this.props.dispatch( courseAction.loadCourseChapters(cid) );
            }
        }
    };


    render() {
        const { products } = this.props;
        const bundlePre = products.data && products.data[bundle_part_ids[0]] || {};
        const bundleIds = bundle_part_ids.slice(1);
        const productMap = products.data || {};
        let curProduct = {};
        if (this.state.curBundleId) {
            curProduct = productMap[this.state.curBundleId] || {};
        }

        let course = this.props.course.data || {};
        let chapters = this.props.chapters.data && this.props.chapters.data.list || [];

        return (
            <div className="special-cfc">
                <div className="special-banner cl">
                    <div className="container">
                        <div className="fl">
                            <div className="special-text"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/765385fe4b4738b551dd072c4c2498cd.png" /></div>
                            <div className="special-price">
                                    <span>在线培训课程¥{bundle.price}</span>
                                    <em className="special-state">付款后180天内有效</em>
                                    <Link to="/pay" query={{type: payType.PACKAGE, id: bundle.id}} className="special-banner-join">立即报名</Link>
                                </div>
                        </div>
                        <div className="fr" style={{ marginTop: 12 }}>
                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/6ec013ff330b69a8e8d6a4e5ed53a5dc.png" />
                        </div>
                    </div>
                </div>
                <div className="special-cfc-content">
                    <div className="special-menu hide">
                        <div className="special-menu-nav">
                            <ul className="container cl">
                                <li><Link to="#">项目介绍</Link></li>
                                <li><Link to="#">认证培训</Link></li>
                                <li><Link to="#">学员反馈</Link></li>
                                <li><Link to="#">认证证书</Link></li>
                                <li><Link to="#">常见问题</Link></li>
                                <li className="special-buy">
                                    <p className="special-buy-state">在线培训课程¥5700<br />付款后180天内有效</p>
                                    <Link to="" className="special-join">立即报名</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="container">
                        <div className="special-cfc-about">
                            <h3>项目介绍</h3>
                            <div className="cl special-about-cfc">
                                <div className="fl bg-white">
                                    <h2 className="h2-title"><span>CFC是什么？</span></h2>
                                    <p>企业理财顾问师（Corporate Finance Consultant Certificate,简称CFC）国际职业资格认证，是针对商业银行、证券、保险、信托、第三方理财等各类金融机构的对公从业人员以及为企业提供企业投、融资等金融顾问服务人员的培训认证体系，同时也是国内企业理财专业领域中率先与国际资本市场接轨的国际职业资格认证体系。</p>
                                </div>
                                <div className="fr bg-white">
                                    <h2 className="h2-title"><span>哪些人需要学习CFC？</span></h2>
                                    <ul>
                                        <li><span>1</span><p>商业银行对公条线部门领导、中后台领导及骨干</p></li>
                                        <li><span>2</span><p>保险公司高管人员、综合金融理财服务经理</p></li>
                                        <li><span>3</span><p>证券/基金/信托公司高管人员、公司综合金融理财服务经理</p></li>
                                        <li><span>4</span><p>企业高管，财会、审计 、风险管理、资产管理等部门和业务骨干</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="special-why-cfc bg-white">
                                <h2 className="h2-title"><span>为什么要学习CFC？</span></h2>
                                <h5 className="h5-title">行业认可</h5>
                                <div className="cl">
                                    <div className="fl">
                                        <p>企业理财顾问（CFC）国际职业资格认证已成功为中国银行、中国农业银行、中国工商银行、中国建设银行、中国交通银行、广发银行、兴业银行、宁波银行等数家商业银行及保险业开展了对公条线从业人员业务培训，培训效果得到了学员及金融机构的一致好评。</p>
                                        <ul>
                                            <li>
                                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1c08e547362088f4fda2d590bc198546.jpg" alt="" />
                                                <p>将CFC职业资格认证项目，列入总行年度培训计划</p>
                                            </li>
                                            <li>
                                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/bc5bf42d6186a86d1b15d5f76074058b.jpg" alt="" />
                                                <p>织全国支行骨干精英，办两期CFC认证培训，并将CFC纳入公司客户经理薪酬管理体系</p>
                                            </li>
                                            <li>
                                                <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/6b280898e70555bf098250ea5ccc891f.jpg" alt="" />
                                                <p>2015年第二次将CFC职业资格认证项目纳入年度培训计划</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="fr">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/8b371d89213dff3af85f1b6491735adb.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="special-leader-cfc bg-white">
                                <h5 className="h5-title">领导支持</h5>
                                <p>CFC项目获得了包括中国人民银行、中国银行业协会及中国保险行业协会、国有五大商业银行等各与会金融机构主管培训教育负责人的广泛认可。</p>
                                <div className="cl">
                                    <div className="fl">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/d7658f6e2c4934baa60b49021c4a2449.jpg" alt="" />
                                        <p>全国人大财经委副主任委员吴晓灵出席会议并讲话</p>
                                    </div>
                                    <div className="fr">
                                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/88f4291754baef6a4d89a16af2402283.jpg" alt="" />
                                        <p>中国金融标准专家委员会合影</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="special-cfc-course">
                            <h3>认证培训</h3>
                            <ul>
                                <li>
                                    <div className="cl special-cfc-title">
                                        <h2 className="h2-title"><span>Step1 : 在线培训课程</span></h2>
                                        <p>
                                            ¥{bundle.price}
                                            <Link to="/pay" query={{type: payType.PACKAGE, id: bundle.id}} className="fr">购买全部课程</Link>
                                        </p>
                                    </div>
                                    {products.isFetching ?
                                        <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                                        :
                                        <div>
                                            <ul className="special-cfc-tabs">
                                                <li className="special-cfc-tab1 cfc-qj">
                                                    <h4>前阶课程</h4>
                                                    <div>
                                                        <div className="special-course-top">财务管理基础<br /><a href="/courses/4759" target="_blank">查看详情</a></div>
                                                        <div className="special-course-bottom">税务筹划基础<br /><a href="/courses/4806" target="_blank">查看详情</a></div>
                                                    </div>
                                                </li>
                                                {/*
                                                <li className="special-cfc-tab1 cfc-qj">
                                                    <h4>{bundlePre.title}</h4>
                                                    <div>
                                                        {(bundlePre.courses || []).map((item, index) => {
                                                            return <div className={`special-course-${index === 0 ? 'top' : 'bottom'}`}>{item.course_name}<br /><a href={`/courses/${item.id}`} target="_blank">查看详情</a></div>
                                                        })}
                                                    </div>
                                                </li>
                                                */}
                                                {/*<li className="special-cfc-tab2 active">
                                                    <h4>模块一</h4>
                                                    <div>
                                                        <div className="special-course-top">企业理财综合知识<br />40课时</div>
                                                        <div className="special-course-bottom"><span>¥1900</span><br /><Link to="#">收起详情</Link></div>
                                                    </div>
                                                </li>*/}
                                                <li className={`special-cfc-tab2 ${this.state.curBundleId === bundleIds[0] ? 'active' : ''}`}
                                                        data-id={bundleIds[0]}
                                                        onClick={this.onClickBundle}>
                                                    <h4>模块一</h4>
                                                    <div>
                                                        <div className="special-course-top">企业理财综合知识<br />40课时</div>
                                                        <div className="special-course-bottom"><span className="price">¥1900</span><br /><a href="#">{this.state.curBundleId === bundleIds[0] ? '收起' : '展开'}详情</a></div>
                                                    </div>
                                                </li>
                                                <li className={`special-cfc-tab3 ${this.state.curBundleId === bundleIds[1] ? 'active' : ''}`}
                                                        data-id={bundleIds[1]}
                                                        onClick={this.onClickBundle}>
                                                    <h4>模块二</h4>
                                                    <div>
                                                        <div className="special-course-top">企业融资筹划<br />32课时</div>
                                                        <div className="special-course-bottom"><span className="price">¥1520</span><br /><a href="#">{this.state.curBundleId === bundleIds[1] ? '收起' : '展开'}详情</a></div>
                                                    </div>
                                                </li>
                                                <li className={`special-cfc-tab4 ${this.state.curBundleId === bundleIds[2] ? 'active' : ''}`}
                                                        data-id={bundleIds[2]}
                                                        onClick={this.onClickBundle}>
                                                    <h4>模块三</h4>
                                                    <div>
                                                        <div className="special-course-top">企业投资筹划<br />48课时</div>
                                                        <div className="special-course-bottom"><span className="price">¥2280</span><br /><a href="#">{this.state.curBundleId === bundleIds[2] ? '收起' : '展开'}详情</a></div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className={`special-cfc-content ${this.state.curBundleId ? '' : 'hide'}`}>
                                                <div className="special-course-arrange bg-white">
                                                    <ul>
                                                        <li>
                                                            <div className="special-arrange-course cl">
                                                                {(curProduct.courses || []).map((item, index) => {
                                                                    return (
                                                                        <dl key={index} className={this.state.curCourseId === item.id ? 'on' : ''}>
                                                                            <dt data-id={item.id} onClick={this.onClickCourse}>
                                                                                <div className="special-arrange-title">{item.course_name}</div>
                                                                                <div className="special-arrange-course-teacher hide">讲师 :  </div>
                                                                                <div className="special-arrange-user">学员 : {item.student_count}人</div>
                                                                                <div className="special-arrange-icon"></div>
                                                                            </dt>
                                                                            {this.state.curCourseId === item.id ?
                                                                                this.props.course.isFetching || this.props.chapters.isFetching ?
                                                                                    <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                                                                                    :
                                                                                    <dd className="cl">
                                                                                        <div className="special-course-left fl">
                                                                                            <img src={image(course.course_picture, 'nc')} alt="" />
                                                                                            <ul>
                                                                                                {(course.lecturers || []).map((lecturer, i) => {
                                                                                                    return <li key={i}>
                                                                                                                <div className="special-arrange-teacher">
                                                                                                                    <img src={image(lecturer.lecturer_avatar, 'nl')} alt={lecturer.lecturer_name} />
                                                                                                                    <h5><a href={`/lecturers/${lecturer.id}`} target="_blank">{lecturer.lecturer_name}</a></h5>
                                                                                                                    <div dangerouslySetInnerHTML={{__html: lecturer.lecturer_introduction}}></div>
                                                                                                                </div>
                                                                                                            </li>
                                                                                                })}
                                                                                            </ul>
                                                                                        </div>
                                                                                        <div className="special-course-right fr">
                                                                                            <h4>课程简介</h4>
                                                                                            <div className="special-course-desc">
                                                                                                <div dangerouslySetInnerHTML={{__html: course.course_outlines}}></div>
                                                                                            </div>
                                                                                            <div className="special-course-content-list">
                                                                                                <dl>
                                                                                                    {chapters.map((item, index) => {
                                                                                                        let isRoot = item.rgt - item.lft > 1;
                                                                                                        return isRoot ?
                                                                                                            <dt key={index}>
                                                                                                                {item.chapter_name}
                                                                                                            </dt>
                                                                                                            :
                                                                                                            <dd key={index}>
                                                                                                                {item.chapter_name}
                                                                                                            </dd>
                                                                                                    })}
                                                                                                </dl>
                                                                                            </div>
                                                                                            <div className="cl">
                                                                                                <a href={`/courses/${course.id}`} target="_blank" className="btn">了解详情</a>
                                                                                            </div>
                                                                                        </div>
                                                                                    </dd>
                                                                                : null
                                                                            }
                                                                        </dl>
                                                                    );
                                                                })}
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </li>
                                <li className="cfc-course-bottom">
                                    <div className="cl special-cfc-title">
                                        <h2 className="h2-title"><span>Step2 : 企业理财顾问师（CFC）资格认证</span></h2>
                                        <p>¥3280</p>
                                    </div>
                                    <div className="special-cfc-tel">联系客服了解详情：4008-363-463    13811977670（徐老师）</div>
                                </li>
                            </ul>
                        </div>
                        <div className="special-cfc-try">
                            <h3>课程试听</h3>
                            <div className="special-cnt cl">
                                <dl className="fl">
                                    <dt>模块一 : 企业理财综合知识</dt>
                                    {video_trys.slice(0, 2).map((item, index) => {
                                        return  <dd key={index}>
                                                    <a href="#"
                                                        className={this.state.videoTryId === item.id ? 'active' : ''}
                                                        data-id={item.id}
                                                        onClick={this.onClickTryVideo}>试听: 《{item.name}》</a>
                                                </dd>
                                    })}
                                    <dt>模块二 : 企业融资筹划</dt>
                                    {video_trys.slice(2, 4).map((item, index) => {
                                        return  <dd key={index}>
                                                    <a href="#"
                                                        className={this.state.videoTryId === item.id ? 'active' : ''}
                                                        data-id={item.id}
                                                        onClick={this.onClickTryVideo}>试听: 《{item.name}》</a>
                                                </dd>
                                    })}
                                    <dt>模块三 : 企业投资筹划</dt>
                                    {video_trys.slice(4, 6).map((item, index) => {
                                        return  <dd key={index}>
                                                    <a href="#"
                                                        className={this.state.videoTryId === item.id ? 'active' : ''}
                                                        data-id={item.id}
                                                        onClick={this.onClickTryVideo}>试听: 《{item.name}》</a>
                                                </dd>
                                    })}
                                </dl>
                                <div className="player fl">
                                    <Video
                                        videoId={this.state.videoTryId}
                                        width={656}
                                        height={360}
                                        autoPlay={this.state.videoTryClicked}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="special-cfc-feedback">
                            <h3>学员反馈</h3>
                            <div className="special-tab-menu">
                                <div className="cl">
                                    <a href="#" data-key="fb" data-value="fbc1" onClick={this.onClickTab} className={(!this.state.tab_fb || this.state.tab_fb === 'fbc1') ? 'active' : ''}><span><b>拓宽从业者视野以客户为中心</b></span></a>
                                    <a href="#" data-key="fb" data-value="fbc2" onClick={this.onClickTab} className={this.state.tab_fb === 'fbc2' ? 'active' : ''}><span><b>深化知识体系提升专业素养</b></span></a>
                                    <a href="#" data-key="fb" data-value="fbc3" onClick={this.onClickTab} className={this.state.tab_fb === 'fbc3' ? 'active' : ''}><span><b>整合多方资源解决实际问题</b></span></a>
                                    <a href="#" data-key="fb" data-value="fbc4" onClick={this.onClickTab} className={this.state.tab_fb === 'fbc4' ? 'active' : ''}><span><b>四屏一体随时随地学习</b></span></a>
                                </div>
                            </div>
                            <div className="special-tab-cnt">
                                {!this.state.tab_fb || this.state.tab_fb === 'fbc1' ?
                                    <div className="special-tab-cnt-item cl">
                                        <div className="cnt">
                                            <p>这次培训培养了我们站在企业的角度去思考问题的思维方式，去想企业在想什么在做什么，站在企业的角度去思考企业的融资、投资、风险管理、税收等一系列的问题，真正使我们实现了角色的转换，能够很好的去了解企业在实际的运作过程中真正需要的是什么，对我在日常工作中如何向企业去营销、如何为企业提供更好地投融资服务提供了很大帮助。</p>
                                            <p className="author">——中国农业银行广东省分行投资银行与金融市场部王某</p>
                                        </div>
                                    </div>
                                    : this.state.tab_fb === 'fbc2' ?
                                    <div className="special-tab-cnt-item cl">
                                        <div className="cnt">
                                            <p>在平时的工作中缺乏系统性的理论作为业务开展的指导，经济、行业、企业的分析浮于表面，难以给企业提供有价值的顾问服务，通过培训安排一系列高度关联的实务课程，聘请有实战经验的老师系统的讲解，使得学员进一步武装了头脑，强化了与商业银行有关的理论知识体系，很好的解决了上述问题。</p>
                                            <p className="author">——中国工商银行济宁分行公司业务部冯某</p>
                                        </div>
                                    </div>
                                    : this.state.tab_fb === 'fbc3' ?
                                    <div className="special-tab-cnt-item cl">
                                        <div className="cnt">
                                            <p>针对我自己的项目经理岗位，我认为此次培训让我对工作的认识产生了很多影响，工作方式也有很大程度转变，对项目可行性分析、现金流入流出、投资回报率、财务分析有了更加科学的判断，同时通过分析宏观形式、行业比较、同规模企业横向比对，能客观地分析信贷收益和风险之间的关系。</p>
                                            <p className="author">——中国工商银行济宁分行公司业务部李某</p>
                                        </div>
                                    </div>
                                    : this.state.tab_fb === 'fbc4' ?
                                    <div className="special-tab-cnt-item cl">
                                        <div className="cnt">
                                            <p>平时工作主要遇到为客户提供金融综合服务方案、财务分析、项目评估等问题，急需要学习知识充实自己。但是由于工作压力大，一直没什么时间进行集中学习，现在用手机和电脑看视频学习课程，很方便，效率也有所提高。</p>
                                            <p className="author">——中国建设银行总行苏某</p>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="special-cfc-certify">
                            <h3>认证证书</h3>
                            <div className="cl special-cnt bg-white">
                                <div className="fl"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/90410fb85239e124c0c476aa382064eb.png" alt="" /></div>
                                <div className="fr">
                                    <div className="special-certitem">
                                        <h4>CFC证书国际官方认证机构</h4>
                                        <div>
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/354aa63227ee5ec77fbaeb48e666dcbf.png" alt="" />
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/261125b3b1237ad8e2b88daaf31c0639.png" alt="" />
                                        </div>
                                    </div>

                                    <div className="special-certitem">
                                        <h4>CFC中国官方认证机构</h4>
                                        <div>
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/98dd163d87ebe87cd0893559c006e5ff.png" alt="" />
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/ae2f60727dd1858cad179fb4c65ce277.png" alt="" />
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/23cbe11459fe708678e243f92d8af320.png" alt="" />
                                        </div>
                                    </div>

                                    <div className="special-certitem">
                                        <h4>证书效力</h4>
                                        <p>CFC证书将证明持证人的企业理财专家身份, 是持证人任职、晋级、职称评定的重要依据，在过去的几个月里，中行、建行、农行、广发行、民生行、招行等越来越多的金融机构在用各种不同的方式参与CFC在中国的培训和学习，并将该认证体系纳入其自身的对公客户经理的岗位管理之中。</p>
                                        <div>
                                            <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/35f1021127c36111bd1adb2c614af8c6.png" alt="" />
                                        </div>
                                    </div>

                                    <p className="special-contact">联系客服了解认证详情：4008-363-463     13811977670（徐老师）</p>
                                </div>
                            </div>
                        </div>
                        <div className="special-cfc-question bg-white cl">
                            <h3>常见问题</h3>
                            <div className="special-tab-menu fl">
                                <a href="#" data-key="qa" data-value="qac1" onClick={this.onClickTab} className={(!this.state.tab_qa || this.state.tab_qa === 'qac1') ? 'active' : ''}>CFC证书在国际和国内的实际效力如何？</a>
                                <a href="#" data-key="qa" data-value="qac2" onClick={this.onClickTab} className={this.state.tab_qa === 'qac2' ? 'active' : ''}>CFC证书的影响力如何？</a>
                                <a href="#" data-key="qa" data-value="qac3" onClick={this.onClickTab} className={this.state.tab_qa === 'qac3' ? 'active' : ''}>证书持证人有哪些权益？</a>
                                <a href="#" data-key="qa" data-value="qac4" onClick={this.onClickTab} className={this.state.tab_qa === 'qac4' ? 'active' : ''}>对公从业人员接受CFC认证培训有什么益处？</a>
                                <a href="#" data-key="qa" data-value="qac5" onClick={this.onClickTab} className={this.state.tab_qa === 'qac5' ? 'active' : ''}>报考的条件是什么？</a>
                                <a href="#" data-key="qa" data-value="qac6" onClick={this.onClickTab} className={this.state.tab_qa === 'qac6' ? 'active' : ''}>怎样才能获得证书？</a>
                                <a href="#" data-key="qa" data-value="qac7" onClick={this.onClickTab} className={this.state.tab_qa === 'qac7' ? 'active' : ''}>CFC与AFP、CFP等相比有什么区别？</a>
                            </div>
                            <div className="special-tab-cnt fl">
                                {!this.state.tab_qa || this.state.tab_qa === 'qac1' ?
                                    <div className="special-tab-cnt-item">
                                        <dl>
                                            <dt>国际效力</dt>
                                            <dd>CFC证书的国际认证机构为国际资本市场协会（ICMA）及ICMA中心颁发。全球56个国家，包括几乎世界上所有知名的银行、证券公司、投行和其他金融机构近460家，都属于国际资本市场协会（ICMA）的机构会员。因此，证明其所颁发的证书，代表的权威性更获得行业一致高度认可。</dd>
                                            <dt>国内效力</dt>
                                            <dd>
                                                <p>一、“企业理财顾问服务”行业标准已作为2012年第二批第7个获准立项，通过了国家金融标准技术委员会（简称金标委）的初审，正式进入专家评审程序。</p>
                                                <p>二、经中国人力资源和社会保障部（简称人保部）专家评审，同意将CFC以“新职业、新知识、新技术、新技能等示范性培训项目”纳入国家职业培训CETTIC的统一管理体系，企业理财师的CFC中文证书（副本）将由人保部国家就业培训指导中心颁发，CFC持证人将会获得中国国家人保部的认可。</p>
                                                <p>三、CFC项目纳入国家对中小企业智力扶持的计划之列，纳入“国家银河培训工程”之内，享受国家政策补贴。</p>
                                            </dd>
                                        </dl>
                                    </div>
                                    : this.state.tab_qa === 'qac2' ?
                                    <div className="special-tab-cnt-item">
                                        <p>证书正本由ICMA 及ICMA 中心颁发，副本由国家发改委培训中心加盖钢印。</p>
                                        <p>ICMA作为一个全球性的百年金融协会，它被称为全球金融界“精英协会”，现有近460家机构会员，分布于全球56个国家，其会员包括几乎世界上所有知名的银行、证券公司、投行和其他金融机构，如汇丰银行、摩根士丹利、日本三菱巴克莱证券、花旗环球等， 其所颁发的证书代表的权威性获得行业一致高度认可。几乎全球所有著名的金融机构都是它的会员。而ICMA中心同时隶属于英国雷丁大学，在证书上你会发现代表ICMA中心的是雷丁大学的LOGO，换言之，在国际性的大学中，该证书也被承认。事实上，作为一门特色课程，它也向本校的Corporate finance专业的硕士们推荐，要求他们同时获得CFC职业资格证书。</p>
                                    </div>
                                    : this.state.tab_qa === 'qac3' ?
                                    <div className="special-tab-cnt-item">
                                        <p>1.申请成为ICMA企业理财分会会员，并享受高层次、多方位、集人脉交流与职业能力提升于一体的优质后续服务；</p>
                                        <p>2.申请企业理财顾问师更高级别（CFS）资格认证，并优先享受报读机会；</p>
                                        <p>3.受邀参加秘书处主办或协办的与ICMA在中国的会议及特别活动等，获得与全球知名金融机构高层的直接对话的机会。</p>
                                    </div>
                                    : this.state.tab_qa === 'qac4' ?
                                    <div className="special-tab-cnt-item">
                                        <p>一、满足客户需求。国家货币政策和信贷政策改变以后，客户需要更多的融资渠道和投资途径，所以我们的客户经理也必须以商业银行为平台，整合更多的渠道和途径以满足客户需求；</p>
                                        <p>二、增强竞争力。外资银行、还是证券公司、信托公司、保险等直接投资公司都将是我们本土商业银行强劲的竞争对手，所以我们的对公客户经理必须要学习和了解更全面的企业理财知识；</p>
                                        <p>三、迎接金融开放和国际化。随着国家金融保护期的结束，企业将直接面临着生产资料的国际金融化、目标市场的国际化，商业银行的客户经理作为企业的金融服务提供者，只有承担起企业金融引路人和顾问服务提供者的责任，才能真正赢得客户。</p>
                                    </div>
                                    : this.state.tab_qa === 'qac5' ?
                                    <div className="special-tab-cnt-item">
                                        <p>大学本科学历（或同等学历），从事相关专业工作1年以上（含）。</p>
                                        <p>在读财经及工商管理类硕士研究生（研二以上）或已取得硕士研究生学历（或同等学历）者。</p>
                                        <p>取得国家注册会计师、注册审计师、经济师、精算师、项目管理师、统计师、税务师、律师、会计师等资格者。</p>
                                        <p>取得财经、经济、管理相关专业中级专业技术职称/职业资格者。</p>
                                        <p>大学本科学历（或同等学历），担任企业财务/会计主管、资金等部门经理、内审机构负责人或同等职务者,并任现职超过一年。</p>
                                        <p>大学本科学历（或同等学历），金融或投资机构管理人员/专业人员，并从事现职超过一年。</p>
                                    </div>
                                    : this.state.tab_qa === 'qac6' ?
                                    <div className="special-tab-cnt-item">
                                        <p>参加企业理财顾问师国际职业资格认证的考生，一次性报考全部科目或选择分科参加考试，必须在2年内完成所有统考考试科目（通过的单科成绩保留两年有效），且全部成绩合格（含补考合格），方可申请认证。</p>
                                        <p>考生需要授课时学习成绩与闭卷考试成绩均超过总分的60%，方视为考核通过，须三门均通过考核者，才可获得认证。对其判卷结果有争议的，该考生可以提出书面申请，由企业理财国际职业资格标准委员会组织专家组进行审核，该审核为最终裁定。考试成绩达到评审分数线者为考试合格，否则为不合格；因故已报名但未参加考试者记录为缺考；考生以前参加的考试，成绩合格且在成绩保留期间的，记录为已通过。</p>
                                    </div>
                                    : this.state.tab_qa === 'qac7' ?
                                    <div className="special-tab-cnt-item">
                                        CFC所针对的是企业，AFP和CFP等是针对个人及其家庭。相对个人理财来说，企业理财就复杂的多。首先，个人理财是建立在个人及其家庭有一定的资产的情况下去进行的，而企业理财可能从开始就必须融资；其次，个人有个相对保护期，未成年和退休期都是受保护的，可以光支出而不需要依赖自身而获得收入，而企业从开始筹备（出生前）到清算（死亡后）都必须量入为出，甚至要未收先出；再次，相对个人理财，企业理财更复杂、涉及到更多的不同利益主体；最后，企业理财无论是原材料，还是市场都要综合考虑宏观政策、国际因素等的影响，而个人理财就相对受影响的程度较小。
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        <div className="special-cfc-continue">
                            <h3>持续教育</h3>
                            <div>
                                <p>CFC持续教育学习平台</p>
                                <Link to="/topic/continue" title="" target="_blank">点击进入</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    products: state.products,
    course: state.course,
    chapters: state.chapters,
}) )(Cfc);

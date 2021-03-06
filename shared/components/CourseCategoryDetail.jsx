/**
 * 课程某个分类的详情
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { payType } from '../libs/const';
import { image } from '../libs/utils';

const bundles = {
    '684': '6119033150828969984', // 财富管理
    '662': '6119033148207529984', // 企业理财
    '784': '6137823304406269952', // 互联网金融
    '785': '6119033151063851008', // 资产证券化
};

class CourseCategoryDetail extends Component {
    static propTypes = {
        category: PropTypes.object.isRequired, // 单个分类详情
        courses: PropTypes.array.isRequired, // 包含的课程
        handleBuyCourse: PropTypes.func.isRequired, // 购买课程
    };

    onClickBuy = e => {
        this.props.handleBuyCourse(e);
    };

    renderCourses = list => {
        return list.map((item, index) => {
            return (
                <dd key={index}>
                    <span className="online-title">{index + 1}.{item.course_name}</span>
                    <span className="online-time"><i className="iconfont icon-time"></i>{Math.ceil( ((item.duration || 0) - 0) / 60 / 45 )} 课时</span>
                    <span className="online-price"><i className="iconfont icon-price"></i>{item.course_price}</span>
                    <span className="online-num"><i className="iconfont icon-user"></i>{item.student_count} 人</span>
                    <a href={`/courses/${item.id}`} className="online-content" target="_blank">详情</a>
                    <a href={`/pay?type=${payType.COURSE}&id=${item.id}`} className="online-buy" target="_blank" onClick={this.onClickBuy}>购买</a>
                </dd>
            );
        });
    };

    render() {
        const {category, courses}= this.props;

        let categoryMap = {};
        if (category.items) {
            let cids = category.items.map(item => item.id);

            (courses || []).forEach(item => {
                let c = item.course_category_id;
                if (cids.indexOf(c) >= 0) { // 课程直接归属于二级分类时
                    categoryMap[c] = categoryMap[c] || [];
                    categoryMap[c].push(item);
                } else { // 课程归属于次级分类时
                    item.category_info.forEach(co => {
                        if (cids.indexOf(co.id) >= 0) {
                            categoryMap[co.id] = categoryMap[co.id] || [];
                            categoryMap[co.id].push(item);
                        }
                    });
                }
            })
        }

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
                                        <a href={`/lecturers/${item.id}`} target="_blank">
                                            <img src={image(item.lecturer_avatar, 'nl')} alt={item.lecturer_name} className="fl" />
                                            <div className="fl">
                                                <h4>{item.lecturer_name}</h4>
                                                <p>{item.lecturer_org} {item.lecturer_title}</p>
                                            </div>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        :
                        <p className="no-data">暂无讲师信息</p>
                    }
                </div>
                <div className="online-course bg-white">
                    <h4 className="classify-h4">
                        在线课程
                        <Link to="/pay" query={{type: payType.PACKAGE, id: bundles[category.id]}} className="btn fr" target="_blank" onClick={this.onClickBuy}>购买全部课程</Link>
                    </h4>
                    <dl>
                        {category.items && category.items.length ?
                            category.items.map(((c,i) => {
                                let ret = [<dt><span>{c.name}</span></dt>];
                                if (categoryMap[c.id]) {
                                    ret = ret.concat(this.renderCourses(categoryMap[c.id]));
                                }
                                return ret;
                            }).bind(this))
                            :
                            this.renderCourses(courses)
                        }
                    </dl>
                </div>
                { category.id==784 ?
                    <div className="open-course bg-white">
                        <h4 className="classify-h4">公开课</h4>
                        <div  className="open-summary">
                            <h5>《全球互联网金融商业模式及案例深度解析》公开课</h5>
                            <p>《全球互联网商业模式报告（2015）》由清华大学五道口金融学院互联网金融实验室和阳光互联网创新研究中心的研究人员在国家互联网信息办公室信息服务局的指导下支持下，历时2年，走遍了大半个地球，50多个国家和地区，深度调查研究了1000多家公司，访谈了数千人，查阅了数百万字资料创作而成。</p>
                            <p>清华控股旗下品牌紫荆教育诚邀本报告创作团队，开发出《全球互联网金融商业模及案例深度解析》系列课程，最终凝练成10讲，详尽讲解和深度剖析无法在报告文本中一一展现的大量真实体验和鲜活案例，毫无保留地分享优秀企业的创业模式和成长经验。并特聘互联网金融优秀企业创始人及高管团队、互联网金融行业管理咨询专家、金融行业监管部门加入师资队伍。</p>
                        </div>
                        <ul className="open-course-list">
                            <li>
                                <span className="open-title">第1讲：&emsp;北京&emsp;2016年01月16日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第2讲：&emsp;北京&emsp;2016年02月27日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第3讲：&emsp;北京&emsp;2016年02月28日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第4讲：&emsp;北京&emsp;2016年03月19日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第5讲：&emsp;北京&emsp;2016年03月20日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第6讲：&emsp;北京&emsp;2016年04月15日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第7讲：&emsp;北京&emsp;2016年04月16日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第8讲：&emsp;北京&emsp;2016年04月17日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第9讲：&emsp;北京&emsp;2016年05月14日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                            <li>
                                <span className="open-title">第10讲：&emsp;北京&emsp;2015年05月15日</span>
                                <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                <a href="/topic/finance" target="_blank" className="disabled">已结束</a>
                            </li>
                        </ul>
                    </div>
                    : 
                    <div>{ category.id==785 ?
                        <div className="open-course bg-white">
                            <h4 className="classify-h4">公开课</h4>
                            <div  className="open-summary">
                                <h5>《资产证券化创新实践》公开课</h5>
                                <p>国内第一家聚焦资产证券全流程操作实务，从不同参与主体出发，精解发起、协调、会计、法律、评级、托管、发行、管理以及资产证券化产品投资过程。</p>
                                <p>聚焦学习者“技能掌握“，贯穿实操方法的大量经典案例，深度剖析不同基础资产、不同交易结构，解析和强化交易设计原理、交易结构中的注意事项重点。</p>
                            </div>
                            <ul className="open-course-list">
                                <li>
                                    <span className="open-title">第1期：&emsp;北京&emsp;2015年11月17日－11月28日</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank" className="disabled">已结束</a>
                                </li>
                                <li>
                                    <span className="open-title">第2期：&emsp;上海&emsp;2015年12月02日－12月03日</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>上海</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank" className="disabled">已结束</a>
                                </li>
                                <li>
                                    <span className="open-title">第3期：&emsp;深圳&emsp;2016年01月30日－01月31日</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>博林诺富特酒店</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank" className="disabled">已结束</a>
                                </li>
                                <li>
                                    <span className="open-title">第4期：&emsp;北京&emsp;2016年03月26日－03月27日</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank" className="disabled">已结束</a>
                                </li>
                                <li>
                                    <span className="open-title">第5期：&emsp;上海&emsp;2016年05月28日－05月29日</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>浦东文华东方酒店</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank">立即报名</a>
                                </li>
                                <li>
                                    <span className="open-title">第6期：&emsp;待定</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>待定</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank">立即报名</a>
                                </li>
                                <li>
                                    <span className="open-title">第7期：&emsp;待定</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>待定</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank">立即报名</a>
                                </li>
                                <li>
                                    <span className="open-title">第8期：&emsp;待定</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>待定</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank">立即报名</a>
                                </li>
                                <li>
                                    <span className="open-title">第9期：&emsp;待定</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>待定</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank">立即报名</a>
                                </li>
                                <li>
                                    <span className="open-title">第10期：&nbsp;待定</span>
                                    <span className="open-address"><i className="iconfont icon-address"></i>待定</span>
                                    <span className="open-num"><i className="iconfont icon-user"></i>125 人</span>
                                    <a href="/topic/security" target="_blank">立即报名</a>
                                </li>
                            </ul>
                        </div>
                        : 
                        <div>{ category.id==684 ?
                            <div className="open-course bg-white">
                                <h4 className="classify-h4">教育培训项目</h4>
                                <div  className="open-summary">
                                    <h5>《高级财富规划师》教育培训项目</h5>
                                    <p>通过集中组织精英理财经理参与“迈入一流金融学院、掌握财富规划实战”学习活动，让理财精英感受清华文化，夯实金融及财富规划的职业素养与专业知识，提升综合金融素质和市场开拓能力。</p>
                                </div>
                                <ul className="open-course-list">
                                    <li>
                                        <span className="open-title">第1期：&emsp;北京&emsp;时间待定</span>
                                        <span className="open-address"><i className="iconfont icon-address"></i>五道口金融学院</span>
                                        <a href="/topic/plan" target="_blank">立即报名</a>
                                    </li>
                                </ul>
                            </div>
                            :
                            null
                        }
                        </div>
                    }
                    </div>
                }
            </div>
        );
    }
}


module.exports = CourseCategoryDetail;


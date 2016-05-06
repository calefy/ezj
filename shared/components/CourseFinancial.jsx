/**
 * 课程金融领导力分类
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class CourseFinancial extends Component {
    render() {
        return (
            <div className="page-finance">
                <div className="classify-title">
                    <h4>金融领导力</h4>
                    <p>在竞争变化格局中，互联网技术发展颠覆了金融行业运营的传统思维，各种新兴的金融业态让整个金融业都面临着更加复杂、多元的挑战。而基于企业经营的价值链，管理者需要更多的互联网思维，来应对特定商业环境中的金融变革，以及金融企业如何进行资源配置，实现创造价值，传递价值和获取价值的业务路径。紫荆教育金融领导力项目是市场上首个全方位、系统性的金融培养和能力建设项目，旨在解决很多金融机构及其领导团队通常面临的关键增长问题，加强建设规模化、制度化的能力，加速企业转型与创新， 打造金融符复合型人才队伍。</p>
                </div>

                <div className="part1 tac">
                    <h2>紫荆教育金融领导力项目</h2>
                    <p>咨询电话：010-62771644</p>
                </div>

                <div className="part2">
                    <div className="tac"><img src="http://zj-avatar.img-cn-beijing.aliyuncs.com/62b79f98a9f042a5238f16c95a9fed86627821413.png@100p" alt=""/></div>
                    <div className="wrap cl">
                        <div className="box fl">
                            <h4>增长、转型、创新时代的金融领导力挑战</h4>
                            <ul>
                                <li>应对不确定性能力</li>
                                <li>以客户为中⼼的创新能力</li>
                                <li>快速反应能⼒</li>
                                <li>跨界思考能⼒</li>
                                <li>决策担当能⼒</li>
                                <li>凝聚团队的能⼒</li>
                            </ul>
                        </div>
                        <div className="box fr">
                            <h4>增长、转型、创新时代的金融领导力发展</h4>
                            <ul>
                                <li>时代呼唤金融复合型人才</li>
                                <li>改变传统的培训模块堆积，体现、强化时效性学习／变</li>
                                <li>革实践与内／外讲师两个相结合突破行业、组织、岗位</li>
                                <li>框是培养跨界思考能力的核心</li>
                                <li>“个性化”学习是培养决策勇气与担当能力前提</li>
                            </ul>
                        </div>
                    </div>
                    <p className="help tac">课程目标：培养具有市场洞察能力、专业决策能力和织协调能力为一体的金融复合型人才队伍</p>
                </div>

                <div className="part3 tac">
                    <h3>培养理念与方法</h3>
                    <div><img src="http://zj-avatar.img-cn-beijing.aliyuncs.com/cede4d4fda661497ce44150a9fa168641800096224.png@100p" alt=""/></div>
                </div>

                <div className="part4">
                    <h3 className="tac">紫荆解决方案</h3>
                    <dl className="cases cl">
                        <dt>高层</dt>
                        <dd>帮助获取最前沿知识理论实践、掌握宏观经济分析，学习最新金融动态、把握企业经营模式、提示创新产品技能、增强决策担当勇气</dd>
                        <dt>中层</dt>
                        <dd>从领导力、团队管理、风险意识、营销能力出发。通过个性化培养和多样化案例实战，夯实专业，提升技能，帮助其快速成长，打造全方位复合型管理人才</dd>

                        <dt>基层</dt>
                        <dd>以最高效和最低成本，最大概率的传播方法，帮助企业传播公司文化理念、战略、业务、制度、规范、职场技能、提升客户服务技能、风险防范机制，产品业务知识等</dd>
                    </dl>

                    <div className="more cl">
                        <dl>
                            <dt>平台混合</dt>
                            <dd>E-Learning/M-Learning<br/>微信社交学习</dd>
                        </dl>
                        <dl>
                            <dt>技术混合</dt>
                            <dd>教练辅导<br/>行动学习</dd>
                        </dl>
                        <dl>
                            <dt>资源混合</dt>
                            <dd>内部资源<br/>外部资源</dd>
                        </dl>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = CourseFinancial;


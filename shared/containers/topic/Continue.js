import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'

import CoursesAction from '../../actions/CoursesAction';
import OperateAction from '../../actions/OperateAction';

if (process.env.BROWSER) {
    require('css/special.css');
}

const CATEGORY_ID = '689'; // CFC持续教育课程分类ID

class Continue extends React.Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadCourseCategory(CATEGORY_ID) ),
            dispatch( courseAction.loadCourseCategoryCourses(CATEGORY_ID) )
        ]);
    }

    componentDidMount() {
        const {course_category, category_courses} = this.props;
        if (course_category.isFetching || category_courses.isFetching) {
            Continue.fetchData(this.props);
        }
    }

    // 点击检查登录
    onClickToLogin = e => {
        if (!(this.props.user.data && this.props.user.data.uid)) {
            e.preventDefault();
            e.nativeEvent.returnValue = false;

            let operateAction = new OperateAction();
            this.props.dispatch(operateAction.openLoginDialog());
        }
    };

    render() {
        const { course_category, category_courses } = this.props;
        let categories = course_category.data && course_category.data.items || [];
        // 课程map：categoryId=>course
        let courseMap = {};
        (category_courses.data && category_courses.data.list || []).forEach(item => {
            let c = item.course_category_id;
            courseMap[c] = courseMap[c] || [];
            courseMap[c].push(item);
        });

        return (
            <div className="special-continue wide">
                <div className="special-banner cl">
                    <div className="container">
                        <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/0d79a42d379bb1666e7b48d6747f9971.png" />
                    </div>
                </div>
                <div className="special-summary">
                    <div className="container">
                        <div className="special-continue-title nop">
                            <h2>概述</h2><div><span className="diamond"></span><span className="diamond"></span><span className="diamond"></span></div>
                        </div>
                        <div>
                            <p>CFC持续教育是企业理财国际职业资格认证执行委员会秘书处（中国）为持证人量身定制的教育形式。持证人在资格证书的报告期内（自获得证书签发之日起，每两年为一个报告期），完成规定的60学分，如未达到将无法进行证书再认证。</p>
                            <p>持证人可通过线上学习、线下活动、课堂活动、公开发表论文/出版著作、在职教育、担任专业组委员等多种形式获得学分。</p>
                            <p>在线学习部分采用“视频课程”学习和“在线答题”两种方式，此两项是CFC携手清华控股旗下品牌紫荆教育为CFC持证人专程打造的在线课程。具体积分规则如下：</p>
                            <div className="table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>积分项目</th>
                                            <th>分值</th>
                                            <th>分值分布</th>
                                            <th>积分上限</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>视频课程</td>
                                            <td>10分/课</td>
                                            <td>完成视频交互且课程测验准确率&gt;=60%</td>
                                            <td>40分</td>
                                        </tr>
                                        <tr>
                                            <td>在线答题</td>
                                            <td>5分/套</td>
                                            <td>每套题的答题准确率70%以上</td>
                                            <td>20分</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <ul className="cl">
                                <li>
                                    <p>注：（1）视频互动：视频播放过程中随时可能弹出的互动测验题目；</p>
                                    <p className="tx-indent">（2）课程测验：测验内容与视频内容关联；</p>
                                    <p className="tx-indent">（3）课程测验和在线答题均可重复答题，取最高答题准确率积分。</p>
                                    <p className="tx-indent">（4）目前持证人在CFC官网积分和紫荆学习的积分暂时分开计算。</p>
                                </li>
                                <li>
                                    <p>学员可通过网站 “ <Link to="" className="buy">我的账号</Link> ” 下的 “ 我的学分 ” 查看具体学分情况</p>
                                    <p>联系电话：010-63908406、63908419</p>
                                    <p>CFC公众微信号：cfcworks</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="special-courses" id="course">
                    <div className="container">
                        <div className="special-continue-title nop">
                            <h2>课程视频</h2><div><span className="diamond"></span><span className="diamond"></span><span className="diamond"></span></div>
                        </div>
                        <div className="online-course">
                            {course_category.isFetching || category_courses.isFetching ?
                                <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                                :
                                categories.map((category, i) => {
                                        return (
                                            <dl key={i}>
                                                <dt><span>{category.name}</span></dt>
                                                {(courseMap[category.id] || []).map((item, index) => {
                                                    return (
                                                        <dd className="bg-white" key={index}>
                                                            <span className="online-title">{index + 1}.{item.course_name}</span>
                                                            <span className="online-time">
                                                                <i className="iconfont icon-time"></i>{Math.ceil(item.duration / 60 / 60 / 45)} 课时
                                                            </span>
                                                            <span className="online-price">
                                                                <i className="iconfont icon-price"></i>{item.course_price}
                                                            </span>
                                                            <span className="online-num">
                                                                <i className="iconfont icon-user"></i>{item.student_count} 人
                                                            </span>
                                                            <a href={`/courses/${item.id}`} className="online-content" target="_blank">详情</a>
                                                        </dd>
                                                    );
                                                })}
                                            </dl>
                                        );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="special-test" id="quiz">
                    <div className="container">
                        <div className="special-continue-title nop">
                            <h2>在线答题</h2><div><span className="diamond"></span><span className="diamond"></span><span className="diamond"></span></div>
                        </div>
                        <p>学员可以通过答题获得学分，每套试卷为50道题，均为单选题型。每套试卷答题准确率在70%以上可获得5学分，最多可获得20学分。每次答题，系统将随机为学员分配一套试卷。</p>
                        <Link to="/topic/continue/test" className="btn" onClick={this.onClickToLogin}>开始答题</Link>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    user: state.user,
    course_category: state.course_category,
    category_courses: state.category_courses,
}) )(Continue);

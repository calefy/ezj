import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { toTimeString, avatar } from '../../libs/utils';

import CoursesAction from '../../actions/CoursesAction';

class Course extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadCourseDetail(params.courseId) ), // 课程详情,包含讲师
            dispatch( courseAction.loadCoursePrivate(params.courseId) ), // 课程私密信息
            dispatch( courseAction.loadCourseChapters(params.courseId) ), // 课程章节
            dispatch( courseAction.loadCourseStudents(params.courseId) ), // 课程学员
        ]);
    }

    componentDidMount() {
        const { course, course_private, params } = this.props;
        if (course.isFetching ||// course_private.isFetching ||
                (course.data && course.data.id != params.courseId)) {
            Course.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.params.courseId != nextProps.params.courseId) {
            const courseAction = new CoursesAction();
            nextProps.dispatch( courseAction.loadCourseDetail(nextProps.params.courseId) ); // 课程详情,包含讲师
            nextProps.dispatch( courseAction.loadCoursePrivate(nextProps.params.courseId) ); // 课程私密信息
            nextProps.dispatch( courseAction.loadCourseChapters(nextProps.params.courseId) ); // 课程章节
            nextProps.dispatch( courseAction.loadCourseStudents(nextProps.params.courseId) );
        }
    }

    /**
     * 点击显示测验内容
     */
    onClickExam = e => {
        const examId = this.props.course.data.course_examination_id;
        console.log(examId);
        const courseAction = new CoursesAction();
        this.props.dispatch( courseAction.loadCourseExamination(examId) );
    };

    render() {
        let course = this.props.course.data || {};
        let examination = this.props.examination.data || {};
        let questions = examination.questions || [];
        examination = examination.examination || {};
        console.log(examination);

        return (
            <div className="content course-test">
                <h2>【测验】{course.course_examination_id > 0 ? <button type="button" onClick={this.onClickExam}>点击展示</button> : '无'}</h2>
                {course.course_examination_id <= 0 ?
                    null :
                    <div className="course-test-info">
                        <h4>{examination.examination_title}</h4>
                        <dl>
                            {questions.map((item, index) => {
                                let q = item.question;
                                let os = item.options;
                                return [
                                    <dt key={index}>
                                        {index + 1}.
                                        <div className="dib vat" dangerouslySetInnerHTML={{__html: q.examination_question_content}} />
                                    </dt>,
                                    os.map((o, i) => {
                                        return <dd key={i}>{String.fromCharCode(65 + i)}. {o.option_text}</dd>
                                    })
                                ];
                            })}
                        </dl>
                    </div>
                }
                <div className="course-test-info">
                    <h2><i className="iconfont icon-chapter"></i>BCG战略调色板对中国金融机构的启示和应用</h2>
                    <div className="course-test-num">
                        <dl className="cl">
                            <dt>题目数量:</dt>
                            <dd><em>6</em>道题</dd>
                        </dl>
                        <dl className="cl">
                            <dt>单选题:</dt>
                            <dd><em>6</em>道题</dd>
                        </dl>
                        <dl className="cl">
                            <dt>多选题:</dt>
                            <dd><em>0</em>道题</dd>
                        </dl>
                    </div>
                    <button className="btn" type="button" onClick={this.onClickExam}>开始答题</button>
                </div>
                <div className="course-test-question">
                    <h3>
                        <p>单项选择题</p>
                        <p>已做<em className="course-test-already">1</em>题 / 共<em class="course-test-all">6</em>题</p>
                    </h3>
                    <dl className="course-test-question-info">
                        <dt>
                            <em>1.</em><div className="dib vat">波士顿咨询公司的创始人、战略学的先驱是（）</div>
                        </dt>
                        <dd><input type="radio" />A. 马丁·瑞夫斯</dd>
                        <dd><input type="radio" />B. 布鲁斯·亨德森</dd>
                        <dd><input type="checkbox" />C. 迈克尔·波特</dd>
                        <dd><input type="radio" />D. 伊恩·里德</dd>
                    </dl>
                    <div className="course-test-question-btn">
                        <Link to="" className="btn btn-gray">上一题</Link>
                        <Link to="" className="btn">下一题</Link>
                        <Link to="" className="btn">跳过</Link>
                        <Link to="" className="btn">提交答卷</Link>
                    </div>
                </div>
                <div className="course-test-result">
                    <h2><i className="iconfont icon-chapter"></i>课程测验结果</h2>
                    <h4>BCG战略调色板对中国金融机构的启示和应用【课程测试】</h4>
                    <div className="course-test-num">
                        <dl className="cl">
                            <dt>题目数量</dt>
                            <dd>8道题</dd>
                        </dl>
                        <dl className="cl">
                            <dt>正确率</dt>
                            <dd>38%</dd>
                        </dl>
                        <dl className="cl">
                            <dt>答题日期</dt>
                            <dd>2014.12.04</dd>
                        </dl>
                    </div>
                    <div style={{ position: "relative"}}>
                        <button className="btn" type="button" onClick={this.onClickExam}>重新测验</button>
                        <Link to="" className="course-test-see">查看答案</Link>
                    </div>
                </div>

                    <div className="result-content course-result-content">
                        <dl>
                            <dt>1.一般情况下，新发行基金的封闭期不得超过（ ）</dt>
                            <dd>
                                <input type="checkbox" value="option1" />
                                <span>A.域名是数字</span>
                                <em className="true fr">正确答案：C</em>
                            </dd>
                            <dd>
                                <input type="checkbox" value="option1" />
                                <span>A.域名是数字</span>
                            </dd>
                            <dd>
                                <input type="checkbox" value="option1" />
                                <span>A.域名是数字</span>
                            </dd>
                            <dd>
                                <input type="checkbox" value="option1" />
                                <span>A.域名是数字</span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>2.假设有一支新设立的基金，发行份额共1亿份，每个份额的初始价值1元。基金经理买入200万股股票A，300万股股票B，250万股股票C，三只股票的价格变化如下。
那么一个月后，该基金的基金净值为（ ），此时有新的投资者希望能够认购该基金，请问此时基金的申购价格应为（ ），基金公司一共收到了300万份基金申购，那
么此时该基金的总规模为（ ）亿 股票A 股票B 股票C 买入价格20、10、10，一个月后市价18、12、14。</dt>
                            <dd>
                                <input type="checkbox" value="option1" />
                                <span>A.1.12 1.12 1.1536</span>
                                <em className="true fr">正确答案：C</em>
                            </dd>
                            <dd>
                                <input type="checkbox" value="option1" />
                                <span>B.1.12 1.12 0.9874</span>
                            </dd>
                            <dd>
                                <input type="checkbox" value="option1" />
                                <span>C.1.00 1.12 1.1536</span>
                            </dd>
                            <dd>
                                <input type="checkbox" value="option1" />
                                <span>D.1.23 1.23 0.9874</span>
                            </dd>
                            <p>答案解析：答案解析答案解析答案解析</p>
                        </dl>
                    </div>
            </div>
        );
    }
}


module.exports = connect( state => ({
    course: state.course,
    course_private: state.course_private,
    chapters: state.chapters,
    students: state.students,
    examination: state.examination,
}) )(Course);


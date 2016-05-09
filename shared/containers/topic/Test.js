import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import {getRequestTypes} from '../../libs/utils';
import CoursesAction from '../../actions/CoursesAction';

if (process.env.BROWSER) {
    require('css/special.css');
}

const examId = 4608; // 测试用10道题试卷：3926
const organizationId = 4958; // 持续教育

let Exam = React.createClass({
    // 初始加载数据
    statics: {
        fetchData: function({dispatch, params={}, location={}, apiClient}) {
            const courseAction = new CoursesAction({ apiClient });
            let arr = [
                dispatch( courseAction.loadExamination(examId) ),
            ];
            //if (params.sheetId) {
            //    arr.push(
            //        dispatch( courseAction.loadSheet(params.sheetId) )
            //    );
            //}
            return Promise.all(arr);
        }
    },
    getInitialState: function() {
        return {
            reexam: false, // 重新测验
            start: false, // 开始测验
            viewAnswer: false, // 查看答案
            index: 0, // 当前测验序号
        };
    },

    answers: {},
    time: 0,

    componentDidMount: function() {
        this.loadNeededData(this.props);
    },
    componentWillReceiveProps: function(nextProps) {
        this.loadNeededData(nextProps);

        const type = getRequestTypes(CoursesAction.SUBMIT_SHEET);
        switch(nextProps.action.type) {
            case type.success:
                this.setState({ reexam: false, start: false })
                break;
            case type.failure:
                alert(nextProps.action.error && nextProps.action.error.message || '提交测验失败');
                break;
        }
    },

    loadNeededData: function(props) {
        const { examination, sheet, params } = props;
        const courseAction = new CoursesAction();
        if (!examination._req || examination._req.examId !== examId) {
            props.dispatch(courseAction.loadExamination(examId));
        }
    },

    setCurrentIndexAnswer: function() {
        let questions = this.props.examination.data.questions || [];
        // 保存当前题的答案
        let curQuestion = questions[this.state.index];
        let answerIds = [];
        for (let key in this.refs) {
            if (/answer_/.test(key) && this.refs[key].checked) {
                answerIds.push(this.refs[key].value);
            }
        }
        this.answers[curQuestion.question.id] = answerIds;
    },
    clearCurrentChecked: function() {
        for (let key in this.refs) {
            if (/answer_/.test(key) && this.refs[key].checked) {
                this.refs[key].checked = false;
            }
        }
    },
    onClickBegin: function(e) {
        e.preventDefault();
        this.time = (new Date()).getTime();
        this.setState({ index: 0, start: true });
    },
    onPrev: function(e) {
        e.preventDefault();
        if (e.currentTarget.getAttribute('disabled') !== null) return;

        if (!e.currentTarget.getAttribute('data-nosave')) {
            this.setCurrentIndexAnswer();
        }

        this.clearCurrentChecked();

        let index = Math.max(0, this.state.index - 1);
        if (index !== this.state.index) {
            this.setState(Object.assign({}, this.state, {index: index}));
        }
    },
    onNext: function(e) {
        e.preventDefault();
        if (e.currentTarget.getAttribute('disabled') !== null) return;

        let questions = this.props.examination.data.questions || [];

        if (!e.currentTarget.getAttribute('data-nosave')) {
            this.setCurrentIndexAnswer();

            let cur = questions[this.state.index].question;
            // 无答案
            if (!(this.answers[cur.id].length)) {
                alert('请选择该题答案！');
                return;
            }
        }

        this.clearCurrentChecked();
        // 跳转题目
        let index = Math.min(questions.length, this.state.index + 1);
        if (index !== this.state.index) {
            this.setState(Object.assign({}, this.state, {index: index}));
        }
    },
    onSkip: function(e) {
        e.preventDefault();

        this.clearCurrentChecked();

        // 设置当前题目答案为空
        let questions = this.props.examination.data.questions || [];
        let cur = questions[this.state.index].question;
        this.answers[cur.id] = [];

        // 执行跳转
        let index = Math.min(questions.length, this.state.index + 1);
        if (index !== this.state.index) {
            this.setState(Object.assign({}, this.state, {index: index}));
        }
    },
    onSubmit: function(e) {
        e.preventDefault();
        this.setCurrentIndexAnswer();
        // 检查当前题目是否有答案
        let questions = this.props.examination.data.questions || [];
        let cur = questions[this.state.index].question;
        if (!(this.answers[cur.id].length)) {
            alert('请选择该题答案！');
            return;
        }

        let model = {
            organization_id: organizationId,
            examination_id: examId,
            sheet_cost_time: Math.ceil(((new Date()).getTime() - this.time) / 1000),
            answers: [],
        };
        for (let qid in this.answers) {
            model.answers.push({
                examination_question_id: qid,
                answer_content: this.answers[qid].join(','),
            });
        }

        if (model.answers.length < questions.length) {
            alert('还有问题未回答，请全部答完后再提交');
            return;
        }

        model.answers = JSON.stringify(model.answers);

        const courseAction = new CoursesAction();
        this.props.dispatch(courseAction.submitSheet(model));
    },

    // 重新测验
    onReExam: function(e) {
        this.answers = {};
        this.time = (new Date()).getTime();
        this.setState({ index: 0, start: true, reexam: true });
    },
    // 查看答案
    onViewAnswers: function(e) {
        e.preventDefault();
        this.setState({viewAnswer: !this.state.viewAnswer, index: 0});
    },

    render: function() {
        const {examination, sheet, params} = this.props;
        // loading
        if (examination.isFetching) {
            return  <div className="model-test">
                        <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                    </div>
        }

        // 准备好具体的数据
        let exam = examination.data && examination.data.examination || {};
        let questions = examination.data && examination.data.questions || [];
        let sheetData = sheet.data && sheet.data.sheet;
        let answers = sheet.data && sheet.data.answers || [];

        // 根据exam信息设置title
        if (process.env.BROWSER && document.title !== exam.examination_title) {
            document.title = exam.examination_title;
        }

        let answerMap = {};
        answers.map(item => {
            answerMap[item.examination_question_id] = item;
        });

        // 遍历问题，统计单选、多选数量
        let singleNumber = 0, multiNumber = 0;
        questions.forEach(item => {
            if (item.examination_question_is_multi) {
                multiNumber++;
            } else {
                singleNumber++;
            }
        });

        let curQuestion = questions.length > this.state.index ? questions[this.state.index] : {};
        let correctText = [];
        let correctIds = [];
        (curQuestion.options || []).forEach((o, i) => {
            if (o.is_correct) {
                correctIds.push(o.id);
                correctText.push(String.fromCharCode(65 + i));
            }
        });

        let firstIndex = this.state.index === 0;
        let lastIndex = this.state.index + 1 === questions.length;

        return (
            <div className="special-continue-test">
                <div className="special-banner cl">
                    <div className="container">
                        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/0d79a42d379bb1666e7b48d6747f9971.png" />
                    </div>
                </div>
                <div className="container">
                {!sheetData || this.state.reexam ?
                    !this.state.start ?
                        <div className="course-test-info">
                            <h2><i className="iconfont icon-chapter"></i>{exam.examination_title}【课程测试】</h2>
                            <div className="course-test-num">
                                <dl className="cl">
                                    <dt>题目数量:</dt>
                                    <dd><em>{questions.length}</em>道题</dd>
                                </dl>
                                <dl className="cl">
                                    <dt>单选题:</dt>
                                    <dd><em>{singleNumber}</em>道题</dd>
                                </dl>
                                <dl className="cl">
                                    <dt>多选题:</dt>
                                    <dd><em>{multiNumber}</em>道题</dd>
                                </dl>
                            </div>
                            <button className="btn" type="button" onClick={this.onClickBegin}>开始答题</button>
                        </div>
                        :
                        <div className="course-test-question">
                            <h2>
                                <p>{curQuestion.question && curQuestion.question.examination_question_is_multi ? '多' : '单'}选题</p>
                                <p>已做 <em className="course-test-already">{this.state.index + 1}</em> 题 / 共 {questions.length} 题</p>
                            </h2>
                            <dl className="course-test-question-info">
                                <dt>
                                    <div className="fl">{this.state.index + 1}.</div>
                                    <div dangerouslySetInnerHTML={{__html: curQuestion.question && curQuestion.question.examination_question_content}}></div>
                                </dt>
                                {(curQuestion.options || []).map((item, index) => {
                                    let answer = this.answers[curQuestion.question.id] || [];
                                    let isAnswered = answer.indexOf(item.id) >= 0;
                                    return  <dd key={index}>
                                                <label>
                                                    <input type={curQuestion.question.examination_question_is_multi ? 'checkbox' : 'radio'} name={curQuestion.question.examination_question_is_multi ? 'answer[]' : 'answer'} value={item.id} ref={`answer_${index}`} defaultChecked={isAnswered} />
                                                    {String.fromCharCode(65 + index)}. {item.option_text}
                                                </label>
                                            </dd>
                                })}
                            </dl>
                            <div className="course-test-question-btn">
                                <a href="#" className={firstIndex ? 'btn disabled' : 'btn'} disabled={firstIndex} onClick={this.onPrev}>上一题</a>
                                <a href="#" className={lastIndex ? 'btn disabled' : 'btn'} disabled={lastIndex} onClick={this.onNext}>下一题</a>
                                <a href="#" className={lastIndex ? 'btn disabled' : 'btn'} disabled={lastIndex} onClick={this.onSkip}>跳过</a>
                                <a href="#" className={!lastIndex ? 'btn disabled' : 'btn'} disabled={!lastIndex} onClick={this.onSubmit}>提交答卷</a>
                            </div>
                        </div>
                    :
                    <div className="course-test-result">
                        <h2><i className="iconfont icon-chapter"></i>课程测验结果</h2>
                        <h4>{exam.examination_title}【课程测试】</h4>
                        <div className="course-test-num">
                            <dl className="cl">
                                <dt>题目数量</dt>
                                <dd>{questions.length}道题</dd>
                            </dl>
                            <dl className="cl">
                                <dt>正确率</dt>
                                <dd>{((sheetData.sheet_score || 0) - 0).toFixed(2)}%</dd>
                            </dl>
                            <dl className="cl">
                                <dt>答题日期</dt>
                                <dd>{sheetData.sheet_submitted_time}</dd>
                            </dl>
                        </div>
                        <div style={{ position: "relative"}}>
                            <a className="btn" onClick={this.onReExam}>重新测验</a>
                            <a href="#" className="course-test-see" onClick={this.onViewAnswers}>{this.state.viewAnswer ? '收起' : '查看'}答案</a>
                        </div>
                    </div>
                }

                {this.state.viewAnswer ?
                    <div className="result-content course-result-content">
                        {questions.map((item, index) => {
                            let correctText = [];
                            let correctIds = [];
                            item.options.forEach((o, i) => {
                                if (o.is_correct) {
                                    correctIds.push(o.id);
                                    correctText.push(String.fromCharCode(65 + i));
                                }
                            });
                            let answer = answerMap[item.question.id];
                            answer = answer && answer.answer_content.split(',') || [];

                            return (
                                <dl key={index}>
                                    <dt>
                                        <span className="fl">{index + 1}.</span>
                                        <div dangerouslySetInnerHTML={{__html: item.question.examination_question_content}} />
                                    </dt>
                                    {item.options.map((o, i) => {
                                        let isChecked = answer.indexOf(o.id) >= 0; // 用户是否选择
                                        let isAnswer = correctIds.indexOf(o.id) >= 0; // 是否是正确答案
                                        return (
                                            <dd key={i}>
                                                <input type={item.question.examination_question_is_multi ? 'checkbox' : 'radio'} defaultChecked={isChecked} disabled/>
                                                <span className={isAnswer ? 'text-success' : isChecked ? 'text-error' : ''}>{String.fromCharCode(65 + i)}.{o.option_text}</span>
                                                {i === 0 ?
                                                    <em className="true fr">正确答案：{correctText.join(',')}</em>
                                                    : null
                                                }
                                            </dd>
                                        );
                                    })}
                                </dl>
                            );
                        })}
                    </div>
                    : null
                }
                </div>
            </div>
        );
    }
});

module.exports = connect( state => ({
    action: state.action,
    examination: state.examination,
    sheet: state.sheet,
}) )(Exam);

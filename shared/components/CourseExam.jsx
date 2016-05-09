import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import {getRequestTypes} from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';

class CourseExam extends Component {
    static propTypes = {
        course: PropTypes.object.isRequired,
        examination: PropTypes.object.isRequired,
        sheet: PropTypes.object.isRequired,
        onLoadSheet: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        reexam: false, // 重新测验
        start: false, // 开始测验
        viewAnswer: false, // 查看答案
        index: 0, // 当前测验序号
    };
    answers = {};
    time = 0;

    componentWillReceiveProps(nextProps) {
        const type = getRequestTypes(CoursesAction.SUBMIT_SHEET);
        switch(nextProps.action.type) {
            case type.success:
                this.setState({ reexam: false, start: false })
                break;
            case type.failure:
                alert(nextProps.action.error && nextProps.action.error.message || '提交测验失败');
                break;
        }
    }

    setCurrentIndexAnswer = () => {
        let questions = this.props.examination.questions || [];
        // 保存当前题的答案
        let curQuestion = questions[this.state.index];
        let answerIds = [];
        for (let key in this.refs) {
            if (/answer_/.test(key) && this.refs[key].checked) {
                answerIds.push(this.refs[key].value);
            }
        }
        this.answers[curQuestion.question.id] = answerIds;
    };
    clearCurrentChecked = () => {
        for (let key in this.refs) {
            if (/answer_/.test(key) && this.refs[key].checked) {
                this.refs[key].checked = false;
            }
        }

        // 因設置checked后，defaultChecked失效，因此需要js動態設置一次
        let _this = this;
        setTimeout(() => {
            let questions = this.props.examination.questions || [];
            let curQuestion = questions[this.state.index];
            let answerIds = this.answers[curQuestion.question.id];
            if (answerIds && answerIds.length) {
                for (let key in this.refs) {
                    if (/answer_/.test(key) &&
                        answerIds.indexOf(this.refs[key].value) >= 0 && !this.refs[key].checked) {
                        this.refs[key].checked = true;
                    }
                }
            }
        }, 10);
    };
    onClickBegin = e => {
        this.time = (new Date()).getTime();
        this.setState({ index: 0, start: true });
    };
    onPrev = e => {
        this.setCurrentIndexAnswer();
        this.clearCurrentChecked();

        let index = Math.max(0, this.state.index - 1);
        if (index !== this.state.index) {
            this.setState(Object.assign({}, this.state, {index: index}));
        }
    };
    onNext = e => {
        this.setCurrentIndexAnswer();

        let questions = this.props.examination.questions || [];
        let cur = questions[this.state.index].question;
        // 无答案
        if (!(this.answers[cur.id].length)) {
            alert('请选择该题答案！');
            return;
        }

        this.clearCurrentChecked();
        // 跳转题目
        let index = Math.min(questions.length, this.state.index + 1);
        if (index !== this.state.index) {
            this.setState(Object.assign({}, this.state, {index: index}));
        }
    };
    onSkip = e => {
        this.clearCurrentChecked();

        // 设置当前题目答案为空
        let questions = this.props.examination.questions || [];
        let cur = questions[this.state.index].question;
        this.answers[cur.id] = [];

        // 执行跳转
        let index = Math.min(questions.length, this.state.index + 1);
        if (index !== this.state.index) {
            this.setState(Object.assign({}, this.state, {index: index}));
        }
    };
    onSubmit = e => {
        e.preventDefault();
        this.setCurrentIndexAnswer();

        const { course, examination } = this.props;
        let exam = examination.examination;
        let model = {
            course_id: course.id,
            examination_id: exam.id,
            sheet_cost_time: Math.ceil(((new Date()).getTime() - this.time) / 1000),
            answers: [],
        };
        for (let qid in this.answers) {
            model.answers.push({
                examination_question_id: qid,
                answer_content: this.answers[qid].join(','),
            });
        }

        if (model.answers.length < examination.questions.length) {
            alert('还有问题未回答，请全部答完后再提交');
            return;
        }

        model.answers = JSON.stringify(model.answers);
        this.props.onSubmit(model);
    };

    // 重新测验
    onReExam = e => {
        this.answers = {};
        this.time = (new Date()).getTime();
        this.setState({ index: 0, start: true, reexam: true });
    };
    // 查看答案
    onViewAnswers = e => {
        e.preventDefault();
        this.setState({viewAnswer: !this.state.viewAnswer});
        // 如果查看答案，需要检测是否有答案
        if (!this.state.viewAnswer) {
            if (!this.props.sheet.answers) {
                let sheet = this.props.sheet.list;
                sheet = sheet && sheet[0];
                this.props.onLoadSheet(sheet.sheet_id || sheet.id);
            }
        }
    };

    render() {
        let examination = this.props.examination.examination || {};
        let questions = this.props.examination.questions || [];
        let curQuestion = questions.length > this.state.index ? questions[this.state.index] : {};

        let sheetData = this.props.sheet;
        let sheetList = sheetData.list || [];
        let sheet = sheetList.length ? sheetList[0] : sheetData.sheet ? sheetData.sheet : null;

        let answerMap = {};
        (sheetData.answers || []).map(item => {
            answerMap[item.examination_question_id] = item;
        });

        // 遍历问题，统计单选、多选数量
        let singleNumber = 0, multiNumber = 0;
        questions.forEach(item => {
            if (item.question.examination_question_is_multi) {
                multiNumber++;
            } else {
                singleNumber++;
            }
        });

        let firstIndex = this.state.index === 0;
        let lastIndex = this.state.index + 1 === questions.length;

        return (
            <div className="content course-test">

                {!sheet || this.state.reexam ?
                    <div>
                        {!this.state.start ?
                            <div className="course-test-info">
                                <h2><i className="iconfont icon-chapter"></i>{examination.examination_title}</h2>
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
                                <h3>
                                    <p>{curQuestion.question && curQuestion.question.examination_question_is_multi ? '多' : '单'}项选择题</p>
                                    <p>已做<em className="course-test-already">{this.state.index + 1}</em>题 / 共<em className="course-test-all">{questions.length}</em>题</p>
                                </h3>
                                <dl className="course-test-question-info">
                                    <dt>
                                        <em>{this.state.index + 1}.</em>
                                        <div className="dib vat" dangerouslySetInnerHTML={{__html: curQuestion.question && curQuestion.question.examination_question_content}}></div>
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
                                    <button type="button" className={`btn ${firstIndex ? 'disabled' : ''}`} disabled={firstIndex} onClick={this.onPrev}>上一题</button>
                                    <button type="button" className={`btn ${lastIndex ? 'disabled' : ''}`} disabled={lastIndex} onClick={this.onNext}>下一题</button>
                                    <button type="button" className={`btn ${lastIndex ? 'disabled' : ''}`} disabled={lastIndex} onClick={this.onSkip}>跳过</button>
                                    <button type="button" className={`btn ${lastIndex ? '' : 'disabled'}`} disabled={!lastIndex} onClick={this.onSubmit}>提交答卷</button>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <div className="course-test-result">
                            <h2><i className="iconfont icon-chapter"></i>课程测验结果</h2>
                            <h4>{examination.examination_title}</h4>
                            <div className="course-test-num">
                                <dl className="cl">
                                    <dt>题目数量</dt>
                                    <dd>{questions.length}道题</dd>
                                </dl>
                                <dl className="cl">
                                    <dt>正确率</dt>
                                    <dd>{((sheet.sheet_score || 0) - 0).toFixed(2)}%</dd>
                                </dl>
                                <dl className="cl">
                                    <dt>答题日期</dt>
                                    <dd>{sheet.submitted_time || sheet.sheet_submitted_time}</dd>
                                </dl>
                            </div>
                            <div style={{ position: "relative"}}>
                                <button className="btn" type="button" onClick={this.onReExam}>重新测验</button>
                                <a href="#" className="course-test-see" onClick={this.onViewAnswers}>{this.state.viewAnswer ? '收起' : '查看'}答案</a>
                            </div>
                        </div>

                        {this.state.viewAnswer && sheetData.answers ? // 要查看结果时，还要保证有答案
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
                }

            </div>
        );
    }
}

module.exports = CourseExam;

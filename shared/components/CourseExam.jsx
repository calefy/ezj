import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import {getRequestTypes} from '../libs/utils';
import CoursesAction from '../actions/CoursesAction';

class CourseExam extends Component {
    static propTypes = {
        course: PropTypes.object.isRequired,
        examination: PropTypes.object.isRequired,
        sheet: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        start: false,
        index: 0,
    };
    answers = {};
    time = 0;

    componentWillReceiveProps(nextProps) {
        const type = getRequestTypes(CoursesAction.SUBMIT_SHEET);
        switch(nextProps.action.type) {
            case type.success:
                console.log('submit sheet return: ', nextProps.action.response);
                alert('提交测验成功');
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
        // 保存当前表单值
        this.setCurrentIndexAnswer();
        this.clearCurrentChecked();
        // 跳转题目
        let questions = this.props.examination.questions || [];
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
            course_name: course.course_name,
            organization_id: '',
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

        console.log(model);
        this.props.onSubmit(model);
    };

    render() {
        let examination = this.props.examination.examination || {};
        let questions = this.props.examination.questions || [];
        let curQuestion = questions.length > this.state.index ? questions[this.state.index] : {};

        let sheet = this.props.sheet.data && this.props.sheet.data.list || [];
        sheet = sheet.length ? sheet[0] : null;

        // 遍历问题，统计单选、多选数量
        let singleNumber = 0, multiNumber = 0;
        questions.forEach(item => {
            if (item.examination_question_is_multi) {
                multiNumber++;
            } else {
                singleNumber++;
            }
        });

        return (
            <div className="content course-test">

                {!sheet ?
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
                                    <p>已做<em className="course-test-already">{this.state.index }</em>题 / 共<em className="course-test-all">{questions.length}</em>题</p>
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
                                    <button type="button" className={`btn ${this.state.index === 0 ? 'disabled' : ''}`} disabled={this.state.index === 0} onClick={this.onPrev}>上一题</button>
                                    <button type="button" className={`btn ${this.state.index + 1 === questions.length ? 'disabled' : ''}`} disabled={this.state.index + 1 === questions.length} onClick={this.onNext}>下一题</button>
                                    <button type="button" className="btn" onClick={this.onSubmit}>提交答卷</button>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div>
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
                            {questions.map((item, index) => {
                                let correctText = [];
                                item.options.forEach((o, i) => {
                                    if (o.is_correct) correctText.push(String.fromCharCode(65 + i));
                                });
                                return (
                                    <dl key={index}>
                                        <dt>
                                            {index + 1}.
                                            <div className="dib vat" dangerouslySetInnerHTML={{__html: item.question.examination_question_content}} />
                                        </dt>
                                        {item.options.map((o, i) => {
                                            return (
                                                <dd key={i}>
                                                    <input type={item.question.examination_question_is_multi ? 'checkbox' : 'radio'} value={o.id} />
                                                    <span>{String.fromCharCode(65 + i)}.{o.option_text}</span>
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
                    </div>
                }

            </div>
        );
    }
}

module.exports = CourseExam;

import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import {getRequestTypes, getIdt} from '../../libs/utils';
import CoursesAction from '../../actions/CoursesAction';
import OperateAction from '../../actions/OperateAction';

if (process.env.BROWSER) {
    require('css/mobile.css');
}

let Exam = React.createClass({
    // 初始加载数据
    statics: {
        fetchData: function({dispatch, params={}, location={}, apiClient}) {
            const courseAction = new CoursesAction({ apiClient });
            let arr = [
                dispatch( courseAction.loadExamination(params.examId) ),
            ];
            if (params.sheetId) {
                arr.push(
                    dispatch( courseAction.loadSheet(params.sheetId) )
                );
            }
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
                // 上传统计数据
                const operateAction = new OperateAction();
                let info = nextProps.action.response.data;
                let sheet = info && info.sheet || {};
                let stime = new Date(sheet.sheet_submitted_time.replace(/-/g, '/'));
                stime = Math.round(stime.getTime() / 1000);
                nextProps.dispatch( operateAction.uploadAnalysisSheet({
                    _idt:   getIdt(),//设备唯一标识
                    _exid:  sheet.examination_id, //测验ID
                    _oid:   sheet.organization_id || '', //机构ID（选填）
                    _cid:   sheet.course_id, //课程ID
                    _stime: stime, //提交时间
                    _ctime: sheet.sheet_cost_time, //耗费时间 （秒）
                    _score: sheet.sheet_score //分数
                }) );
                break;
            case type.failure:
                alert(nextProps.action.error && nextProps.action.error.message || '提交测验失败');
                break;
        }
    },

    loadNeededData: function(props) {
        const { examination, sheet, params } = props;
        const courseAction = new CoursesAction();
        if (!examination._req || examination._req.examId !== params.examId) {
            props.dispatch(courseAction.loadExamination(params.examId));
        }
        if (params.sheetId && (!sheet._req || sheet._req.sheetId !== params.sheetId)) {
            props.dispatch(courseAction.loadSheet(params.sheetId));
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
        // 因設置checked后，defaultChecked失效，因此需要js動態設置一次
        /* 通过每个选项的 key={index} 修改为 key={item.id}，使react不作为同一个对象处理后，defaultChecked已正常。
        setTimeout(() => {
            let questions = this.props.examination.data.questions || [];
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
        */
    },
    onClickBegin: function(e) {
        e.preventDefault();
        this.time = (new Date()).getTime();
        this.setState({ index: 0, start: true });
    },
    onPrev: function(e) {
        e.preventDefault();
        if (e.currentTarget.className) return;

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
        if (e.currentTarget.className) return;

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
            course_id: this.props.params.courseId,
            examination_id: this.props.params.examId,
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

        //const {sheet, params} = this.props;
        //this.props.history.push(`/m/exams/${params.courseId}/${params.examId}/${sheet.data.sheet.id}`);
        // TODO
        // 如果查看答案，需要检测是否有答案
        //if (!this.state.viewAnswer) {
        //    if (!this.props.sheet.answers) {
        //        let sheet = this.props.sheet.list;
        //        sheet = sheet && sheet[0];
        //        this.props.onLoadSheet(sheet.sheet_id || sheet.id);
        //    }
        //}
    },

    onOverViewAnswer: function(e) {
        e.preventDefault();
        this.setState({viewAnswer: false});
    },

    render: function() {
        const {examination, sheet, params} = this.props;
        // loading
        if (examination.isFetching || (params.sheetId && sheet.isFetching)) {
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
            if (item.question.examination_question_is_multi) {
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
            <div className="mobile-test">
                {!sheetData || this.state.reexam ?
                    !this.state.start ?
                        <div>
                            <div className="mobile-content">
                                <div className="mobile-content-top">
                                    <div className="mobile-content-title">
                                        <h4>{exam.examination_title}</h4>
                                        <p>课程测试</p>
                                    </div>
                                    <div className="mobile-content-num">
                                        <p>题目数量：<em>{questions.length}道</em></p>
                                        <p>单选：{singleNumber} 道</p>
                                        <p>多选：{multiNumber} 道</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mobile-footer">
                                <a href="#" onClick={this.onClickBegin}>开始</a>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="mobile-content">
                                <div className="mobile-content-top mobile-test-question">
                                    <div className="fl">{this.state.index + 1}.</div>
                                    <div className="question-title" dangerouslySetInnerHTML={{__html: curQuestion.question && curQuestion.question.examination_question_content}}></div>
                                    <div>
                                        <em>{curQuestion.question && curQuestion.question.examination_question_is_multi ? '多' : '单'}选题</em>
                                        <em className="fr">{this.state.index + 1} / {questions.length}</em>
                                    </div>
                                </div>
                                <ul className="mobile-test-answer">
                                    {(curQuestion.options || []).map((item, index) => {
                                        let answer = this.answers[curQuestion.question.id] || [];
                                        let isAnswered = answer.indexOf(item.id) >= 0;
                                        return  <li key={item.id}>
                                                    <label className="cl">
                                                        <span className="fl">
                                                            <input type={curQuestion.question.examination_question_is_multi ? 'checkbox' : 'radio'} name={curQuestion.question.examination_question_is_multi ? 'answer[]' : 'answer'} value={item.id} ref={`answer_${index}`} defaultChecked={isAnswered} />
                                                            {String.fromCharCode(65 + index)}. 
                                                        </span>
                                                        <span className="answer-option">{item.option_text}</span>
                                                    </label>
                                                </li>
                                    })}
                                </ul>
                            </div>
                            <div className="mobile-footer mobile-footer-three">
                                <a href="#" className={firstIndex ? 'disabled' : ''} disabled={firstIndex} onClick={this.onPrev}>上一题</a>
                                {lastIndex ?
                                    <a href="#" onClick={this.onSubmit}>提交答卷</a>
                                    :
                                    <a href="#" onClick={this.onSkip}>跳过</a>
                                }
                                <a href="#" className={lastIndex ? 'disabled' : ''} disabled={lastIndex} onClick={this.onNext}>下一题</a>
                            </div>
                        </div>
                    :
                    this.state.viewAnswer ?
                        <div>
                            <div className="mobile-content">
                                <div className="mobile-content-top mobile-test-question">
                                    <div className="fl">{this.state.index + 1}.</div>
                                    <div className="question-title" dangerouslySetInnerHTML={{__html: curQuestion.question && curQuestion.question.examination_question_content}}></div>
                                    <div>
                                        <em>{curQuestion.question && curQuestion.question.examination_question_is_multi ? '多' : '单'}选题</em>
                                        <em className="fr">{this.state.index + 1} / {questions.length}</em>
                                    </div>
                                </div>
                                <ul className="mobile-test-answer">
                                    {(curQuestion.options || []).map((item, index) => {
                                        let answer = answerMap[curQuestion.question.id] || {};
                                        answer = answer.answer_content.split(',');
                                        let isChecked = answer.indexOf(item.id) >= 0; // 用户是否选择
                                        let isAnswer = correctIds.indexOf(item.id) >= 0; // 是否是正确答案
                                        let isMulti = curQuestion.question.examination_question_is_multi;
                                        return  <li key={index}>
                                                    <span className="cl view">
                                                        <span className="fl">
                                                            {isChecked && !isAnswer ? <i className="iconfont icon-del"></i> : isAnswer ? <i className="iconfont icon-xuanze"></i> : <i className="iconfont"></i>}
                                                            <input type={isMulti ? 'checkbox' : 'radio'} checked={isChecked} disabled name={isMulti ? 'answer[]' : 'answer'}/>
                                                            {String.fromCharCode(65 + index)}. 
                                                        </span>
                                                        <span className="answer-option">{item.option_text}</span>
                                                    </span>
                                                </li>
                                    })}
                                </ul>
                                <p className="mobile-answer-right">正确答案：{correctText}</p>
                            </div>
                            <div className="mobile-footer mobile-footer-two">
                                <a href="#" className={firstIndex ? 'disabled' : ''} disabled={firstIndex} data-nosave="1" onClick={this.onPrev}><em>上一题</em></a>
                                {!lastIndex ?
                                    <a href="#" data-nosave="1" onClick={this.onNext}><em>下一题</em></a>
                                    :
                                    <a href="#" onClick={this.onOverViewAnswer}><em>结束</em></a>
                                }
                            </div>
                        </div>
                        :
                        <div>
                            <div className="mobile-content">
                                <div className="mobile-content-top">
                                    <div className="mobile-content-title">
                                        <h4>{exam.examination_title}</h4>
                                        <p>课程测试</p>
                                    </div>
                                    <div className="mobile-content-num" style={{ height: 150 }}>
                                        <p>题目数量：<em>{questions.length}道</em></p>
                                        <p>正确率：</p>
                                        <div className="circle-simp">
                                            <div className="mask"><span>{((sheetData.sheet_score || 0) - 0).toFixed(2)}</span>%</div>
                                        </div>
                                        {/*
                                        <div className="circle" style={{ left: 120 }}>
                                            <div className="pie_left"><div className="left"></div></div>
                                            <div className="pie_right"><div className="right"></div></div>
                                            <div className="mask"><span>{((sheetData.sheet_score || 0) - 0).toFixed(2)}</span>%</div>
                                        </div>
                                        */}
                                    </div>
                                </div>
                                <a href="#" className="check-answer" onClick={this.onViewAnswers}>查看答案</a>
                            </div>
                            <div className="mobile-footer mobile-footer-two">
                                <Link to="/m/exams"><em>完成</em></Link>
                                <a href="#" onClick={this.onReExam}><em>重新测试</em></a>
                            </div>
                        </div>
                }
                {/*
                <div className="mobile-pop hide">
                    <p>是否提交测验？</p>
                    <div className="mobile-pop-btn">
                        <Link to=""><em>否</em></Link>
                        <Link to="">是</Link>
                    </div>
                </div>
                */}
            </div>
        );
    }
});

module.exports = connect( state => ({
    action: state.action,
    examination: state.examination,
    sheet: state.sheet,
}) )(Exam);

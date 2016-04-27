import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import { getRequestTypes, toTimeString } from '../../libs/utils';
import CoursesAction from '../../actions/CoursesAction';

class Result extends Component {
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const courseAction = new CoursesAction({ apiClient });
        return Promise.all([
            dispatch( courseAction.loadExamination(params.examId) ),
            dispatch( courseAction.loadSheet(params.sheetId) ),
        ]);
    }

    componentDidMount() {
        this.loadNeededData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.loadNeededData(nextProps);
    }
    loadNeededData = props => {
        const { examination, sheet, params } = props;
        const courseAction = new CoursesAction();
        if (params.examId !== (examination._req && examination._req.examId)) {
            props.dispatch( courseAction.loadExamination(params.examId) );
        }
        if (params.sheetId !== (sheet._req && sheet._req.sheetId)) {
            props.dispatch( courseAction.loadSheet(params.sheetId) );
        }
    };

    render() {
        const { examination, sheet } = this.props;
        let exam = examination.data && examination.data.examination || {};
        let questions = examination.data && examination.data.questions || [];
        let sheetInfo = sheet.data && sheet.data.sheet || {};
        let answers = sheet.data && sheet.data.answers || [];

        let answerMap = {};
        answers.map(item => {
            answerMap[item.examination_question_id] = item;
        });

        return (
            <div className="study-center-right fr">
                <h1 className="h1-title">查看测验结果<Link to="/study/test" className="fr">《 返回我的测验</Link></h1>
                {examination.isFetching || sheet.isFetching ?
                    <div className="study-result shadow bg-white">
                        <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                    </div>
                    :
                    <div className="study-result shadow bg-white">
                        <div className="study-result-title">
                            <p>测验名称：{exam.examination_title}</p>
                            <em>答题时间：{sheetInfo.sheet_submitted_time}</em>
                            <em>答题时长：{toTimeString(sheetInfo.sheet_cost_time - 0, 'm:s')}</em>
                            <em>题目数量：{questions.length}</em>
                            <em>正确率：{((sheetInfo.sheet_score || 0) - 0).toFixed(2)}%</em>
                        </div>
                        <div className="result-content">
                            {questions.map((qobj, qindex) => {
                                let question = qobj.question || {};
                                let options = qobj.options || [];

                                let correctText = [];
                                let correctIds = [];
                                options.forEach((o, i) => {
                                    if (o.is_correct) {
                                        correctIds.push(o.id);
                                        correctText.push(String.fromCharCode(65 + i));
                                    }
                                });

                                let answer = answerMap[question.id];
                                answer = answer && answer.answer_content.split(',') || [];

                                return (
                                    <dl key={qindex}>
                                        <dt><span className="fl">{qindex + 1}.</span><div dangerouslySetInnerHTML={{__html: question.examination_question_content}} /></dt>
                                        {options.map((option, oindex) => {
                                            let isAnswer = correctIds.indexOf(option.id) >= 0; // 是否是正确答案
                                            let isChecked = answer.indexOf(option.id) >= 0; // 用户是否选择
                                            return (
                                                <dd key={oindex}>
                                                    <input type={question.examination_question_is_multi ? 'checkbox' : 'radio'} defaultChecked={isChecked} disabled/>
                                                    <span className={isAnswer ? 'text-success' : isChecked ? 'text-error' : ''}>{String.fromCharCode(65 + oindex)}.{option.option_text}</span>
                                                    {oindex === 0 ?  <em className="true fr">正确答案：{correctText.join(',')}</em> : null}
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

module.exports = connect( state => ({
    examination: state.examination,
    sheet: state.sheet,
}) )(Result);

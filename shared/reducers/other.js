/**
 * 针对entities/action等全局共用对象操作
 */
import merge from 'lodash/merge';
import { reducerRequest, getRequestTypes } from '../libs/utils';
import { targetType } from '../libs/const';
import DiscussAction from '../actions/DiscussAction';

/**
 * normalizr处理后存储实体对象
 */
export function entities(state = {}, action) {
    let ret = state; // 定义ret，因switch处理完数量后，还需要更新entities

    const voteType = getRequestTypes(DiscussAction.VOTE);
    const submitAnswerType = getRequestTypes(DiscussAction.SUBMIT_ANSWER);
    const deleteAnswerType = getRequestTypes(DiscussAction.DELETE_ANSWER);
    const submitCommentType = getRequestTypes(DiscussAction.SUBMIT_COMMENT);
    const deleteCommentType = getRequestTypes(DiscussAction.DELETE_COMMENT);

    let data = action._data;
    switch (action.type) {
        // 投票成功后根据投票方向更新对应对象的值
        case voteType.success:
            let voteTargetIsQuestion = data.target_type == targetType.QUESTION;
            let voteTarget = voteTargetIsQuestion ? 'qaQuestions' : 'qaAnswers';
            let voteTargetKey = voteTargetIsQuestion ? 'question_vote_value' : 'answer_vote_value';
            let voteResData = action.response.data;
            ret = merge({}, state, {
                [voteTarget]: {
                    [data.target_id]: {
                        [voteTargetKey]: state[voteTarget][data.target_id][voteTargetKey] - 0 +
                                        (voteResData.is_cancel ? voteResData.vote_value * -1 : voteResData.is_revert ? voteResData.vote_value * 2 : voteResData.vote_value)
                    }
                }
            });
            break;
        // 问答新建、删除后更新问题中的回答总数
        case submitAnswerType.success:
            ret = merge({}, state, {qaQuestions: { [data.question_id]: {
                question_answer_count: state.qaQuestions[data.question_id].question_answer_count - 0 + 1} }});
            break;
        case deleteAnswerType.success: // 需根据删除的回答id获取对应的question
            let delAnswerQuestionId = state.qaAnswers[data.id].question_id;
            ret = merge({}, state, {qaQuestions: { [delAnswerQuestionId]: {
                question_answer_count: state.qaQuestions[delAnswerQuestionId].question_answer_count - 1} }});
            break;
        // 评论新建、删除后更新对应target中的评论总数
        case submitCommentType.success:
        case deleteCommentType.success:
            let commentDiff = action.type == submitCommentType.success ? 1 : -1;
            let commentTargetIsQuestion = data.target_type == targetType.QUESTION;
            let commentTarget = commentTargetIsQuestion ? 'qaQuestions' : 'qaAnswers';
            let commentTargetKey = commentTargetIsQuestion ? 'question_comment_count' : 'answer_comment_count';
            ret = merge({}, state, {
                [commentTarget]: {
                    [data.target_id]: {
                        [commentTargetKey]: state[commentTarget][data.target_id][commentTargetKey] - 0 + commentDiff
                    }
                }
            });
            break;
    }

    // 一般normalizr处理后合并
    if (action.normalized && action.normalized.entities) {
        ret = merge({}, ret, action.normalized.entities);
    }

    return ret;
}

/**
 * 通过全局的action属性记录action情况，方便组件随时知道触发变更的action情况
 */
export function action(state, action) {
    return action;
}

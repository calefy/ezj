/**
 * 针对entities/action等全局共用对象操作
 */
import merge from 'lodash/merge';
import { reducerRequest, getRequestTypes } from '../libs/utils';
import { targetType } from '../libs/const';
import OtherAction from '../actions/OtherAction';
import OperateAction from '../actions/OperateAction';

/**
 * normalizr处理后存储实体对象
 */
export function entities(state = {}, action) {
    let ret = state; // 定义ret，因switch处理完数量后，还需要更新entities

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

/**
 * 首页广告
 */
export function ads_index(state, action) {
    return reducerRequest(OtherAction.ADS_INDEX, state, action);
}

// 用户行为数据
export function analysis_actions(state = [], action) {
    switch(action.type) {
        case OperateAction.ADD_ANALYSIS_ACTION:
            return state.concat([action.data]);
            break;
        case OperateAction.CLEAR_ANALYSIS_ACTION:
        case OperateAction.CLEAR_LOGINED_DATA:
            return [];
            break;
    }
    return state;
}

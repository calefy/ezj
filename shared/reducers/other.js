/**
 * 针对entities/action等全局共用对象操作
 */
import merge from 'lodash/merge';
import { reducerRequest, getRequestTypes } from '../libs/utils';
import { targetType } from '../libs/const';

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
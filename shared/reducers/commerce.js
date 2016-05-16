/**
 * 电商相关数据
 */
import { getRequestTypes, reducerRequest } from '../libs/utils';
import CommerceAction from '../actions/CommerceAction';
import OperateAction from '../actions/OperateAction';

/**
 * 账户信息
 */
export function account(state, action) {
    // 清空登录数据
    if (action.type === OperateAction.CLEAR_LOGINED_DATA) {
        return {isFetching: true}
    }
    return reducerRequest(CommerceAction.LOAD_ACCOUNT, state, action);
}

/**
 * 充值列表
 */
export function recharges(state, action) {
    // 清空登录数据
    if (action.type === OperateAction.CLEAR_LOGINED_DATA) {
        return {isFetching: true}
    }
    return reducerRequest(CommerceAction.LOAD_RECHARGES, state, action);
}

/**
 * 订单列表
 */
export function orders(state, action) {
    // 清空登录数据
    if (action.type === OperateAction.CLEAR_LOGINED_DATA) {
        return {isFetching: true}
    }
    const payType = getRequestTypes(CommerceAction.PAY);
    switch(action.type) {
        case payType.request: // 支付时，清空订单数据
            return {isFetching: true};
        default:
            return reducerRequest(CommerceAction.LOAD_ORDERS, state, action);
    }
}

export function product(state, action) {
    return reducerRequest(CommerceAction.LOAD_PRODUCT, state, action);
}
export function products(state, action) {
    return reducerRequest(CommerceAction.LOAD_PRODUCTS, state, action);
}

// 课程包的讲师
export function product_lecturers(state, action) {
    return reducerRequest(CommerceAction.LOAD_PRODUCT_LECTURERS, state, action);
}

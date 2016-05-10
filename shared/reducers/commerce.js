/**
 * 电商相关数据
 */
import { getRequestTypes, reducerRequest } from '../libs/utils';
import CommerceAction from '../actions/CommerceAction';

/**
 * 账户信息
 */
export function account(state, action) {
    return reducerRequest(CommerceAction.LOAD_ACCOUNT, state, action);
}

/**
 * 充值列表
 */
export function recharges(state, action) {
    return reducerRequest(CommerceAction.LOAD_RECHARGES, state, action);
}

/**
 * 订单列表
 */
export function orders(state, action) {
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


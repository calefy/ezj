import { normalize } from 'normalizr';
import moment from 'moment';
moment.locale('zh-cn', {
    relativeTime : {
        future : '%s内',
        past : '%s前',
        s : '几秒',
        m : '1分钟',
        mm : '%d分钟',
        h : '1小时',
        hh : '%d小时',
        d : '1天',
        dd : '%d天',
        M : '1个月',
        MM : '%d个月',
        y : '1年',
        yy : '%d年'
    }
});

/**
 * 根据key，获取三种状态
 */
export function getRequestTypes(key) {
    key = key.toUpperCase();
    return {
        request: `LOAD_${key}_REQUEST`,
        success: `LOAD_${key}_SUCCESS`,
        failure: `LOAD_${key}_FAIL`
    };
}

/**
 * action发起fetch请求处理
 * @param {String} key 标识
 * @param {Promise} apiPromise http请求promise对象
 * @param {Object} other 其他信息，包含自定义内容与请求参数数据
 *                      - identity 标识是否需要更新数据
 *                      - schema 是否对结果使用normalizr处理
 *                      - 其他请求数据内容
 */
export function dispatchRequest(key, apiPromise, other = {}) {
    const types = getRequestTypes(key);

    return dispatch => {
        dispatch({
            type: types.request,
            _req: other
        });

        return apiPromise.then( res => {
            dispatch({
                type: types.success,
                response: res,
                normalized: other.schema ? normalize(res.data, other.schema) : null,
                _identity: other.identity || '', // 请求标识，用来区分不同请求数据，会被放置到store中
                _req: other // 仅为reducer使用，提供请求参数
            });
            return res; // 返回结果，方便一些数据依赖处理
        }).catch( error => {
            dispatch({
                type: types.failure,
                error,
                _req: other
            });
        });
    };
}

/**
 * 接收fetch结果
 */
export function reducerRequest(key, state = {isFetching: true}, action) {
    const types = getRequestTypes(key);

    switch(action.type) {
        case types.request:
            return { isFetching: true, _req: action._req}
        case types.success:
            // normalizr结果定义：id/ids
            let nlResult = action.normalized && action.normalized.result;
            let nl =  nlResult ?
                (nlResult.list ? {ids: nlResult.list, total: nlResult.total} : (typeof nlResult === 'string' ? {id: nlResult} : nlResult)) :
                {};
            // 这里要将新内容合并到state中
            // 如场景：同时获取问题与问题的答案，答案先返回，如果没有合并state，返回的答案会被冲掉
            return Object.assign({}, state, { isFetching: false, _identity: action._identity }, action.response, nl);
        case types.failure:
            return { isFetching: false, error: action.error, _req: action._req }
        default:
            return state
    }
}

/**
 * 生成请求标识：pathname+search
 */
export function getOwnRequestIdentity(location = {}) {
    return location.pathname + location.search;
}
/**
 * 判断数据是否是同一路由下的请求
 */
export function isOwnRequest(data = {}, location) {
    return data._identity === getOwnRequestIdentity(location);
}

/**
 * 转换params对象为url参数格式字符串
 */
export function paramify(params) {
    let ret = [];
    for (var key in params) {
        let p = encodeURIComponent(params[key]);
        ret.push(`${key}=${p}`);
    }
    return ret.join('&');
}

/**
 * search参数转对象形式
 */
export function paramParse(searchStr) {
    let ret = {};
    // 去掉开头的?
    searchStr = searchStr.replace(/^\?/, '');
    // 转换成对象
    let queryArr = searchStr.split('&');
    if (queryArr.length) {
        queryArr.forEach( item => {
            if (item) {
                const itemArr = item.split('=');
                ret[itemArr[0]] = itemArr[1];
            }
        })
    }
    return ret;
}

/**
 * 转换html实体字符
 */
export function encodeHtml(str) {
    return str.replace(/[&<> ]/g, item => {
        switch(item) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case ' ':
                return '&nbsp;';
        }
        return item;
    });
}

/**
 * 时间计算，从服务器时间算起
 */
export function timeFromNow(start) {
    return moment(start).from(process.env.BROWSER ? window._g_server_time : Date.now());
}


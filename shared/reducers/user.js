// 用户信息
import UserAction from '../actions/UserAction';
import { reducerRequest, getRequestTypes } from '../libs/utils';

export function user(state, action) {
    const loginTypes = getRequestTypes(UserAction.LOGIN);
    const logoutTypes = getRequestTypes(UserAction.LOGOUT);
    const regTypes = getRequestTypes(UserAction.REGIST);
    const infoTypes = getRequestTypes(UserAction.UPDATE_INFO);
    const changePwdTypes = getRequestTypes('changePwd');
    const avatarTypes = getRequestTypes('avatar');

    let ret = state;

    switch (action.type) {
        case loginTypes.success:
            ret = reducerRequest(UserAction.LOGIN, state, action);
            // 登录时同步更新全局属性__INITIAL_STATE__，以便onEnter中的登录验证可用
            window.__INITIAL_STATE__.user = ret;
            break;
        case regTypes.success:
            ret = reducerRequest(UserAction.REGIST, state, action);
            // 登录时同步更新全局属性__INITIAL_STATE__，以便onEnter中的登录验证可用
            window.__INITIAL_STATE__.user = ret;
            break;
        case logoutTypes.request:
        case logoutTypes.success:
        case logoutTypes.failure:
            ret = Object.assign({}, state, { data: null, error: null });
            break;
        case changePwdTypes.request:
        case changePwdTypes.success:
        case changePwdTypes.failure:
            ret = reducerRequest('changePwd', state, action);
            if (ret.error) {
                ret.changePwdError = ret.error;
                delete ret.error;
            }
            break;
        case avatarTypes.request:
            return state;
        case avatarTypes.success:
            var o = Object.assign({}, state);
            o.data.avatar = action.response.data.avatar;
            return o;
        case avatarTypes.failure:
            return Object.assign({}, state, {avatarError: action.response.error.message});
        case 'updateAvatar':
            let au = Object.assign({}, state);
            au.data.avatar = action.avatar;
            return au;
        // 更新个人信息成功
        case infoTypes.success:
            return Object.assign({}, state, {data: action.response.data});
            break;
        default:
            ret = reducerRequest('user', state, action);
    }

    return ret;
}

export function student(state, action) {
    return reducerRequest(UserAction.LOAD_STUDENT, state, action);
}


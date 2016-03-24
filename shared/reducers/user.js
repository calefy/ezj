// 用户信息
import { reducerRequest, getRequestTypes } from '../libs/utils';

export function user(state, action) {
    const loginTypes = getRequestTypes('login');
    const logoutTypes = getRequestTypes('logout');
    const changePwdTypes = getRequestTypes('changePwd');
    const avatarTypes = getRequestTypes('avatar');

    let ret = state;

    switch (action.type) {
        case loginTypes.request:
        case loginTypes.success:
        case loginTypes.failure:
            ret = reducerRequest('login', state, action);
            if (ret.error) {
                ret.loginError = ret.error;
                delete ret.error;
            } else {
                // 登录时同步更新全局属性__INITIAL_STATE__，以便onEnter中的登录验证可用
                window.__INITIAL_STATE__.user = ret;
            }
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
        default:
            ret = reducerRequest('user', state, action);
    }

    return ret;
}
export function reg(state, action) {
    return reducerRequest('reg', state, action);
}



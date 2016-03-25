import BaseAction from './BaseAction';
import UserApi from '../api/User';
import Schemas from '../libs/schemas';

module.exports = class UserAction extends BaseAction {

    static LOGIN = 'login';
    static SEND = 'send';

    constructor(config = {}) {
        super(config);

        this.api = this.getApi(UserApi);
    }

    /**
     * 当前账号信息
     */
    loadAccount() {
        return BaseAction.dispatchRequest( 'user', this.api.show(), { schema: Schemas.USER } );
    }

    login(opts) {
        return BaseAction.dispatchRequest( UserAction.LOGIN, this.api.login(opts) );
    }

    /**
     * 注册发送验证码
     */
    send(opts) {
        return BaseAction.dispatchRequest( UserAction.SEND, this.api.send(opts) );
    }
    // 注册
    reg(opts) {
        return BaseAction.dispatchRequest( 'reg', this.api.reg(opts) );
    }

    logout() {
        return BaseAction.dispatchRequest( 'logout', this.api.logout() );
    }
    changePwd(opts) {
        return BaseAction.dispatchRequest( 'changePwd', this.api.changePwd(opts) );
    }
    //uploadAvatar(formData) {
    //    return BaseAction.dispatchRequest( 'changePwd', this.api.avatar(formData) );
    //}
    updateAvatar(avatar) {
        return {
            type: 'updateAvatar',
            avatar: avatar
        };
    }

}
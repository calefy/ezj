import BaseAction from './BaseAction';
import UserApi from '../api/User';
import Schemas from '../libs/schemas';

module.exports = class UserAction extends BaseAction {

    static LOGIN = 'login';
    static SEND = 'send';
    static REGIST = 'reg';

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
        return BaseAction.dispatchRequest( UserAction.REGIST, this.api.reg(opts) );
    }

    logout() {
        return BaseAction.dispatchRequest( 'logout', this.api.logout() );
    }

    static CHANGE_PASSWD = 'change_password';
    changePasswd(opts) {
        return BaseAction.dispatchRequest( UserAction.CHANGE_PASSWD, this.api.changePasswd(opts) );
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

    static LOAD_STUDENT = 'load_student'
    loadStudent(uid, params) {
        return BaseAction.dispatchRequest( UserAction.LOAD_STUDENT, this.api.student(uid, params) );
    }

}

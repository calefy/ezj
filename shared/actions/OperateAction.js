import BaseAction from './BaseAction';
import UserApi from '../api/User';

module.exports = class OperateAction extends BaseAction {

    static SHOW_MESSAGE = 'showMessage';
    static CLEAR_ACTION = 'clearAction';
    
    constructor(config = {}) {
        super(config);
        this.userApi = this.getApi(UserApi);
    }

    // 重置密码发邮件
    static ACTION_SUBMIT_EMAIL = 'action_submit_email';
    sendPwd(data) {
        return BaseAction.dispatchRequest(OperateAction.ACTION_SUBMIT_EMAIL, this.userApi.sendPwd(data));
    }

    // 重置密码
    static ACTION_SUBMIT_RESET = 'action_submit_reset';
    resetPwd(token,pass) {
        return BaseAction.dispatchRequest(OperateAction.ACTION_SUBMIT_RESET, this.userApi.resetPwd(token,pass));
    }

    // 修改密码
    static ACTION_SUBMIT_CHANGE = 'action_submit_change';
    changePwd(oldPass,newPass) {
        return BaseAction.dispatchRequest(OperateAction.ACTION_SUBMIT_CHANGE, this.userApi.changePwd(oldPass,newPass));
    }

    // 显示错误消息
    showErrorMessage(message) {
        return { type: OperateAction.SHOW_MESSAGE, message: message, label: 'error' };
    }
    showSuccessMessage(message) {
        return { type: OperateAction.SHOW_MESSAGE, message: message, label: 'success' };
    }
    // 清空action对象
    clearAction() {
        return { type: OperateAction.CLEAR_ACTION };
    }
}


import BaseAction from './BaseAction';
import UserApi from '../api/User';
import OtherApi from '../api/Other';

module.exports = class OperateAction extends BaseAction {

    static SHOW_MESSAGE = 'showMessage';
    static CLEAR_ACTION = 'clearAction';
    
    constructor(config = {}) {
        super(config);
        this.userApi = this.getApi(UserApi);
        this.otherApi = this.getApi(OtherApi);
    }

    // 重置密码发邮件
    static SEND = 'send_passwd';
    sendPwd(data) {
        return BaseAction.dispatchRequest(OperateAction.SEND, this.userApi.sendPwd(data));
    }

    // 重置密码校验验证码
    static CODE = 'code_passwd';
    pwdCode(contact,code) {
        return BaseAction.dispatchRequest(OperateAction.CODE, this.userApi.pwdCode(contact,code));
    }

    // 重置密码
    static SET = 'set_passwd';
    setPwd(contact,code,new_password) {
        return BaseAction.dispatchRequest(OperateAction.SET, this.userApi.resetPwd(contact,code,new_password));
    }

    // 修改密码
    static ACTION_SUBMIT_CHANGE = 'action_submit_change';
    changePwd(oldPass,newPass) {
        return BaseAction.dispatchRequest(OperateAction.ACTION_SUBMIT_CHANGE, this.userApi.changePwd(oldPass,newPass));
    }

    static OPEN_LOGIN_DIALOG = 'openLoginDialog';
    // 打开登录框
    openLoginDialog() {
        return { type: OperateAction.OPEN_LOGIN_DIALOG };
    }
    static OPEN_REGIST_DIALOG = 'openRegistDialog';
    // 打开注册框
    openRegistDialog() {
        return { type: OperateAction.OPEN_REGIST_DIALOG};
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


    static ADD_ANALYSIS_ACTION = 'add_analysis_action';
    addAnalysisAction(data) {
        return {type: OperateAction.ADD_ANALYSIS_ACTION, data: data};
    }
    static CLEAR_ANALYSIS_ACTION = 'clear_analysis_action';
    clearAnalysisAction() {
        return {type: OperateAction.CLEAR_ANALYSIS_ACTION};
    }
    static UPLOAD_ANALYSIS = 'upload_analysis';
    uploadAnalysis(data) {
        return BaseAction.dispatchRequest(OperateAction.UPLOAD_ANALYSIS, this.otherApi.uploadAnalysis(data));
    }

    static CLEAR_LOGINED_DATA = 'clear_logined_data';
    clearLoginedData() {
        return {type: OperateAction.CLEAR_LOGINED_DATA};
    }

}


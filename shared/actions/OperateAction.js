import BaseAction from './BaseAction';

module.exports = class OperateAction extends BaseAction {

    static SHOW_MESSAGE = 'showMessage';
    static CLEAR_ACTION = 'clearAction';

    constructor(config = {}) {
        super(config);
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


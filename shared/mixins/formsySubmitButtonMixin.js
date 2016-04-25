/**
 * 控制按钮点击状态
 */
var formsySubmitButtonMixin = {

    getInitialState: function() {
        return { _canSubmit: false, _submitLoading: false };
    },

    canSubmit: function() {
        return this.state._canSubmit;
    },
    isSubmitLoading: function() {
        return this.state._submitLoading;
    },

    enableSubmitButton: function() {
        let r = Object.assign({}, this.state, { _canSubmit: true, _submitLoading: false });
        this.setState(r);
        return r;
    },
    disableSubmitButton: function() {
        let r = Object.assign({}, this.state, { _canSubmit: false, _submitLoading: false });
        this.setState(r);
        return r;
    },
    loadingSubmitButton: function() {
        let r = Object.assign({}, this.state, { _canSubmit: false, _submitLoading: true });
        this.setState(r);
        return r;
    }
};

module.exports = formsySubmitButtonMixin;

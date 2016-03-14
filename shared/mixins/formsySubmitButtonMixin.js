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
        this.setState(Object.assign({}, this.state, { _canSubmit: true, _submitLoading: false }));
    },
    disableSubmitButton: function() {
        this.setState(Object.assign({}, this.state, { _canSubmit: false, _submitLoading: false }));
    },
    loadingSubmitButton: function() {
        this.setState(Object.assign({}, this.state, { _canSubmit: false, _submitLoading: true }));
    }
};

module.exports = formsySubmitButtonMixin;

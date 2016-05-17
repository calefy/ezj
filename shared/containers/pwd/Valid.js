import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Formsy from 'formsy-react';

import OperateAction from '../../actions/OperateAction';

import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyText from '../../components/formsy/FormsyText.jsx';
import CountDown from '../../components/CountDown.jsx';

import { getRequestTypes } from '../../libs/utils';

let PwdValid = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    getInitialState: function() {
        return {
            errorSendMsg: null,
            errorCodeMsg: null,
            countDown: true, // 因第一步是“发送验证码”,因此这里开始就是倒计时
        };
    },

    componentDidMount: function() {
        this.operateAction = new OperateAction();
    },

    handleSubmit: function(model) {
        let contact = this.props.location.query.contact;
        let code = model.code;
        this.props.dispatch(this.operateAction.pwdCode( contact, code ));
        this.loadingSubmitButton();
    },

    sendEmail: function() {
        if (this.state.countDown) return;

        const contact = this.props.location.query.contact;
        this.props.dispatch(this.operateAction.sendPwd(contact));
        this._setState({ countDown: true });
    },

    componentWillReceiveProps: function(nextProps) {
        const sendType = getRequestTypes(OperateAction.SEND);
        const codeType = getRequestTypes(OperateAction.CODE);
        switch(nextProps.action.type) {
            case sendType.failure:
                this._setState({ errorSendMsg: nextProps.action.error.message || '发送验证码失败', countDown: false });
                break;
            case codeType.failure:
                this._setState({ errorCodeMsg: nextProps.action.error.message || '验证账号失败' });
                setTimeout((() => { this.enableSubmitButton(); }).bind(this), 0);
                break;
            case codeType.success:
                let contact = this.props.location.query.contact;
                let code = this.refs.code.getValue();
                this.props.history.push('/pwd/set?contact='+contact+'&code='+code);
                break;
        }
    },
    _setState: function(obj) {
        this.setState(Object.assign({}, this.state, obj || {}));
    },
    onFinishedCountDown: function() {
        this._setState({ countDown: false });
    },
    onFormChange: function() {
        this._setState({ errorSendMsg: '', errorCodeMsg: '' });
    },

    render() {
        const { action } = this.props;
        const locationPath = this.props.location.query.contact;

        return (
            <div>
                <div className="bg-white pwd">
                    <div className="stepflex">
                        <dl className="first">
                            <dt className="s-num">1</dt>
                            <dd className="s-text">输入账号</dd>
                        </dl>
                        <dl className="normal doing">
                            <dt className="s-num">2</dt>
                            <dd className="s-text">验证账号</dd>
                        </dl>
                        <dl className="normal last">
                            <dt className="s-num">3</dt>
                            <dd className="s-text">设置密码</dd>
                        </dl>
                    </div>
                </div>
                <div className="content">
                    <Formsy.Form
                        onValid={this.enableSubmitButton}
                        onInvalid={this.disableSubmitButton}
                        onValidSubmit={this.handleSubmit}
                        onChange = {this.onFormChange}
                        className="pwd-form pwd-write-form"
                    >
                        <div className="formsy-list pwd-valid">
                            验证码已发送至您的
                            {/@/.test(locationPath) ? "邮箱" : "手机"}
                            <em ref="contact">{locationPath}</em>
                            <button type="button" className={`btn ${this.state.countDown ? 'disabled' : ''}`} onClick={this.sendEmail}>{this.state.countDown ? <span><CountDown onFinished={this.onFinishedCountDown} />s后重发</span> : '重发验证码'}</button>
                            <p className="send-msg">{this.state.errorSendMsg}</p>
                        </div>
                        <FormsyText 
                            name="code"
                            ref="code"
                            title={(/@/.test(locationPath) ? "邮箱" : "短信") + '验证码'}
                            placeholder="请输入4位验证码"
                            type="text"
                            required />
                        <div className="pop-btn pwd-btn">
                            <Link to="/pwd/index" className="pwd-return"> 《 返回</Link>
                            <button type="submit" ref="submit" disabled={!this.canSubmit()}
                                className={ this.canSubmit() ? '' : 'disabled'} >{this.isSubmitLoading() ? '验证中...' : '下一步'}</button>
                            <p className="valid-msg">{this.state.errorCodeMsg}</p>
                        </div>
                    </Formsy.Form>
                </div>
            </div>
        );
    }
});


module.exports = connect( state => ({ action: state.action }) )(PwdValid);


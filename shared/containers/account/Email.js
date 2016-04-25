import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import Formsy from 'formsy-react';

import { getRequestTypes, cryptoPasswd } from '../../libs/utils';
import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyText from '../../components/formsy/FormsyText.jsx';
import FormsyValid from '../../components/formsy/FormsyValid.jsx';
import CountDown from '../../components/CountDown.jsx';
import UserAction from '../../actions/UserAction';

let Email = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    hasSended: false, // 标记已经发过验证码

    getInitialState: function() {
        return {
            success: '', // 成功后展示信息
            error: '', // 全局的错误信息显示
            codeSended: false, // 验证码是否发送
            countDown: false, // 倒计时中
        };
    },

    componentWillReceiveProps: function(nextProps) {
        // 如果mobile与email修改之间切换，则重置整个状态
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.refs.form.reset();
            this.hasSended = false;
            this.setState({success: '', error: '', codeSended: false, countDown: false});
            return;
        }
        // 反馈结果处理
        let sendType = getRequestTypes(UserAction.SEND_CODE_FOR_CONTACT);
        let updateType = getRequestTypes(UserAction.UPDATE_CONTACT);
        let r;
        switch(nextProps.action.type) {
            case sendType.success: // 提示验证码已发送
                this._setState({codeSended: true});
                break;
            case sendType.failure:
                this._setState({ countDown: false });
                break;
            case updateType.success:
                r = this.disableSubmitButton();
                this._setState({...r, success: '修改成功'});
                setTimeout(function() {
                    nextProps.history.push('/account/index');
                }, 1000);
                break;
            case updateType.failure:
                r = this.enableSubmitButton();
                this._setState({
                    ...r,
                    error: nextProps.action.error && nextProps.action.error.message || '保存修改信息失败',
                });
                break;
        }
    },

    // 简便设置state
    _setState: function(obj) {
                   console.log(obj)
        this.setState(Object.assign({}, this.state, obj || {}));
    },

    // 是否当前地址是修改邮箱
    isModifyEmail: function() {
        return /email$/.test(this.props.location.pathname);
    },

    // 倒计时结束
    onFinishedCountDown: function() {
        this._setState({ countDown: false, codeSended: false })
    },

    // 表单变化时，不显示统一的错误信息
    onFormChange: function() {
        if (this.state.error) {
            this._setState({ error: '' });
        }
    },

    // 点击发送验证码
    onClickSend: function(e) {
        if (!this.refs.contact.isValid()) {
            this.refs.form.updateInputsWithError({contact: '请输入真实' + (this.isModifyEmail() ? '邮箱' : '手机号')});
            return;
        }

        this.hasSended = true;
        this._setState({ countDown: true });

        const userAction = new UserAction();
        this.props.dispatch(userAction.sendCodeForContact(this.refs.contact.getValue()));
    },

    // 提交表单
    onSubmit: function(model) {
        this.loadingSubmitButton();

        const userAction = new UserAction();
        this.props.dispatch(userAction.updateContact({
            contact: model.contact,
            code: model.code,
            password: cryptoPasswd(model.passwd),
        }));
    },

    render: function() {
        let user = this.props.user.data || {};
        let isEmail = this.isModifyEmail();

        return (
            <Formsy.Form
                ref="form"
                className="account-email"
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                onValidSubmit={this.onSubmit}
                onChange={this.onFormChange}
            >
                <div className="formsy-list cl">
                    <label>当前{isEmail ? '邮箱' : '手机'}：</label>
                    <div>{isEmail ? user.email : user.mobile}</div>
                </div>

                <FormsyText
                    ref="contact"
                    name="contact"
                    type="text"
                    title={`更改${isEmail ? '邮箱' : '手机'}:`}
                    placeholder={`请输入新的${isEmail ? '邮箱' : '手机号'}`}
                    required
                    validations={isEmail ? {isEmail: isEmail} : {matchRegexp: /1[3-9]\d{9}/}}
                    validationError={`请输入真实${isEmail ? '邮箱' : '手机号'}`}
                />

                <p className="indent">
                    <button className={`btn btn-send-code ${this.state.countDown ? 'disabled' : ''}`} type="button" disabled={this.state.countDown} onClick={this.onClickSend}>
                        {this.state.countDown ? <span><CountDown onFinished={this.onFinishedCountDown}/>s后重新发送</span> : (this.hasSended ? '重新' : '') + '发送验证码'}
                    </button>
                    &emsp;
                    {this.state.codeSended ?
                        <span className="text-success">验证码已发送</span>
                        : null
                    }
                </p>

                <br />

                <FormsyText
                    name="code"
                    type="text"
                    title="验证:"
                    placeholder="请输入4位验证码"
                    required
                    validations="isLength:4"
                    validationError="请输入 4 位验证码"
                />
                <FormsyText
                    name="passwd"
                    type="password"
                    title="密码:"
                    placeholder="请输入登录密码"
                    required
                    validationError="请输入登录密码"
                />

                <p className="indent">
                    {this.state.error ?
                        <em className="text-error">{this.state.error}</em>
                        :
                        <em className="text-success">{this.state.success}</em>
                    }
                </p>

                <p className="indent">
                    <button className={this.canSubmit() ? 'btn' : 'btn disabled'} type="submit" disabled={!this.canSubmit()}>{this.isSubmitLoading() ? '修改中...' : '确认修改'}</button>
                </p>
            </Formsy.Form>
        );
    }
})

module.exports = connect( state => ({
    action: state.action,
    user: state.user,
}) )(Email);

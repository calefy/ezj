/**
 * 注册表单，用在登录框中
 */
import React, { PropTypes } from 'react';
import trim from 'lodash/trim';
import Formsy from 'formsy-react';
import { Link } from 'react-router';

import formsySubmitButtonMixin from '../mixins/formsySubmitButtonMixin';
import FormsyText from './formsy/FormsyText.jsx';
import FormsyCheckbox from './formsy/FormsyCheckbox.jsx';
import FormsyValid from './formsy/FormsyValid.jsx';
import CountDown from './CountDown.jsx';

let RegistForm = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    statics: {
        RESPONSE_VALID_CODE: 'response_valid_code',
        RESPONSE_REGIST: 'response_regist',
    },

    propTypes: {
        onSendValidCode: PropTypes.func.isRequired, // 发送验证码
        onRegist: PropTypes.func.isRequired, // 实际注册
        onTurnToLogin: PropTypes.func.isRequired, // 转换到登录
    },

    getInitialState: function() {
        return {
            isSended: false, // 是否发送过验证码
            countDown: false, // 是否显示倒计时
            error: '' // 全局错误
        };
    },
    _setState: function(obj) {
        this.setState(Object.assign({}, this.state, obj || {}))
    },

    /**
     * 处理数据结果，由父级组件调用
     * @param type 数据类型
     * @param data 要处理的数据对象
     */
    handleResponse: function(type, res) {
        // 验证码响应
        if (type === RegistForm.RESPONSE_VALID_CODE) {
            if (!res.data) {
                this.refs.form.updateInputsWithError({
                    contact: res.message || '发送验证码失败'
                });
                this._setState( { countDown: false } );
            }
        }
        // 注册响应
        if (type === RegistForm.RESPONSE_REGIST) {
            if (!res.data) {
                this.enableSubmitButton();
                this._setState({ error: res.message || '注册失败' });
            }
        }
    },

    /**
     * 发送验证码
     */
    onSendValidCode: function() {
        if (this.refs.contact.isValid()) {
            this.props.onSendValidCode( trim(this.refs.contact.getValue()) );
            this._setState({ countDown: true, isSended: true });
        }
    },

    /**
     * 提交注册
     */
    onRegist: function(model) {
        this.props.onRegist(model);
        this.loadingSubmitButton();
    },

    /**
     * 跳转到登录
     */
    onTurnToLogin: function(e) {
        e.preventDefault();
        e.nativeEvent.returnValue = false;
        this.props.onTurnToLogin();
    },

    /**
     * 倒计时停止时调用
     */
    onFinishedCountDown: function() {
        this.setState(Object.assign({}, this.state, {countDown: false}));
    },

    render: function() {
        return (
            <Formsy.Form
                ref="form"
                className="pop-text"
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                onValidSubmit={this.onRegist}
            >
                <FormsyText
                    ref="contact"
                    name="contact"
                    placeholder="请输入您的手机号码或邮箱"
                    title={
                        <span>
                            <i className="iconfont icon-username"></i>手机号/邮箱
                        </span>
                    }
                    required
                />

                <FormsyValid
                    name="code"
                    placeholder="请输入4位验证码"
                    title={
                        <span>
                            <i className="iconfont icon-yz"></i>验证码
                        </span>
                    }
                    sendButton={(this.refs.contact && this.refs.contact.isValid() && !this.state.countDown) ? '' : 'yz-btn' }
                    valid={this.state.countDown ?
                            <span><CountDown onFinished={this.onFinishedCountDown}/>s后重发</span>
                            :
                            (this.state.isSended ? '重发' : '发送') + '验证码'}
                    required
                    validClick={this.onSendValidCode}
                />

                <FormsyText
                    name="nickname"
                    placeholder="4-30个字符，支持中英文、数字、“_”或减号"
                    title={
                        <span>
                            <i className="iconfont icon-name"></i>昵称
                        </span>
                    }
                    required
                    validations={{matchRegexp: /^[\u4e00-\u9fa5_a-zA-Z\d\-]{4,30}$/}}
                    validationError="请输入4-30个字符，支持中英文、数字、“_”或减号"
                />

                <FormsyText
                    name="password"
                    placeholder="6-20个字符，包含字母、数字及标点符号"
                    title={
                        <span>
                            <i className="iconfont icon-pass"></i>密码
                        </span>
                    }
                    type="password"
                    required
                    validations={{
                        minLength: 6,
                        maxLength: 20,
                        matchRegexp: /^[a-zA-Z\d,\.'"_-]*[a-zA-Z,\.'"_-]+[a-zA-Z\d,\.'"_-]*$/
                    }}
                    validationError="请输入6-20个字母、数字及标点符号，不可仅数字"
                />

                <dl className="formsy-list cl">
                    <dt className="fl">
                        <FormsyCheckbox value="1" defaultChecked={true} name="secret" required /> 同意<Link to="">隐私政策</Link>
                    </dt>
                    <dd className="fr text-error">
                        {this.state.error}
                    </dd>
                </dl>

                <div className="pop-btn">
                    <button type="submit" disabled={!this.canSubmit()}
                        className={ this.canSubmit() ? null : 'disabled'}>{this.isSubmitLoading() ? '注册中...' : '注册'}</button>
                </div>
                <div className="pop-other cl">
                    <span className="fl">已有账号？<button onClick={this.onTurnToLogin}>请登录</button></span>
                </div>
            </Formsy.Form>
        );
    }
});

module.exports = RegistForm;

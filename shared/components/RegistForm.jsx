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
            countDown: false, // 是否显示倒计时
            error: '' // 全局错误
        };
    },

    /**
     * 处理数据结果
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
                this.setState(Object.assign({}, this.state, { countDown: false }));
            }
        }
        // 注册响应
        if (type === RegistForm.RESPONSE_REGIST) {
            if (!res.data) {
                this.enableSubmitButton();
                this.setState({ error: res.message || '注册失败' });
            }
        }
    },

    /**
     * 发送验证码
     */
    onSendValidCode: function() {
        if (this.refs.contact.isValid()) {
            this.props.onSendValidCode( trim(this.refs.contact.getValue()) );
            this.setState({ countDown: true });
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
                    title={
                        <span>
                            <i className="iconfont icon-username"></i>手机号/邮箱
                        </span>
                    }
                    required
                />

                <FormsyValid
                    name="code"
                    title={
                        <span>
                            <i className="iconfont icon-yz"></i>验证码
                        </span>
                    }
                    sendButton={(this.refs.contact && this.refs.contact.isValid() && !this.state.countDown) ? '' : 'yz-btn' }
                    valid={this.state.countDown ? <span><CountDown/>s后重新发送</span> : '发送验证码'}
                    required
                    validClick={this.onSendValidCode}
                />

                <FormsyText
                    name="nickname"
                    title={
                        <span>
                            <i className="iconfont icon-name"></i>昵称
                        </span>
                    }
                    validations={{
                        minLength: 4,
                        maxLength: 30
                    }}
                    validationErrors={{
                        minLength: "昵称为4-30个字符",
                        maxLength: "昵称为4-30个字符"
                    }}
                    required
                />

                <FormsyText
                    name="password"
                    title={
                        <span>
                            <i className="iconfont icon-pass"></i>密码
                        </span>
                    }
                    validations={{
                        minLength: 6,
                        maxLength: 20
                    }}
                    validationErrors={{
                        minLength: "密码为6-20个字符",
                        maxLength: "密码为6-20个字符"
                    }}
                    type="password"
                    required
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

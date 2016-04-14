import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import md5 from 'blueimp-md5'

import formsySubmitButtonMixin from '../mixins/formsySubmitButtonMixin';
import FormsyText from './formsy/FormsyText.jsx';
import FormsyCheckbox from './formsy/FormsyCheckbox.jsx';

let actionTimer = null;

let LoginForm = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    propTypes: {
        onLogin: PropTypes.func.isRequired,
        onTurnToRegist: PropTypes.func.isRequired,
        onTurnToPasswd: PropTypes.func.isRequired, // 点击忘记密码
    },

    getInitialState: function() {
        return { error: '' };
    },

    /**
     * 反馈结果
     */
    handleResponse: function(res) {
        if (!res.data) {
            this.enableSubmitButton(); // 因react state设置问题，该行并不会生效
            this.setState({ error: res.message || '登录失败' }); // 重置全部state
        }
    },


    /**
     * 提交登录
     */
    onSubmit: function(model) {
        // 加密密码值
        let password = model.password.split('').reverse().join('');
        password = md5('uokoaduw' + password + 'auhgniq');
        this.loadingSubmitButton();
        this.props.onLogin( Object.assign({}, model, { password }) );
    },

    /**
     * 切换注册
     */
    onTurnToRegist: function(e) {
        e.preventDefault();
        e.nativeEvent.returnValue = false;
        this.props.onTurnToRegist();
    },

    // 表单变更时，取消掉全局错误消息
    onFormChange: function() {
        this.setState({ error: '' });
    },

    render() {
        return (
            <Formsy.Form
                className="pop-text"
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                onValidSubmit={this.onSubmit}
                onChange={this.onFormChange}
            >
                <FormsyText
                    name="login_name"
                    type="text"
                    title={
                        <span>
                            <i className='iconfont icon-username'></i>手机号/邮箱/用户名
                        </span>
                    }
                    required
                />

                <FormsyText
                    name="password"
                    type="password"
                    title={
                        <span>
                            <i className="iconfont icon-pass"></i>密码
                        </span>
                    }
                    required
                />

                <dl className="formsy-list cl">
                    <dt className="fl">
                        <FormsyCheckbox name="remember" value="1" defaultChecked={true} />记住我
                    </dt>
                    <dd className="fr text-error">
                        {this.state.error}
                    </dd>
                </dl>
                <div className="pop-btn">
                    <button type="submit" disabled={!this.canSubmit()}
                        className={ this.canSubmit() ? '' : 'disabled'} >{this.isSubmitLoading() ? '登录中...' : '登录'}</button>
                </div>
                <div className="pop-other cl">
                    <span className="fl">没有账号？<button onClick={this.onTurnToRegist}>马上注册</button></span>
                    <Link to="/pwd/index" className="fr" onClick={this.props.onTurnToPasswd}>忘记密码</Link>
                </div>
            </Formsy.Form>
        );
    }

});

module.exports = LoginForm;

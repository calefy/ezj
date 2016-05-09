import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';

import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyText from '../../components/formsy/FormsyText.jsx';
import UserAction from '../../actions/UserAction';
import { getRequestTypes, cryptoPasswd } from '../../libs/utils';

let Passwd = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    getInitialState: function() {
        return { error: null };
    },

    componentWillReceiveProps: function(nextProps) {
        let changeType = getRequestTypes(UserAction.CHANGE_PASSWD);
        switch (nextProps.action.type) {
            case changeType.success:
                this.refs.form.reset();
                alert('修改密码成功');
                break;
            case changeType.failure:
                this.enableSubmitButton();
                this.setState({ error: nextProps.action.error.message || '修改密码失败' });
                break;
        }
    },

    onFormChange: function() {
        this.setState({ error: null });
    },
    onSubmit: function(model) {
        const userAction = new UserAction();
        this.props.dispatch( userAction.changePasswd({
            old_password: cryptoPasswd(model.old_password),
            new_password: model.new_password
        }) );
        this.loadingSubmitButton();
    },


    render: function() {
        const user = this.props.user.data || {};

        return (
            <Formsy.Form
                ref="form"
                className="account-pwd"
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                onValidSubmit={this.onSubmit}
                onChange={this.onFormChange}
            >
                <div className="formsy-list cl">
                    <label>用户名</label>
                    <div className="formsy-text">{user.username}</div>
                </div>

                <FormsyText
                    name="old_password"
                    type="password"
                    title="当前密码"
                    required
                />
                <FormsyText
                    name="new_password"
                    type="password"
                    title="新密码"
                    placeholder="6-20个字符，只能包含字母、数字及标点符号"
                    required
                    validations={{
                        minLength: 6,
                        maxLength: 20,
                        matchRegexp: /^[a-zA-Z\d,\.'"_-]*[a-zA-Z,\.'"_-]+[a-zA-Z\d,\.'"_-]*$/
                    }}
                    validationError="请输入6-20个字符，必须包含字母、标点符号，可包含数字"
                />
                <FormsyText
                    name="repeat_password"
                    type="password"
                    title="确认密码"
                    required
                    validations="equalsField:new_password"
                    validationErrors={{ equalsField: '两次输入密码不一致' }}
                />

                <div className="formsy-list">
                    <label>&nbsp;</label>
                    <button
                        className={this.canSubmit() ? 'btn' : 'yz-btn'}
                        disabled={!this.canSubmit()}
                        type="submit">{this.isSubmitLoading() ? '保存中...' : '保存'}</button>

                    &emsp;
                    <span className="text-error">{this.state.error}</span>
                </div>
            </Formsy.Form>
        );
    }
});

module.exports = connect( state => ({
    user: state.user,
    action: state.action,
}) )(Passwd);

/*
                    <dd>
                        <div className="password-strength">
                            <div className="password-strength-text" aria-live="assertive"></div>
                            <div className="password-strength-title">密码强度：</div>
                            <div className="password-indicator">
                                <div id="indicator" className=""></div>
                            </div>
                        </div>
                    </dd>
 */

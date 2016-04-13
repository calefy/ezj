import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Formsy from 'formsy-react';

import UserAction from '../../actions/UserAction';
import OperateAction from '../../actions/OperateAction';
import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyText from '../../components/formsy/FormsyText.jsx';

import { getRequestTypes } from '../../libs/utils';

let PwdSend = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    getInitialState: function() {
        return { errorMsg: null };
    },

    componentWillReceiveProps: function(nextProps) {
        const sendType = getRequestTypes(OperateAction.SEND);
        switch(nextProps.action.type) {
            case sendType.failure:
                this.enableSubmitButton(); // 该行不会生效，其中的控制状态将由下面代码执行
                this.setState({ errorMsg: nextProps.action.error.message || '发送验证码失败' });
                break;
            case sendType.success:
                let contact = this.refs.contact.getValue();
                this.props.history.push('/pwd/valid?contact='+contact);
                break;
        }
    },

    handleSubmit: function() {
        let operateAction = new OperateAction();
        let contact = this.refs.contact.getValue();
        this.props.dispatch(operateAction.sendPwd(contact));
        this.loadingSubmitButton();
    },

    render() {
        return (
            <div>
                <div className="bg-white pwd">
                    <div className="stepflex">
                        <dl className="first doing">
                            <dt className="s-num">1</dt>
                            <dd className="s-text">输入账号</dd>
                        </dl>
                        <dl className="normal">
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
                        className="pwd-form pwd-write-form"
                    >
                        <FormsyText
                            name="contact"
                            ref="contact"
                            title="输入注册手机号/邮箱"
                            type="text"
                            required />
                        <div className="pop-btn pwd-btn">
                            <button type="submit" disabled={!this.canSubmit()}
                                className={ this.canSubmit() ? '' : 'disabled'} >{this.isSubmitLoading() ? '验证码发送中...' : '发送验证码'}</button>
                            <p className="valid-msg">{this.state.errorMsg}</p>
                        </div>
                    </Formsy.Form>
                </div>
            </div>
        );
    }
});


module.exports = connect( state => ({ action: state.action }) )(PwdSend);


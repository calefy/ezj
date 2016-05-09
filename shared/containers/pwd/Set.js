import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Formsy from 'formsy-react';

import OperateAction from '../../actions/OperateAction';

import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyText from '../../components/formsy/FormsyText.jsx';

import { getRequestTypes } from '../../libs/utils';

let PwdSet = React.createClass({

    mixins: [ formsySubmitButtonMixin ],

    getInitialState: function() {
        return {
            errorMsg: null,
        };
    },

    componentWillReceiveProps: function(nextProps) {
        const setType = getRequestTypes(OperateAction.SET);
        switch(nextProps.action.type) {
            case setType.failure:
                this.enableSubmitButton();
                this.setState({ errorMsg: nextProps.action.error.message || '修改密码失败' });
                break;
            case setType.success:
                this.props.history.push('/pwd/success');
                break;
        }
    },

    handleSubmit: function(model) {
        const { dispatch, location } = this.props;

        const operateAction = new OperateAction();
        dispatch(operateAction.setPwd(
                    location.query.contact,
                    location.query.code,
                    model.newpass));

        this.loadingSubmitButton();
    },

    onFormChange: function() {
        this.setState({ errorMsg: '' });
    },

    render() {
        return (
            <div>
                <div className="bg-white pwd">
                    <div className="stepflex">
                        <dl className="first">
                            <dt className="s-num">1</dt>
                            <dd className="s-text">输入账号</dd>
                        </dl>
                        <dl className="normal">
                            <dt className="s-num">2</dt>
                            <dd className="s-text">验证账号</dd>
                        </dl>
                        <dl className="normal last doing">
                            <dt className="s-num">3</dt>
                            <dd className="s-text">设置密码</dd>
                        </dl>
                    </div>
                </div>
                <div className="content" ref="pwd">
                    <Formsy.Form
                        ref="form"
                        onValid={this.enableSubmitButton}
                        onInvalid={this.disableSubmitButton}
                        onValidSubmit={this.handleSubmit}
                        onChange={this.onFormChange}
                        className="pwd-form pwd-write-form"
                    >
                        <FormsyText
                            name="newpass"
                            title="新密码"
                            placeholder="6-20个字符，只能包含字母、数字及标点符号"
                            type="password"
                            required
                            validations={{
                                minLength: 6,
                                maxLength: 20,
                                matchRegexp: /^[a-zA-Z\d,\.'"_-]*[a-zA-Z,\.'"_-]+[a-zA-Z\d,\.'"_-]*$/
                            }}
                            validationError="请输入6-20个字符，必须包含字母、标点符号，可以包含数字"
                        />

                        <FormsyText
                            name="repass"
                            title="重复密码"
                            placeholder="重复输入密码"
                            type="password"
                            required
                            validations="equalsField:newpass"
                            validationErrors={{ equalsField: '两次输入密码不一致' }}
                        />

                        <div className="pop-btn pwd-btn">
                            <button type="submit" disabled={!this.canSubmit()}
                                className={ this.canSubmit() ? '' : 'disabled'} >{this.isSubmitLoading() ? '修改中...' : '完成'}</button>
                            <p className="valid-msg">{this.state.errorMsg}</p>
                        </div>
                    </Formsy.Form>
                </div>
            </div>
        );
    }
});


module.exports = connect( state => ({ action: state.action }) )(PwdSet);


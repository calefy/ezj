import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import Formsy from 'formsy-react';

import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyText from '../../components/formsy/FormsyText.jsx';
import UserAction from '../../actions/UserAction';

let User = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    getInitialState: function() {
        return {
            error: '', // 全局的错误信息显示
        };
    },

    // 简便设置state
    _setState: function(obj) {
        this.setState(Object.assign({}, this.state, obj || {}));
    },

    // 表单变化时，不显示统一的错误信息
    onFormChange: function() {
        if (this.state.error) {
            this._setState({ error: '' });
        }
    },

    // 提交表单
    onSubmit: function(model) {
        console.log('account/user submit : ', model);
    },

    render: function() {
        return (
            <Formsy.Form
                ref="form"
                className="account-user"
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                onValidSubmit={this.onSubmit}
                onChange={this.onFormChange}
            >
                <dl>
                    <dt>昵称：</dt>
                    <dd className="formsy-input input-error">
                        <input type="text" name="" value="" placeholder="4-30个字符，支持中英文、数字、“_”或减号" />
                    </dd>
                    <dd>
                        <em className="text-error">昵称在4-30个字符之间</em>
                    </dd>
                </dl>
                <dl>
                    <dt>用户名：</dt>
                    <dd className="formsy-input">
                        <input type="text" name="" value="" placeholder="6-30个字符，支持英文、数字等" />
                    </dd>
                    <dd>
                        <em className="text-error">用户名已被占用</em>
                    </dd>
                </dl>
                <dl>
                    <dt>性别：</dt>
                    <dd name="gender">
                        <label className="radio-inline">
                            <input type="radio" name="genderRadio" id="genderRadio1" value="1" checked="" /><span>男</span>
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="genderRadio" id="genderRadio2" value="0" /><span>女</span>
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="genderRadio" id="genderRadio3" value="2" checked="checked" /><span>保密</span>
                        </label>
                    </dd>
                </dl>
                <dl>
                    <dt>出生日期：</dt>
                    <dd>
                        <div className="account-birth">
                            <div className="account-birth-select">
                                <select name="province" id="province" className="form-control">
                                    <option value="">-- 请选择 --</option>
                                    <option value="2" selected="selected">1900</option>
                                    <option value="3">1901</option>
                                    <option value="16">1902</option>
                                </select>
                                &emsp;年
                            </div>
                            <div className="account-birth-select">
                                <select name="province" id="province" className="form-control">
                                    <option value="">-- 请选择 --</option>
                                    <option value="2" selected="selected">01</option>
                                    <option value="3">02</option>
                                    <option value="16">03</option>
                                </select>
                                &emsp;月
                            </div>
                            <div className="account-birth-select">
                                <select name="province" id="province" className="form-control">
                                    <option value="">-- 请选择 --</option>
                                    <option value="2" selected="selected">01</option>
                                    <option value="3">02</option>
                                    <option value="16">03</option>
                                </select>
                                &emsp;日
                            </div>
                        </div>
                    </dd>
                </dl>
                <dl>
                    <dt>所在地区：</dt>
                    <dd>
                        <div className="account-address">
                            <div className="account-address-select">
                                <select name="province" id="province" className="form-control">
                                    <option value="">-- 请选择 --</option>
                                    <option value="2" selected="selected">北京</option>
                                    <option value="3">1901</option>
                                    <option value="16">1902</option>
                                </select>
                                &emsp;&emsp;
                            </div>
                            <div className="account-address-select">
                                <select name="province" id="province" className="form-control">
                                    <option value="">-- 请选择 --</option>
                                    <option value="2" selected="selected">北京</option>
                                    <option value="3">02</option>
                                    <option value="16">03</option>
                                </select>
                                &emsp;&emsp;
                            </div>
                            <div className="account-address-select">
                                <select name="province" id="province" className="form-control">
                                    <option value="">-- 请选择 --</option>
                                    <option value="2" selected="selected">北京</option>
                                    <option value="3">02</option>
                                    <option value="16">03</option>
                                </select>
                                &emsp;&emsp;
                            </div>
                        </div>
                    </dd>
                </dl>
                <button className={this.canSubmit() ? 'btn' : 'btn disabled'} type="submit" disabled={!this.canSubmit()}>{this.isSubmitLoading() ? '保存中...' : '保存'}</button>
            </Formsy.Form>
        );
    }
});

module.exports = connect( state => ({
    action: state.action,
    user: state.user,
}) )(User);

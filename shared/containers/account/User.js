import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import Formsy from 'formsy-react';

import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyCheckbox from '../../components/formsy/FormsyCheckbox.jsx';
import FormsyRadioGroup from '../../components/formsy/FormsyRadioGroup.jsx';
import FormsyText from '../../components/formsy/FormsyText.jsx';
import FormsyDate from '../../components/formsy/FormsyDate.jsx';
import FormsyAddress from '../../components/formsy/FormsyAddress.jsx';

import {getRequestTypes} from '../../libs/utils';
import UserAction from '../../actions/UserAction';

let User = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    getInitialState: function() {
        return {
            error: '', // 全局的错误信息显示
        };
    },

    componentWillReceiveProps: function(nextProps) {
        const infoType = getRequestTypes(UserAction.UPDATE_INFO);
        switch (nextProps.action.type) {
            case infoType.success:
                this.props.history.push('/account/index');
                break;
            case infoType.failure:
                this.enableSubmitButton();
                this.setState({error: nextProps.action.error && nextProps.action.error.message || '修改信息失败'});
                break;
        }
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
        this.loadingSubmitButton();

        let addr = model.addr.split(',');
        model.province = addr.length ? addr[0] : null;
        model.city = addr.length > 1 ? addr[1] : null;
        model.county = addr.length > 2 ? addr[2] : null;

        const userAction = new UserAction();
        this.props.dispatch( userAction.updateInfo(model) );
    },

    render: function() {
        let user = this.props.user.data || {};

        return (
            <Formsy.Form
                ref="form"
                className="account-user"
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                onValidSubmit={this.onSubmit}
                onChange={this.onFormChange}
            >
                <FormsyText
                    name="nickname"
                    title="昵称："
                    defaultValue={user.nickname}
                    placeholder="4-30个字符，支持中英文、数字、“_”或减号"
                    required
                    validations={{matchRegexp: /^[\u4e00-\u9fa5_a-zA-Z\d\-]{2,30}$/}}
                    validationError="请输入4-30个字符，支持中英文、数字、“_”或减号"
                />
                <div className="formsy-list cl">
                    <label>性别：</label>
                    <FormsyRadioGroup
                        name="gender"
                        defaultValue={user.gender || 0}
                        options={[
                            {value: 1, label: '男'},
                            {value: 2, label: '女'},
                            {value: 0, label: '保密'},
                        ]}
                    />
                </div>
                <FormsyDate
                    name="birthday"
                    title="出生日期："
                    defaultValue={user.birthday}
                />
                <div className="address">
                    <FormsyAddress
                        name="addr"
                        title="所在地区："
                        defaultProvince={user.province}
                        defaultCity={user.city}
                        defaultCounty={user.county}
                        required
                        validations={{matchRegexp: /^\d+,\d+,\d+$/}}
                        validationError="请选择所在地区"
                    />
                </div>
                {/*
                <FormsyText
                    name="birthday"
                    title="出生日期："
                    placeholder="请输入出生日期，格式：1990-01-08"
                    required
                    validations={{matchRegexp: /^\d{4}-\d{2}-\d{2}$/}}
                    validationError="请输入真实出生日期"
                />
                <FormsyText
                    name="addr"
                    title="所在地区："
                    placeholder="请输入所在地区城市名称"
                    required
                    validations={{matchRegexp: /^[\u4e00-\u9fa5]{2,10}$/}}
                    validationError="请输入城市名称"
                />
                */}
                {/*
                <dl>
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
                */}
                <div>
                    <button className={this.canSubmit() ? 'btn' : 'btn disabled'} type="submit" disabled={!this.canSubmit()}>{this.isSubmitLoading() ? '保存中...' : '保存'}</button>
                    <span className="text-error"> {this.state.error}</span>
                </div>
            </Formsy.Form>
        );
    }
});

module.exports = connect( state => ({
    action: state.action,
    user: state.user,
}) )(User);

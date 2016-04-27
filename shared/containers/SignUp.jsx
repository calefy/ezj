/**
 * 报名
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Formsy from 'formsy-react';
import FormsyCheckbox from '../components/formsy/FormsyCheckbox.jsx';
import FormsyRadioGroup from '../components/formsy/FormsyRadioGroup.jsx';
import FormsyText from '../components/formsy/FormsyText.jsx';

import { payType } from '../libs/const';
import { getRequestTypes } from '../libs/utils';
import formsySubmitButtonMixin from '../mixins/formsySubmitButtonMixin';
import CommerceAction from '../actions/CommerceAction';
import Dialog from '../components/Dialog.jsx';

let SignUp = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    statics: {
        type: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
    },

    handleSubmit: function(model) {
        console.log(model);
    },

    render: function() {
        return (
            <Formsy.Form
                className="join-web-sign"
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                onValidSubmit={this.handleSubmit}
                onChange={this.onFormChange}
            >

                <div className="join-web-info">
                    <h5 className="cl">填写信息<em className="fr">（为确保报名成功，请您输入正确的个人信息）</em></h5>
                    <div>
                        <FormsyText
                            name="name"
                            title="姓名："
                            placeholder="请输入您的姓名"
                            required
                            validationError="请输入正确的姓名"
                        />
                        <FormsyText
                            name="email"
                            title="邮箱："
                            placeholder="请输入您的常用邮箱"
                            required
                            validations="isEmail"
                            validationError="请输入正确邮箱"
                        />

                        <FormsyText
                            name="mobile"
                            title="手机："
                            placeholder="请输入您的联系方式"
                            required
                            validations={{matchRegexp: /1[3-9]\d{9}/}}
                            validationError="请输入正确的手机"
                        />
                        <dl>
                            <dt>发票</dt>
                            <dd><FormsyCheckbox name="fapiao" value="1"/></dd>
                        </dl>
                        <FormsyText
                            name="prefix"
                            title=" "
                            placeholder="请输入发票抬头"
                            required
                            validationError="请输入发票抬头"
                        />
                        <div className="join-buy cl">
                                    <FormsyRadioGroup
                                        name="person"
                                        defaultValue="1"
                                        options={[
                                            {value: 1, label: '是我本人购买'},
                                            {value: 2, label: '替其他人购买'},
                                        ]}
                                    />
                        </div>
                    </div>
                </div>
                <div className="join-web-choose">
                    <h5>选择课程类型</h5>
                    <div>
                        <p>请选择培训地点：会务组将根据有效的报名信息，通过电子邮件或手机短信方式向参会嘉宾告知培训地点及日程</p>
                        <div className="join-web-choose-place on">
                            <p>北京</p>
                            <p>第4期：2016年03月26日－03月27日</p>
                        </div>
                        <div className="join-web-choose-price">
                            <p>培训费用：</p>
                            <div className="join-web-choose-price-info">
                                <h5>2天线下培训 + 17门在线课程 = ¥4980</h5>
                                <p>含2天面授课程、17门总计72课时资产证券化<br />在线课程、面授课程教材费等</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="join-web-pay">
                    <h5>选择支付方式</h5>
                    <div className="join-web-pay-info">
                        <ul className="join-web-pay-type cl">
                            <li className="fl on">在线支付</li>
                            <li className="fl">线下汇款支付</li>
                        </ul>
                        <div className="join-web-pay-content">
                            <ul className="join-web-pay-online cl">
                                <li className="fl on"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1181bf80cd08ff6b35f58a9e6ceb1589.png" /></li>
                                <li className="fl"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/069c882368b67fe9812018db3b5cdd39.png" /></li>
                            </ul>
                            <div className="join-web-pay-offline">
                                <h5>线下汇款报名说明：</h5>
                                <ul>
                                    <li>步骤一：根据页面上方提示，提交报名信息</li>
                                    <li>步骤二：汇款支付</li>
                                    <li>请你根据下方账号信息汇款，汇款时<b>务必在备注中写明报名课程、姓名、手机号</b>，我们的工作人员会在收到汇款后与您确认报名成功。</li>
                                    <li>户名：清控紫荆（北京）科技股份有限公司</li>
                                    <li>开户行：中国民生银行股份有限公司北京魏公村支行</li>
                                    <li>账号：694485289</li>
                                    <li>客服电话：13811977670 徐老师</li>
                                </ul>
                                <p>备注：线上课程在付款后，课程全部上线之日起180天内有效</p>
                            </div>
                        </div>
                    </div>
                    <div className="join-web-btn">
                    <input type="hidden" name="hello" value="12345"/>
                    
                        <button type="submit">确认</button>
                    </div>
                </div>
            </Formsy.Form>
        );
    }
});

module.exports = connect( state => ({
    action: state.action,
    user: state.user,
}) )(SignUp);

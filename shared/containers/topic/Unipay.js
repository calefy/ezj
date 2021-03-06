import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import {getRequestTypes} from '../../libs/utils';
import CoursesAction from '../../actions/CoursesAction';
import UserAction from '../../actions/UserAction';

import formsySubmitButtonMixin from '../../mixins/formsySubmitButtonMixin';
import FormsyText from '../../components/formsy/FormsyText.jsx';
import Dialog     from '../../components/Dialog.jsx';
import RegistForm from '../../components/RegistForm.jsx';
import Protocol from '../../components/Protocol.jsx';

import { cryptoPasswd } from '../../libs/utils';

if (process.env.BROWSER) {
    require('css/unipay.css');
}


let Unipay = React.createClass({
    mixins: [ formsySubmitButtonMixin ],
    getInitialState: function() {
        return {
            showDialog: false,  // 显示注册框
            showProtocol: null, // 显示协议：pay/private
            error: ''
        };
    },
    userAction: new UserAction(),

    componentWillReceiveProps: function(nextProps) {
        const loginType = getRequestTypes(UserAction.LOGIN);
        const sendType = getRequestTypes(UserAction.SEND);
        const registType = getRequestTypes(UserAction.REGIST);
        switch(nextProps.action.type) {
            case loginType.success:
                document.location = '/topic/financial';
                break;
            case loginType.failure:
                this.enableSubmitButton(); // 因react state设置问题，该行并不会生效
                this.setState({ error: nextProps.action.error && nextProps.action.error.message || '登录失败' }); // 重置全部state
                break;

            case sendType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_VALID_CODE, nextProps.action.error);
                break;

            case registType.success:
                this.hideDialog();
                document.location = '/topic/financial';
                break;
            case registType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_REGIST, nextProps.action.error);
                break;
        }
    },

    _setState: function(obj) {
        this.setState(Object.assign({}, this.state, obj || {}));
    },
    /**
     * 提交登录
     */
    onSubmit: function(model) {
        let login_name = model.login_name.trim();
        let password = cryptoPasswd(model.password);
        this.loadingSubmitButton();
        this.props.dispatch(this.userAction.login({ login_name , password }));
    },

    // 表单变更时，取消掉全局错误消息
    onFormChange: function() {
        this.setState({ error: '' });
    },


    // 注册相关
    showDialog: function() {
        this._setState({ showDialog: true });
    },
    hideDialog: function() {
        this._setState({ showDialog: false });
    },
    handleSendValidCode: function(contact) {
        this.props.dispatch(this.userAction.send(contact));
    },
    handleRegist: function(data) {
        // unipay添加注册channel字段
        data = Object.assign(data, {channel_code: 11});
        this.props.dispatch(this.userAction.reg(data));
    },
    handleShowProtocol: function(type) {
        this._setState({ showProtocol: type });
    },
    hideProtocolDialog: function() {
        this._setState({ showProtocol: null });
    },

    render: function() {
        return (
            <div className="unipay wide">
                <div className="unipay-header-top">
                    <div className="container">
                        <div className="fl">
                            <Link to="/"><img src="//zj-avatar.img-cn-beijing.aliyuncs.com/4876ebcb39fe89cce6c1e82a029c5f67478101461.png" /></Link>
                        </div>
                        <div className="fl"  style={{ marginTop: 5 }}>
                            <Link to="/"><img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/a2fec2523cee8bed01f0e53f4061cfc0.png" /></Link>
                        </div>
                    </div>
                </div>
                <div className="unipay-banner cl">
                    <div className="container">
                        <div className="unipay-banner-fl fl">
                            <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/b93dd2471aff903b6e580111598bc209.png" />
                            <p className="unipay-btn">注册/登录后了解详情</p>
                        </div>
                        <div className="unipay-banner-fr fr">
                            <div className="pop-logo"><em>紫荆教育</em></div>
                            <Formsy.Form
                                ref="uniForm"
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
                                            手机号/邮箱/用户名<span className="form-red">*</span>
                                        </span>
                                    }
                                    required
                                />

                                <FormsyText
                                    name="password"
                                    type="password"
                                    title={
                                        <span>
                                            密码<span className="form-red">*</span><Link to="/pwd/index" className="fr">忘记密码？</Link>
                                        </span>
                                    }
                                    required
                                />
                                <div className="pop-btn">
                                    <button type="submit" disabled={!this.canSubmit()}
                                        className={ this.canSubmit() ? '' : 'disabled'} >{this.isSubmitLoading() ? '登录中...' : '登录'}</button>
                                </div>
                                <div className="pop-other cl">
                                    <em className="fl">没有账号？<button type="button" onClick={this.showDialog}>马上注册</button></em>
                                    <em className="fr" style={{ color: "red" }}>{this.state.error}</em>
                                </div>
                            </Formsy.Form>
                        </div>
                    </div>
                </div>
                <div className="unipay-content special-content">
                    <div className="container">
                        <div className="unipay-survey bg-white">
                            <h3>课程概况</h3>
                            <div className="unipay-survey-text">
                                <p>金融互联网时代已经来临，传统金融机构该如何应对？</p>
                                <p>新一轮的金融革命已经展开，传统金融业是否面临重新洗牌？</p>
                                <p>互联网尤其是移动互联网的告诉发展，直接催生了创新性支付的革命。</p>
                            </div>
                            <div className="unipay-survey-content cl">
                                <div className="unipay-survey-content-fl fl">
                                    本课程将带给您
                                </div>
                                <ul className="unipay-survey-content-fr fr">
                                    <li>
                                        <em>1</em>
                                        <p>探索互联网金融产业的机遇与挑战，预测互联网金融趋势，把脉金融产业布局</p>
                                    </li>
                                    <li>
                                        <em>2</em>
                                        <p>探讨互联网大浪潮下成功的商业支付案例</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="unipay-producers bg-white">
                            <h3>课程制作方</h3>
                            <ul className="cl">
                                <li className="fl">
                                    <h4>紫荆教育</h4>
                                    <p>紫荆教育依托于清华大学和五道口金融学院丰富的教育资源，秉承其严谨、务实的教学理念，紧密结合宏观经济转型过程中，企业和个人知识结构升级的需求，融理论大家、时间专家、顶尖专业机构集体智慧于一体，构建以金融为核心的商业实战知识体系，努力为中国社会商业素质提高贡献一己之力。</p>
                                </li>
                                <li className="fr">
                                    <h4>中国银联支付学院</h4>
                                    <p>中国银联支付学院作为中国银联的职能部门，肩负着培养银行卡产业支付专业人才的使命，包括举办各类管理类、银行卡业务规则、技术标准和差错认证、风险等各类专业及专业技能培训。近年来，中国银联支付学院不断积极探索企业大学的创新与转型，获得了培训杂志、中国远程教育、交大海外等权威机构颁发的多项荣誉奖项。</p>
                                </li>
                            </ul>
                        </div>
                        <div className="unipay-combine bg-white">
                            <h3>线上线下结合</h3>
                            <ul>
                                <li>
                                    <h4>8门线上课程</h4>
                                    <div>
                                        <em>互联网时代的支付变革</em>
                                        <em>全球互联网银行的前生今世</em>
                                        <em>互联网券商的创新与发展</em>
                                        <em>互联网保险的突围之路</em>
                                        <em>消费金融与P2P网贷的发展与实践</em>
                                        <em>互联网众筹</em>
                                        <em>互联网金融与大数据</em>
                                        <em>线上线下融合的金融大数据</em>
                                    </div>
                                </li>
                                <li>
                                    <h4>线下课程</h4>
                                    <div>
                                        <em>线下活动和专题讨论</em>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="unipay-footer">
                    <div className="container">
                        <h3>课程合作方:</h3>
                        <ul className="cl">
                            <li className="fl">
                                <h4>紫荆教育</h4>
                                <div>
                                    <p>北京市海淀区双清路清华大学东门液晶大厦2层</p>
                                    联系方式:<br />
                                    电话：4008-363-463<br />
                                    邮箱：<a href="mailto:service@ezijing.com">service@ezijing.com</a><br />
                                </div>
                            </li>
                            <li className="fr">
                                <h4>银联支付学院</h4>
                                <div>
                                    <p>上海市浦东新区顾唐路1899号中国银联培训中心三楼</p>
                                    联系方式:<br />
                                    电话：021-50361511<br />
                                    邮箱：<a href="mailto:chukang@unionpay.com">chukang@unionpay.com</a><br />
                                </div>
                            </li>
                        </ul>
                        <p className="footer-uni">Copyright &copy; 2016 Zijing Education. All rights reserved. 京ICP证150431号</p>
                    </div>
                </div>
                {/*注册弹框*/}
                <Dialog
                    ref="dialog"
                    className="pop register-pop"
                    open={this.state.showDialog}
                    onRequestClose={this.hideDialog}
                >
                    <div className="pop-logo"><em>紫荆教育</em></div>
                    <RegistForm
                        ref="registForm"
                        onSendValidCode={this.handleSendValidCode}
                        onRegist={this.handleRegist}
                        onTurnToLogin={this.hideDialog}
                        onTurnToProtocol={this.handleShowProtocol}
                    />
                </Dialog>

                {/*隐私/付费协议*/}
                <Dialog
                    className="agreement-pop pop"
                    open={!!this.state.showProtocol}
                    onRequestClose={this.hideProtocolDialog}
                >
                    <Protocol type={this.state.showProtocol} />
                </Dialog>
            </div>
        );
    }
});

module.exports = connect( state => ({
    action: state.action,
    examination: state.examination,
    sheet: state.sheet,
}) )(Unipay);

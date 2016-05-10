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

    payWindow: null,
    payWindowName: null,

    statics: {
        pageKey: PropTypes.string.isRequired, // 区分不同类型的报名页
    },
    getInitialState: function() {
        // 设置初始不同类型专题页的type
        let type;
        if (this.props.pageKey === 'security') {
            type = 'beijing';
        } else if (this.props.pageKey === 'finance') {
            type = '0';
        }

        return {
            payMethod: 'alipay', // 支付方法：alipay、unipay、offline
            needTicket: false, // 是否需要发票
            type: type, // 标识课程类型
            showPayConfirm: false, // 显示支付后提示框
        };
    },
    componentWillReceiveProps: function(nextProps) {
        // 针对提交后处理
        let types = getRequestTypes(CommerceAction.PAY);
        switch (nextProps.action.type) {
            case types.success:
                let res = nextProps.action.response.data;
                if (res.url) {
                    this._setState({ showPayConfirm: true }); // 显示确认支付状态框
                    if (this.state.payMethod === 'alipay') {
                        this.payWindow.location.href = res.url;
                    } else if (this.state.payMethod === 'unipay') {
                        // 银联需要表单提交
                        let html = [];
                        for (let key in res.params) {
                            html.push(`<input name="${key}" value="${res.params[key]}" type="hidden" />`);
                        }
                        this.refs.unipayForm.innerHTML = html.join('');
                        this.refs.unipayForm.target = this.payWindowName; // 防止新窗口被拦截
                        this.refs.unipayForm.action = res.url;
                        this.refs.unipayForm.submit();
                    }
                } else {
                    if (!(this.props.user.data && this.props.user.data.uid)) {
                        alert("报名成功！ 请登录紫荆账户。\n新用户请使用报名信息登录：\n  用户名：您报名的邮箱 \n  密码：您报名手机号后6位 \n为了您的账号安全，请登录后修改密码。");
                    } else {
                        alert('报名成功！');
                        nextProps.history.push('/account/orders');
                    }
                }
                break;
            case types.failure:
                if (this.payWindow) {
                    this.payWindow.close();
                }
                alert('报名失败: ' + nextProps.action.error.message);
                break;
        }
    },

    _setState: function(obj) {
        return this.setState(Object.assign({}, this.state, obj || {}));
    },

    // 发票选择项变更时，控制needTicket变化，以便toggle输入发票抬头
    onChangeTicket: function(name, value) {
        this._setState({ needTicket: !!value });
    },

    // 切换线上线下
    onChangePayType: function(e) {
        e.preventDefault();
        let key = e.currentTarget.getAttribute('data-key');
        let old = this.state.payMethod;
        if (old !== key) {
            if (key === 'online') { // 切换线上支付
                this._setState({ payMethod: 'alipay' });
            } else { // 选择切换线下
                this._setState({ payMethod: 'offline' });
            }
        }
    },
    // 切换支付方法alipay与unipay
    onChangePayMethod: function(e) {
        e.preventDefault();
        let key = e.currentTarget.getAttribute('data-key');
        if (key !== this.state.payMethod) {
            this._setState({ payMethod: key });
        }
    },

    // 切换课程类型
    onChangeType: function(e) {
        e.preventDefault();
        let key = e.currentTarget.getAttribute('data-key');
        if (key !== this.state.type) {
            this._setState({ type: key });
        }
    },

    // 关闭支付确认框
    onClosePayConfirm: function(e) {
        e && e.preventDefault();
        this._setState({ showPayConfirm: false });

        // 显示登录
        if (!(this.props.user.data && this.props.user.data.uid)) {
            setTimeout(function() {
                alert("报名成功！ 请登录紫荆账户。\n新用户请使用报名信息登录：\n  用户名：您报名的邮箱 \n  密码：您报名手机号后6位 \n为了您的账号安全，请登录后修改密码。");
            }, 10);
        } else {
            alert('报名成功！');
            this.props.history.push('/account/orders');
        }
    },

    // 提交
    handleSubmit: function(model) {
        // 根据支付方式确定是否打开新窗口
        if (this.state.payMethod !== 'offline') {
            this.payWindowName = 'payWindow_' + (new Date()).getTime();
            this.payWindow = window.open('about:blank', this.payWindowName);
        }

        // 区分id、type
        let type = payType.PACKAGE;
        let id = '';
        if (this.props.pageKey === 'security') {
            id = '6119033157460164608'; // 对应原线下课程 9642 (线上课程为 9166)
        } else if (this.props.pageKey === 'finance') {
            let arr = ['6119033159091748864', '6119033159372767232', '6119033161717383168']; // 对应原线下 9904，9905，9906（线上课程为 9594）
            id = arr[this.state.type - 0];
        }

        // 组装数据
        let data = {
            purchase_type: this.props.user.data ? model.person : 0,// 购买类型：0-匿名，1-自己，2-他人
            items: id,
            item_type: type,
            payment_method: this.state.payMethod === 'offline' ? 90 : (this.state.payMethod === 'alipay' ? 20 : 30), // 在线支付方式附加紫荆币
            name: model.name,
            email: model.email,
            mobile: model.mobile,
            invoice: model.ticket_text || '',
            comment: this.state.type, // 存储课程类型，值不定
            pay_return_success_uri: '/topic/' + this.props.pageKey,
            pay_return_failed_uri: '/topic/' + this.props.pageKey,
        };

        // 提交
        const commerceAction = new CommerceAction();
        this.props.dispatch( commerceAction.pay(data) );
    },



    // 渲染联系方式
    renderContact: function() {
        if (this.props.pageKey === 'security') {
            return '13811977670 徐老师';
        } else if (this.props.pageKey === 'finance') {
            return '13811997720 刘老师';
        }
    },
    // 根据页面渲染课程类型
    renderTypeInfo: function() {
        if (this.props.pageKey === 'security') {
            return (
                <div>
                    <p>请选择培训地点：会务组将根据有效的报名信息，通过电子邮件或手机短信方式向参会嘉宾告知培训地点及日程</p>
                    <div className={`join-web-choose-place ${this.state.type === 'beijing' ? 'on' : ''}`}>
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
            );
        } else if (this.props.pageKey === 'finance') {
            return (
                <div>
                    <p>请选择您要参与的现场面授班，视频点播班请在上方超级课程表中购买</p>
                    <div className="join-web-selcourse cl">
                        <Link to="#" className={this.state.type === '0' ? 'on' : ''} data-key="0" onClick={this.onChangeType}>第六讲     2016-04-15<br />地点：五道口金融学院</Link>
                        <Link to="#" className={this.state.type === '1' ? 'on' : ''} data-key="1" onClick={this.onChangeType}>第七讲     2016-04-16<br />地点：五道口金融学院</Link>
                        <Link to="#" className={this.state.type === '2' ? 'on' : ''} data-key="2" onClick={this.onChangeType}>第八讲     2016-04-17<br />地点：五道口金融学院</Link>
                    </div>
                    <dl className="cl">
                        <dt>课程信息：</dt>
                        <dd>
                            <div className="join-web-gift">
                                <div className="join-web-offline">
                                    <h4 className="join-web-title-red">学员福利   <em>价格：¥ 2580</em></h4>
                                    <p>1) 可参加线下面授，第一时间学到报告精髓</p>
                                    <p>2) 与讲师现场互动、个案现场咨询服务</p>
                                    <p>3) 可参加视频点播学习（有效期180天）</p>
                                    <p>4) 获得授课 PPT 教材纸质版 1 份</p>
                                    <p>5) 价值 188 元《全球互联网金融商业模式报告（2015）》1 本</p>
                                    <p>6) 有机会到互联网金融优秀企业参观，与创始人及高管团队面对面交流</p>
                                </div>
                                <div className="join-web-online">
                                    <h4 className="join-web-title-red">学员福利   <em>价格：¥ 2580</em></h4>
                                    <p>1) 可参加线下面授，第一时间学到报告精髓</p>
                                    <p>2) 与讲师现场互动、个案现场咨询服务</p>
                                    <p>3) 可参加视频点播学习（有效期180天）</p>
                                    <p>4) 获得授课 PPT 教材纸质版 1 份</p>
                                    <p>5) 价值 188 元《全球互联网金融商业模式报告（2015）》1 本</p>
                                    <p>6) 有机会到互联网金融优秀企业参观，与创始人及高管团队面对面交流</p>
                                </div>
                            </div>
                            <div className="ifc online"></div>
                        </dd>
                    </dl>
                </div>
            );
        }

    },

    render: function() {
        let isOfflinePay = this.state.payMethod === 'offline';

        return (
            <div className="join-web-si">
                <Formsy.Form
                    className="join-web-sign"
                    onValid={this.enableSubmitButton}
                    onInvalid={this.disableSubmitButton}
                    onValidSubmit={this.handleSubmit}
                    onChange={this.onFormChange}
                >

                    <div className="join-web-info">
                        <h5 className="cl">填写信息 <em>（为确保报名成功，请您输入正确的个人信息）</em></h5>
                        <div>
                            <FormsyText
                                name="name"
                                title="姓名："
                                placeholder="请输入您的姓名"
                                required
                                validations={{matchRegexp: /^[^\s].+/}}
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
                                validationError="请输入正确的手机号"
                            />

                            <div className="formsy-list">
                                <label>发票:</label>
                                <div className="dib vam"><FormsyCheckbox name="ticket" value="1" onChange={this.onChangeTicket}/></div>
                            </div>
                            {this.state.needTicket ?
                                <FormsyText
                                    name="ticket_text"
                                    title=" "
                                    placeholder="请输入发票抬头"
                                    required
                                    validationError="请输入发票抬头"
                                />
                                : null
                            }
                            <div className="join-buy cl">
                                <FormsyRadioGroup
                                    name="person"
                                    defaultValue="1"
                                    labelPosition="before"
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
                        {this.renderTypeInfo()}
                    </div>
                    <div className="join-web-pay">
                        <h5>选择支付方式<em>客服电话：{this.renderContact()}</em></h5>
                        <div className="join-web-pay-info">
                            <ul className="join-web-pay-type cl">
                                <li className={`fl ${isOfflinePay ? '' : 'on'}`} data-key="online" onClick={this.onChangePayType}>在线支付</li>
                                <li className={`fl ${isOfflinePay ? 'on' : ''}`} data-key="offline" onClick={this.onChangePayType}>线下汇款支付</li>
                            </ul>
                            <div className="join-web-pay-content">
                                <ul className={`join-web-pay-online cl ${isOfflinePay ? 'hide' : ''}`}>
                                    <li className={`fl ${this.state.payMethod === 'alipay' ? 'on' : ''}`} data-key="alipay" onClick={this.onChangePayMethod}><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1181bf80cd08ff6b35f58a9e6ceb1589.png" /></li>
                                    <li className={`fl ${this.state.payMethod === 'unipay' ? 'on' : ''}`} data-key="unipay" onClick={this.onChangePayMethod}><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/069c882368b67fe9812018db3b5cdd39.png" /></li>
                                </ul>
                                <div className={`join-web-pay-offline ${isOfflinePay ? '' : 'hide'}`}>
                                    <h5>线下汇款报名说明：</h5>
                                    <ul>
                                        <li>步骤一：根据页面上方提示，提交报名信息</li>
                                        <li>步骤二：汇款支付</li>
                                        <li>请你根据下方账号信息汇款，汇款时<b>务必在备注中写明报名课程、姓名、手机号</b>，我们的工作人员会在收到汇款后与您确认报名成功。</li>
                                        <li>户名：清控紫荆（北京）科技股份有限公司</li>
                                        <li>开户行：中国民生银行股份有限公司北京魏公村支行</li>
                                        <li>账号：694485289</li>
                                        <li>客服电话：{this.renderContact()}</li>
                                    </ul>
                                    <p>备注：线上课程在付款后，课程全部上线之日起180天内有效</p>
                                </div>
                            </div>
                        </div>
                        <div className="join-web-btn">
                            <button type="submit" className={`btn ${this.canSubmit() ? '' : 'disabled'}`} disabled={!this.canSubmit()}>确认</button>
                        </div>
                    </div>
                </Formsy.Form>

                <form target="payWindow" method="POST" className="hide" ref="unipayForm"></form>
                <Dialog className="popover pop" open={this.state.showPayConfirm} onRequestClose={this.onClosePayConfirm}>
                    <h4>确认支付结果</h4>
                    <div className="popover-info">
                        请于24小时内完成支付，逾期系统将自动取消订单。
                    </div>
                    <div className="popover-btn">
                        <a href="#" className="btn" onClick={this.onClosePayConfirm}>支付完成</a>
                        <a href="#" className="btn disabled" onClick={this.onClosePayConfirm}>支付遇到问题</a>
                    </div>
                </Dialog>
            </div>
        );
    }
});

module.exports = connect( state => ({
    action: state.action,
    user: state.user,
}) )(SignUp);

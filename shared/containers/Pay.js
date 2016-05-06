import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import Formsy from 'formsy-react';
import FormsyCheckbox from '../components/formsy/FormsyCheckbox.jsx';

import { payType } from '../libs/const';
import { getRequestTypes } from '../libs/utils';
import formsySubmitButtonMixin from '../mixins/formsySubmitButtonMixin';
import CoursesAction from '../actions/CoursesAction';
import CommerceAction from '../actions/CommerceAction';
import Dialog from '../components/Dialog.jsx';

if (process.env.BROWSER) {
    require('css/pay.css');
}

let Pay = React.createClass({
    mixins: [ formsySubmitButtonMixin ],

    statics: {
        fetchData: function({dispatch, params={}, location={}, apiClient}) {
            const courseAction = new CoursesAction({ apiClient });
            const commerceAction = new CommerceAction({ apiClient });
            let type = location.query.type;
            let id = location.query.id;
            return Promise.all([
                dispatch( commerceAction.loadAccount() ),
                payType.COURSE == type ?
                    dispatch( courseAction.loadCourseDetail(id) ) :
                    dispatch( commerceAction.loadProduct(id) )
            ]);
        }
    },

    payWindow: null,
    payWindowName: null,

    getInitialState: function() {
        return {
            pointPay: true, // 紫荆币支付pointpay
            payMethod: 'alipay', // 支付方式： alipay、unipay
            isShowConfirm: false, // 支付结果确认显示标识
            isShowProtocol: false, // 协议显示标识
        };
    },

    componentDidMount: function() {
        const { account, course, product, location } = this.props;
        let type = location.query.type;
        let id = location.query.id;
        if (account.isFetching ||
            (type == payType.COURSE && (course.isFetching || (course.data && course.data.id !== id))) ||
            (type == payType.PACKAGE && (product.isFetching || (product.data && product.data.id !== id)))) {
            Pay.fetchData(this.props);
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.props.location.search !== nextProps.location.search) {
            Pay.fetchData(nextProps);
            return;
        }

        // 针对提交后处理
        let types = getRequestTypes(CommerceAction.PAY);
        switch (nextProps.action.type) {
            case types.success:
                let res = nextProps.action.response.data;
                if (res.url) {
                    this._setState({ isShowConfirm: true }); // 显示确认支付状态框
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
                    // 紫荆币购买成功
                    alert('购买成功');
                    this.onPayOver();
                }
                break;
            case types.failure:
                alert('购买失败: ' + nextProps.action.error.message);
                break;
        }
    },

    _setState: function(obj) {
        return this.setState(Object.assign({}, this.state, obj || {}));
    },

    // 支付确认框显示
    onCloseConfirm: function(e) {
        e.preventDefault();
        this._setState({ isShowConfirm: false });
    },

    // 支付协议框显示
    onCloseProtocol: function(e) {
        e.preventDefault();
        this._setState({ isShowProtocol: false });
    },
    onOpenProtocol: function(e) {
        e.preventDefault();
        this._setState({ isShowProtocol: true });
    },
    // 紫荆币支付选项切换
    onChangePay: function(e) {
        this._setState({ pointPay: this.refs.pointpay.checked });
    },
    // 点击具体的支付方式
    onClickPayMehtod: function(e) {
        e.preventDefault();
        let method = e.currentTarget.getAttribute('data-pay');
        if (this.state.payMethod !== method) {
            this._setState({ payMethod: method });
        }
    },

    // 执行支付
    onPay: function(model) {
        const { location, account, course, product } = this.props;
        // 如果选择了紫荆币支付，判断是否足够，如果不足，设置支付窗口
        let price = location.query.type == payType.COURSE ?
                        course.data.course_price || 0 :
                        product.data.price || 0;
        if (!this.state.pointPay ||
                account.data.available_amount - 0 < price - 0) {
            this.payWindowName = 'payWindow_' + (new Date()).getTime();
            this.payWindow = window.open('about:blank', this.payWindowName);
        }

        // 读取准备上传参数
        let id = location.query.id;
        let type = location.query.type;
        let method = this.state.payMethod;
        let backUrl = type == payType.COURSE ? `/courses/${id}` : '/account/orders';

        const commerceAction = new CommerceAction();
        this.props.dispatch(commerceAction.pay({
            items: id,
            item_type: type, // 购买类型
            payment_method: (this.state.pointPay ? 10 + ',' : '') + (method === 'alipay' ? 20 : method === 'unipay' ? 30 : ''), // 支付方式代码，与紫荆币组合逗号分隔
            pay_return_success_uri: backUrl,
            pay_return_failed_uri: backUrl,
        }));
    },

    // 支付完成或支付遇到问题，跳转到来源页面
    onPayOver: function(e) {
        e && e.preventDefault();
        if (this.props.location.query.type == payType.COURSE) {
            const courseId = this.props.location.query.id;
            // 重新请求课程个人信息
            const courseAction = new CoursesAction();
            this.props.dispatch( courseAction.loadCoursePrivate(courseId) );
            this.props.history.push(`/courses/${courseId}`);
        } else {
            this.props.history.goBack();
        }
    },

    // 表单变更时，取消掉全局错误消息
    onFormChange: function() {
        if (this.state.error) {
            this._setState({ error: '' });
        }
    },

    render: function() {
        let type = this.props.location.query.type;
        let account = this.props.account.data || {};
        let course = this.props.course.data || {};
        let product = this.props.product.data || {};

        let accountAmount = account.available_amount || 0;
        let price = type == payType.COURSE ?
                        course.course_price || 0 :
                        product.price || 0;

        return (
            <div className="container">
                <Formsy.Form
                    onValid={this.enableSubmitButton}
                    onInvalid={this.disableSubmitButton}
                    onValidSubmit={this.onPay}
                    onChange={this.onFormChange}
                >
                <div className="pay bg-white">
                    <h4>参加课程《{type == payType.COURSE ? course.course_name : product.title}》</h4>
                    <div className="pay-course-info">
                        {type == payType.PACKAGE ?
                            <div>
                                <h5 className="cl">
                                    <span className="fl">包含课程</span>
                                    <em className="fr">共{(product.courses || []).length}门</em>
                                </h5>
                                <div className="pay-course-list">
                                    {(product.courses || []).map((item, index) => {
                                        return <p key={index}>{item.course_name}</p>
                                    })}
                                </div>
                            </div>
                            : null
                        }
                        <div className="pay-course-price cl">
                            <span className="fl">订单总价</span>
                            <em className="fr">&yen;{price}</em>
                        </div>
                    </div>
                    <div className="pay-balance">
                        <h3>结算信息</h3>
                        <h4 className="pay-balance-price cl">
                            <span className="fl"><input type="checkbox" ref="pointpay" defaultChecked={true} onChange={this.onChangePay} /> 使用紫荆币支付</span>
                            <em className="fr">-{this.state.pointPay ? Math.min(price, accountAmount) : 0}</em>
                        </h4>
                        <h5 className="cl">
                            <span className="fl">还需支付</span>
                            <em className="fr">&yen;{this.state.pointPay ? (price > accountAmount ? price - accountAmount : 0) : price}</em>
                        </h5>
                    </div>
                    <div className="pay-method">
                        <dl>
                            <dt>支付方式</dt>
                            <dd className={` pay-alipay ${this.state.payMethod === 'alipay' ? 'on' : null}`} data-pay="alipay" onClick={this.onClickPayMehtod}><em>&nbsp;</em></dd>
                            <dd className={` pay-unipay ${this.state.payMethod === 'unipay' ? 'on' : null}`} data-pay="unipay" onClick={this.onClickPayMehtod}><em>银联</em></dd>
                        </dl>
                        {/*
                        <div>
                            <FormsyCheckbox name="agree" value="1" defaultChecked={true} required /> 我已经阅读并同意
                            <a href="#" onClick={this.onOpenProtocol}>紫荆教育用户付费协议</a>
                        </div>
                        */}
                        <button type="submit" className={`btn ${this.canSubmit() ? '' : 'disabled'}`} disabled={!this.canSubmit()}>{this.isSubmitLoading() ? '结算中...' : '去结算'}</button>
                        <p className="pay-valid-date">付款后{type == payType.COURSE ? 90 : 180}天内有效</p>
                    </div>
                </div>
                </Formsy.Form>

                <form target="payWindow" method="POST" className="hide" ref="unipayForm"></form>


                <Dialog className="popover pop" open={this.state.isShowConfirm} onRequestClose={this.onCloseConfirm}>
                    <h4>确认支付结果</h4>
                    <div className="popover-info">
                        请于24小时内完成支付，逾期系统将自动取消订单。
                    </div>
                    <div className="popover-btn">
                        <a href="#" className="btn" onClick={this.onPayOver}>支付完成</a>
                        <a href="#" className="btn disabled" onClick={this.onCloseConfirm}>支付遇到问题</a>
                    </div>
                </Dialog>
                {/*
                <Dialog className="agreement-pop pop" open={this.state.isShowProtocol} onRequestClose={this.onCloseProtocol}>
                    <h4>紫荆教育网络用户付费协议</h4>
                    <div className="agreement-content">
                        <p>尊敬的用户您好：</p>
                        <p>欢迎您选择清控紫荆（北京）教育科技有限公司（以下简称“紫荆教育”）为您提供的金融在线培训课程，为保证权益，请您在付费前详细阅读本协议，<b style={{ fontSize: 16 }}>特别是加粗部分</b>。当您点击“【我已经阅读并同意《紫荆教育网络用户付费协议》】”的，即表示您已同意并承诺遵守本协议。本协议内容包括协议正文，紫荆教育已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。  </p>
                        <h5>第一条 定义</h5>
                        <p>1、“紫荆教育平台”，是指紫荆教育所有和经营的有关教育、学习等数字内容聚合、管理和分发的平台产品，旨在为课程发布者及用户提供教学内容的生成、传播和学习等平台服务。</p>
                        <p>2、“收费课程”，是指课程发布者发布至紫荆教育，有偿提供给用户的视频、文字、图片等内容。</p>
                        <p>3、“收费证书”，是指课程发布者通过紫荆教育平台向完成指定课程学习并完成课程考核的用户有偿提供的课程证书。</p>
                        <p>4、“课程发布者”，是指经紫荆教育审核同意后，通过紫荆教育平台有偿向用户提供服务或发布其享有合法权益的内容供用户学习、使用的自然人、法人、其他组织。</p>
                        <p>5、“用户”，是指在紫荆教育平台上注册，并使用平台登录进行课程学习的平台使用者。</p>
                        <h5>第二条 本协议的修订</h5>
                        <p><b>紫荆教育有权对本协议进行调整或补充，并在紫荆教育平台（www.ezijing.com）公告。若用户继续使用紫荆教育服务的，则视为接受该等调整或补充，亦或用户有权终止使用该服务。</b></p>
                        <h5>第三条 用户规则</h5>
                        <p>1、用户可在紫荆教育平台上浏览课程内容信息（包括但不限于收费课程信息、收费证书申请信息等），如用户希望有偿获得该部分内容或服务，则用户需先登录或注册紫荆教育帐号或通过页面提示,选用其他可用帐号进行登录。用户在使用紫荆教育服务时登录的帐号是紫荆教育确认用户身份的唯一依据。</p>
                        <p>2、用户理解并同意：课程发布者通过紫荆教育平台提供有偿内容或服务实行先付款后使用的方式，用户及时、足额、合法的支付所需的款项是用户使用该等有偿内容或服务的前提。</p>
                        <p>3、用户理解并同意：课程发布者通过紫荆教育平台发布的收费课程将采用整体购买的方式，即用户只需购买一次，就可以在该课程规定的有效期内学习该课程所有已发布或即将发布的课时。已购买的收费课程，在该课程规定的有效期内用户可以自己重复学习，无需再次付费。<b>但请用户注意，收费课程规定的有效期满之后，用户需要再次付费购买才能继续学习该课程，而且收费课程一经购买使用后，不得申请退款。</b></p>
                        <p><b>4、用户知悉并同意: 用户无权对已购买的课程进行出售、转让、许可或其他方式使除用户自己以外的第三方（包括但不限于自然人、法人或其他组织）使用其已购买的课程。若用户违反本条规定，则紫荆教育有权视情况采取如下措施：</b></p>
                        <p><b>4.1取消用户继续使用该课程的权利；</b></p>
                        <p><b>4.2 限制/冻结用户的帐号；</b></p>
                        <p><b>4.3 要求用户退还其通过出售、转让、许可等其他方式取得的收益；</b></p>
                        <p><b>4.4其他紫荆教育可以采取的救济措施。</b></p>
                        <p>5、支付宝及银行转账是平台可接受的支付方式。紫荆币为平台内可实现与货币兑换，并能在平台内消费的虚拟货币。用户使用支付宝及银行转账过程中因支付行为与服务供应商产生的纠纷，平台予以免责。</p>
                        <p>6、用户应保管好自己的帐号和密码（包括但不限于：支付宝帐号），如因用户未保管好自己的帐号和密码而对自己、紫荆教育或第三方造成损害的，用户将负全部责任。另外，用户应对用户帐号中的所有活动和事件负全责。用户可随时改变帐号和密码。用户同意若发现有非法使用用户的帐号或出现安全漏洞的情况，立即通告紫荆教育，紫荆教育将会尽力予以妥善解决。</p>
                        <h5>第四条 免责声明、责任限制</h5>
                        <p>1、紫荆教育平台不做如下承诺：(i) 本服务将完全符合您的要求；(ii) 本服务将永远不受干扰、及时提供、安全可靠或不会出错。</p>
                        <p>2、紫荆教育平台对本服务内容以及与本服务链接的任何网站的内容的准确性或完整性不作任何保证，对下列内容也不承担任何责任或义务（i）内容的错误、失误或不准确之处；（ii）对我公司的安全服务器和/或储存在上述服务器内的任何和所有个人信息和/或财务信息的任何未经授权的访问或使用；（iii）本服务进出传输的中断或停止。</p>
                        <p>3、紫荆教育平台对课程发布者发布的内容不做全面、实质性审查，如该等课程内容侵犯用户权利的，紫荆教育平台予以免责。</p>
                        <h5>第五条 服务的变更、中断、终止</h5>
                        <p>1、如因系统维护或升级的需要而需暂停网络服务，紫荆教育平台将尽可能事先进行通告。</p>
                        <p>2、用户在接受服务时实施本协议中有明确约定或属于紫荆教育平台事先明确告知的应被终止或限制服务的禁止性或限制性行为的，紫荆教育平台有权终止或中止或限制对用户提供服务，包括但不限于立暂时隔离、封停帐号等措施。</p>
                        <p>3、除前款所述情形外，遇第三方提供的服务故障，紫荆教育平台同时保留在不事先通知用户的情况下随时中止或终止部分或全部网络服务的权利，对于所有服务的中断或终止而造成的任何损失，紫荆教育平台无需对用户或任何第三方承担任何责任。</p>
                        <h5>第六条 其他约定</h5>
                        <p>1、所有权及知识产权：紫荆教育平台上所有内容，包括但不限于文字、软件、声音、图片、录像、图表、网站架构、网站画面的安排、网页设计、以及有偿内容或服务均由紫荆教育依法拥有其知识产权，包括但不限于著作权、商标权、专利权等。非经紫荆教育、课程发布者或其他权利人书面同意用户不得擅自使用、修改、复制、传播、改变、散布、发行或发表上述内容。如有违反，用户同意承担由此给紫荆教育造成的一切损失。</p>
                        <p>2、通知：所有发给用户的通知都可通过电子邮件、常规的信件或在网站显著位置公告的方式进行传送。</p>
                        <p>3、本协议适用中华人民共和国的法律（不含冲突法）。当本协议的任何内容与中华人民共和国法律相抵触时，应当以法律规定为准，同时相关内容将按法律规定进行修改或重新解释，而本协议其他部分的法律效力不变。</p>
                        <p>4、本协议自发布之日起实施，并构成用户和紫荆教育之间的共识。</p>
                        <p>5、紫荆教育不行使、未能及时行使或者未充分行使本协议或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响紫荆教育在将来行使该权利。</p>
                        <p>6、如果用户对本协议内容有任何疑问，请发送邮件至我们的客服邮箱：[<a href="mailto:service@pbcsf.tsinghua.edu.cn">service@pbcsf.tsinghua.edu.cn</a>]</p>
                        <p>7、协议最终解释权归紫荆教育所有！</p>
                    </div>
                </Dialog>
                */}
            </div>
        );

    }
});


module.exports = connect( state => ({
    action: state.action,
    account: state.account,
    course: state.course,
    product: state.product,
}) )(Pay);


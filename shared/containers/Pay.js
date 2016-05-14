/**
 * 支付页
 * - 页面参数：id， type
 *   type有可能有三个值 payType.COURSE(id传递课程ID),payType.PRODUCT(id传递课程的商品ID), payType.PACKAGE(id传递课程包ID)
 *   第一种，数据在course中，第二、三种数据在product中
 *   第一二种都是课程，但是后者没有课程ID，第三种是课程包，下面的判断中三者之间关系需要考虑到。
 *
 *
 *   后修改为两种，第一种不变，第二种包含上面的二三。
 */
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
            (type != payType.COURSE && (product.isFetching || (product.data && product.data.id !== id)))) {
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
        let backUrl = type == payType.COURSE ? `/courses/${id}` : '/study/all?type=purchased-list';

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
            this.props.history.push('/study/all?type=purchased-list');
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

        let accountAmount = (account.available_amount || 0) - 0;
        let price = type == payType.COURSE ?
                        course.course_price || 0 :
                        product.price || 0;
        price = price - 0;

        let dateLength = product.product_type == 2 ? 180 : 90; // product_type 1-课程，2-课程包

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
                        {product.product_type == 2 ? // 课程包类型
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
                        <p className="pay-valid-date">
                            付款后{ (type == payType.COURSE && course.id && course.course_open_status !== 1) ||
                                    (type != payType.COURSE && product.id && product.course_open_status !== 1) ?
                                    '，完全上线之日起' : ''}{dateLength}天内有效
                        </p>
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


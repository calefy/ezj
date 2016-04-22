import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { payType } from '../libs/const';
import { getRequestTypes } from '../libs/utils';
import formsySubmitButtonMixin from '../mixins/formsySubmitButtonMixin';
import CoursesAction from '../actions/CoursesAction';
import CommerceAction from '../actions/CommerceAction';

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
                payType.COURSE == type ? dispatch( courseAction.loadCourseDetail(id) ) : null,
                //payType.PACKAGE == type ? dispatch( courseAction.loadPackage(id) ) : null,
            ]);
        }
    },

    componentDidMount: function() {
        const { account, course, location } = this.props;
        let type = location.query.type;
        let id = location.query.id;
        if (account.isFetching || course.isFetching ||
            (type == payType.COURSE && course.data && course.data.id !== id)) {
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
                alert('购买成功');
                break;
            case types.failure:
                alert('购买失败' + nextProps.action.error.message);
                break;
        }
    },

    onPay: function(e) {
        e.preventDefault();
        e.nativeEvent.returnValue = false;

        const { location } = this.props;
        let id = location.query.id;
        let type = location.query.type;
        const commerceAction = new CommerceAction();
        this.dispatch(commerceAction.pay({
            items: id,
            item_type: 0, // 课程ID
            payment_method: 10, // 紫荆币支付
        }));
    },


    render: function() {
        let type = this.props.location.query.type;
        let account = this.props.account.data || {};
        let course = this.props.course.data || {};

        let accountAmount = account.available_amount || 0;
        let price = course.course_price || 0;

        return (
            <div className="container">
                <div className="pay bg-white">
                    <h4>参加课程《{course.course_name}》</h4>
                    <div className="pay-course-info">
                        {type == payType.PACKAGE ?
                            <div>
                                <h5 className="cl">
                                    <span className="fl">包含课程</span>
                                    <em className="fr">共17门</em>
                                </h5>
                                <div className="pay-course-list">
                                    <p>资产证券化解析</p>
                                    <p>信用卡资产证券化</p>
                                    <p>银行贷款资产证券化</p>
                                    <p>商业地产贷款证券化</p>
                                    <p>房地产信托基金REITs </p>
                                    <p>住房按揭资产证券化</p>
                                    <p>汽车贷款资产证券化</p>
                                    <p>资产证券化的法律问题</p>
                                    <p>资产证券化的产品设计与评级</p>
                                    <p>资产证券化中的会计处理</p>
                                    <p>资产证券化中的税务处理</p>
                                    <p>发起人及资产服务</p>
                                    <p>交易协调人（券商）的工作职责与流程</p>
                                    <p>资产证券化的受托机构关键职责与工作流程</p>
                                    <p>资产证券化产品投资</p>
                                    <p>PPP与资产证券化</p>
                                    <p>互联网金融与资产证券化</p>
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
                            <span className="fl"><input type="checkbox" name="" value="" defaultChecked={true} /> 使用紫荆币支付</span>
                            <em className="fr">-{Math.min(price, accountAmount)}</em>
                        </h4>
                        <h5 className="cl">
                            <span className="fl">还需支付</span>
                            <em className="fr">&yen;{price > accountAmount ? price - accountAmount : 0}</em>
                        </h5>
                    </div>
                    <div className="pay-method">
                        <dl>
                            <dt>支付方式</dt>
                            <dd className="pay-alipay"><Link to="">&nbsp;</Link></dd>
                            <dd className="pay-unipay"><Link to="">银联</Link></dd>
                        </dl>
                        <div>
                            <input type="checkbox" defaultChecked={true} /> 我已经阅读并同意
                            <Link to="">紫荆教育用户付费协议</Link>
                        </div>
                        <Link to="" className="btn" onClick={this.onPay}>去结算</Link>
                        <p className="pay-valid-date">付款后{type == payType.COURSE ? 90 : 180}天内有效</p>
                    </div>
                </div>
            </div>
        );

    }
});


module.exports = connect( state => ({
    action: state.action,
    account: state.account,
    course: state.course,
}) )(Pay);


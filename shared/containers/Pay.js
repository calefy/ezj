import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { getRequestTypes } from '../libs/utils';

if (process.env.BROWSER) {
    require('css/pay.css');
}

class Pay extends Component {
    

    render() {

        return (
            <div className="container">
                <div className="pay bg-white">
                    <h4>参加课程《资产证券化线上课程》</h4>
                    <div className="pay-course-info">
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
                        <div className="pay-course-price cl">
                            <span className="fl">订单总价</span>
                            <em className="fr">¥2680</em>
                        </div>
                    </div>
                    <div className="pay-balance">
                        <h3>结算信息</h3>
                        <h4 className="pay-balance-price cl">
                            <span className="fl"><input type="checkbox" name="" value="" checked="checked" /> 使用紫荆币支付</span>
                            <em className="fr">-1428</em>
                        </h4>
                        <h5 className="cl">
                            <span className="fl">还需支付</span>
                            <em className="fr">¥1252.00</em>
                        </h5>
                    </div>
                    <div className="pay-method">
                        <dl>
                            <dt>支付方式</dt>
                            <dd className="pay-alipay"><Link to="">&nbsp;</Link></dd>
                            <dd className="pay-unipay"><Link to="">银联</Link></dd>
                        </dl>
                        <div>
                            <input type="checkbox" checked="checked" /> 我已经阅读并同意     <Link to="">紫荆教育用户付费协议</Link>
                        </div>
                        <Link to="" className="btn">去结算</Link>
                        <p className="pay-valid-date">付款后<span>180</span>天内有效</p>
                    </div>
                </div>
            </div>
        );

    }
}


module.exports = connect( state => ({
    action: state.action
}) )(Pay);


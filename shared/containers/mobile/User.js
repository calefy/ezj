import React from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import { orderStatus } from '../../libs/const';
import CommerceAction from '../../actions/CommerceAction';
import Pagination from '../../components/Pagination.jsx';

if (process.env.BROWSER) {
    require('css/mobile.css');
}

class Account extends React.Component {
    static pageTitle = '紫荆账户';
    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const commerceAction = new CommerceAction({ apiClient });
        return Promise.all([
            dispatch( commerceAction.loadAccount() ),
            dispatch( commerceAction.loadRecharges(location.query) ),
            dispatch( commerceAction.loadOrders(location.query) ),
        ]);
    }

    componentDidMount() {
        if (document.title !== Account.pageTitle) document.title = Account.pageTitle;
        this.loadNeededData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.loadNeededData(nextProps);
    }

    loadNeededData = props => {
        const {account, recharges, orders, location} = props;
        const query = location.query;
        const commerceAction = new CommerceAction();
        if (!account._req) {
            props.dispatch( commerceAction.loadAccount() );
        }
        if (recharges._req && (recharges._req.page !== query.page || recharges._req['per-page'] !== query['per-page'])) {
            props.dispatch( commerceAction.loadRecharges(query) );
        }
        if (orders._req && (orders._req.page !== query.page || orders._req['per-page'] !== query['per-page'])) {
            props.dispatch( commerceAction.loadRecharges(query) );
        }
    };


    render() {
        const { recharges, account, orders } = this.props;
        let accountData = account.data || {};
        let rechargeList = recharges.data && recharges.data.list || [];
        let orderList = orders.data && orders.data.list || [];

        return (
            <div className="mobile-user">
                {/*
                <div className="mobile-header">
                    <i className="iconfont icon-left1"></i>
                    <h1>紫荆账户</h1>
                </div>
                */}
                <div className="mobile-content">
                    <div className="mobile-balance">
                        您的余额：
                        <div className="fr">
                            <em>{accountData.available_amount || 0}</em> 紫荆币
                            {accountData.frozen_amount > 0 ?
                                <span>(冻结：{accountData.frozen_amount})</span>
                                : null
                            }
                            <i className="iconfont icon-jewelry"></i>
                        </div>
                    </div>
                    <div className="mobile-recharge">
                        <h4>充值记录<Link to="" className="fr hide">查看更多</Link></h4>
                        {recharges.isFetching ?
                            <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                            :
                            <ul>
                                {rechargeList.length ?
                                    rechargeList.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <h5>{item.id}<em className="fr">{item.amount}</em></h5>
                                                <p>充值日期：{item.created_time}</p>
                                            </li>
                                        );
                                    })
                                    :
                                    <p className="no-data">暂无充值记录</p>
                                }
                            </ul>
                        }
                    </div>
                    <div className="mobile-orders">
                        <h4>消费记录<Link to="" className="fr hide">查看更多</Link></h4>
                        {orders.isFetching ?
                            <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                            :
                            <ul>
                                {orderList.length ?
                                    orderList.map((item, index) => {
                                        let arr = [];
                                        item.item_list.split(',').forEach(one => {
                                            if (one) arr.push(one.replace(/\d+:/, ''));
                                        });
                                        return (
                                            <li key={index}>
                                                <h5>{arr.join(', ')}<em className="fr">{item.total_amount}</em></h5>
                                                <p>订单日期：{item.created_time} <em className="fr">{orderStatus[item.order_status]}</em></p>
                                            </li>
                                        );
                                    })
                                    :
                                    <p className="no-data">暂无充值记录</p>
                                }
                            </ul>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    account: state.account,
    recharges: state.recharges,
    orders: state.orders,
}) )(Account);

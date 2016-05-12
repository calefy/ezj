import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import { payType, orderStatus } from '../../libs/const';
import { getRequestTypes } from '../../libs/utils';
import CommerceAction from '../../actions/CommerceAction';
import Pagination from '../../components/Pagination.jsx';


class Order extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const commerceAction = new CommerceAction({ apiClient });
        return Promise.all([
            dispatch( commerceAction.loadOrders(location.query) ),
        ]);
    }

    componentDidMount() {
        const { orders, location } = this.props;
        // 考虑已经缓存过其他页的数据，又来访问第一页时，数据需要更新
        if (orders.isFetching ||
                !orders._req || orders._req.page != location.query.page) {
            Order.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        let cancelType = getRequestTypes(CommerceAction.CANCEL_ORDER);
        if (this.props.location.search != nextProps.location.search ||
                nextProps.action.type === cancelType.success) {
            Order.fetchData(nextProps);
        }
    }

    // 取消订单
    onClickCancel = e => {
        e.preventDefault();
        e.nativeEvent.returnValue = false;
        const commerceAction = new CommerceAction();
        this.props.dispatch( commerceAction.cancelOrder(e.currentTarget.getAttribute('data-id')) );
    };

    render() {
        if (this.props.orders.isFetching) {
            return  <div className="account-recharge">
                        <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                    </div>
        }


        let data = this.props.orders.data || {};
        let orders = data.list || [];

        return (
            <div className="account-recharge">
                <div className="recharge-record">
                    <h4>消费记录</h4>
                    <p>线上支付订单请在24小时内完成支付，逾期系统会自动取消订单</p>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th width="60">订单编号</th>
                                    <th>购买课程</th>
                                    <th>订单价格</th>
                                    <th>订单日期</th>
                                    <th width="100">订单状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length ?
                                    orders.map((item, index) => {
                                        let arr = [];
                                        let id = null;
                                        item.item_list.split(',').forEach(one => {
                                            if (one) {
                                                let cs = one.split(':');
                                                if (cs.length) id = cs[0];
                                                if (cs.length >= 2) arr.push(cs[1]);
                                            }
                                        });
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{arr.join(', ')}</td>
                                                <td>{item.total_amount}</td>
                                                <td>{item.created_time}</td>
                                                <td>
                                                    {item.order_status == 10 ?
                                                        <span>
                                                            <Link to="/pay" query={{type: payType.PRODUCT, id: id}}>继续支付</Link>
                                                            <br/>
                                                            <a href="#" data-id={item.id} onClick={this.onClickCancel}>取消订单</a>
                                                        </span>
                                                        :
                                                        orderStatus[item.order_status]
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })
                                    :
                                    <tr>
                                        <td colSpan="5">
                                            <p className="no-data">暂无消费记录</p>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        total={data.total || 0}
                        page={(this.props.location.query.page || 1) - 0}
                        link={this.props.location.pathname}
                        search={this.props.location.search}
                    />
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    action: state.action,
    orders: state.orders,
}) )(Order);
// <a className="btn chargeMore">查看更多</a>

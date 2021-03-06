import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';

import CommerceAction from '../../actions/CommerceAction';
import Pagination from '../../components/Pagination.jsx';

const PAGE_SIZE = 20;

class Recharge extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        const commerceAction = new CommerceAction({ apiClient });
        return Promise.all([
            dispatch( commerceAction.loadAccount() ),
            dispatch( commerceAction.loadRecharges(Object.assign({'per-page': PAGE_SIZE}, location.query)) ),
        ]);
    }

    componentDidMount() {
        const { account, recharges, params, location } = this.props;
        // 考虑已经缓存过其他页的数据，又来访问第一页时，数据需要更新
        if (account.isFetching ||
                !recharges._req || recharges._req.page != location.query.page) {
            Recharge.fetchData(this.props);
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.search != nextProps.location.search) {
            const commerceAction = new CommerceAction();
            nextProps.dispatch( commerceAction.loadRecharges(Object.assign({'per-page': PAGE_SIZE}, nextProps.location.query)) );
        }
    }

    render() {
        if (this.props.account.isFetching || this.props.recharges.isFetching) {
            return  <div className="account-pay">
                        <div className="loading"><i className="iconfont icon-loading fa-spin"></i></div>
                    </div>
        }


        let account = this.props.account.data || {};
        let data = this.props.recharges.data || {};
        let recharges = data.list || [];

        return (
            <div className="account-pay">
                <div className="balance cl">
                    <div className="yue fl">
                        <span>账户余额：{account.available_amount || 0}紫荆币</span>
                        {/*
                        &emsp;
                        {account.frozen_amount > 0 ?
                            <span>冻结金额：{account.frozen_amount}</span>
                            : null
                        }
                        <span className="btn-red" style={{display:'none'}}>充值</span>
                        */}
                    </div>
                    <dl className="recharge fr hide">
                        <dt>输入充值卡号 <span className="form-red" title="此项必填。">*</span></dt>
                        <dd className="formsy-input">
                            <input type="text" name="" value="" />
                        </dd>
                        <dd>
                            <button className="btn-red" name="" value="充值" type="submit">充值</button>
                        </dd> 
                        <dd>
                            <button className="btn-red" name="" value="取消" type="submit">取消</button>
                        </dd>
                    </dl>
                </div>
                <div className="recharge-record">
                    <h4>充值记录</h4>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>充值编号</th>
                                    <th>时间</th>
                                    <th>金额（元）</th>
                                    <th>类型</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recharges.length ?
                                    recharges.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.created_time}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.txn_type == 2 ? '充值卡' : item.txn_type == 9 ? '苹果商店充值' : ''}</td>
                                            </tr>
                                        );
                                    })
                                    :
                                    <tr>
                                        <td colSpan="4">
                                            <p className="no-data">暂无充值记录</p>
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
                        pageSize={PAGE_SIZE}
                    />
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({
    account: state.account,
    recharges: state.recharges,
}) )(Recharge);

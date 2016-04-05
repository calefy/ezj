import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Account extends Component {

    render() {
        return (
            <div className="account-pay">
            	<div className="balance cl">
                    <div className="yue fl"><span>账户余额：</span><span>3184紫荆币</span> <span className="btn-red">充值</span></div>
                    <dl className="recharge fr">
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
                                <tr>
                                    <td>4283</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4281</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4279</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4278</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4276</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4275</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4271</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4270</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4261</td>
                                    <td>2016-01-26</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                                <tr>
                                    <td>4216</td>
                                    <td>2016-01-22</td>
                                    <td>2000</td>
                                    <td>充值卡</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Link to="" className="btn chargeMore">查看更多</Link>
                </div>
            </div>
        );
    }
}

module.exports = Account;
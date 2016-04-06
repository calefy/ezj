import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Study extends Component {

    render() {
        return (
            <div className="Study-recharge">
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
                                <tr>
                                    <td>13498</td>
                                    <td>全球互联网金融商业模式及案例深度解析线上课程包</td>
                                    <td>4000紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>订单已取消</td>
                                </tr>
                                <tr>
                                    <td>13497</td>
                                    <td>全球互联网金融商业模式及案例深度解析线上课程包</td>
                                    <td>4000紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>订单已取消</td>
                                </tr>
                                <tr>
                                    <td>13496</td>
                                    <td>全球互联网金融商业模式及案例深度解析线上课程包</td>
                                    <td>4000紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>订单已取消</td>
                                </tr>
                                <tr>
                                    <td>13495</td>
                                    <td>全球互联网金融商业模式及案例深度解析线上课程包</td>
                                    <td>4000紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>订单已取消</td>
                                </tr>
                                <tr>
                                    <td>13494</td>
                                    <td>全球互联网金融商业模式及案例深度解析线上课程包</td>
                                    <td>4000紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>支付完毕</td>
                                </tr>
                                <tr>
                                    <td>13491</td>
                                    <td>资产证券化线上课程</td>
                                    <td>2680紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>支付完毕</td>
                                </tr>
                                <tr>
                                    <td>13489</td>
                                    <td>全球互联网金融商业模式及案例深度解析线上课程包</td>
                                    <td>4000紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>支付完毕</td>
                                </tr>
                                <tr>
                                    <td>13488</td>
                                    <td>全球互联网金融商业模式及案例深度解析线上课程包</td>
                                    <td>4000紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>订单已取消</td>
                                </tr>
                                <tr>
                                    <td>13487</td>
                                    <td>全球互联网金融商业模式及案例深度解析线上课程包</td>
                                    <td>4000紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>支付完毕</td>
                                </tr>
                                <tr>
                                    <td>13471</td>
                                    <td>创业创新</td>
                                    <td>1880紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>支付完毕</td>
                                </tr>
                                <tr>
                                    <td>13470</td>
                                    <td>经济转型背景下的资产证券化业务创新</td>
                                    <td>4980紫荆币</td>
                                    <td>2016-01-26 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>13314</td>
                                    <td>信托投资实务</td>
                                    <td>198紫荆币</td>
                                    <td>2016-01-22 </td>
                                    <td>支付完毕</td>
                                </tr>
                                <tr>
                                    <td>13313</td>
                                    <td>天使投资（上）：天使说 </td>
                                    <td>58紫荆币</td>
                                    <td>2016-01-22 </td>
                                    <td>支付完毕</td>
                                </tr>
                                <tr>
                                    <td>2942</td>
                                    <td>资产证券化创新实践</td>
                                    <td>2980紫荆币</td>
                                    <td>2015-10-20 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2940</td>
                                    <td>资产证券化创新实践</td>
                                    <td>2980紫荆币</td>
                                    <td>2015-10-20 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2789</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2788</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2787</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2786</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2785</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2784</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2783</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2779</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2778</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2777</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2770</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2769</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2675</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2673</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2667</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2666</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>2663</td>
                                    <td>资产证券化创新实践</td>
                                    <td>0.01紫荆币</td>
                                    <td>2015-10-19 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                                <tr>
                                    <td>1149</td>
                                    <td>信托投资实务</td>
                                    <td>198紫荆币</td>
                                    <td>2015-07-26 </td>
                                    <td>逾期自动取消</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <a className="btn chargeMore">查看更多</a>
                </div>
            </div>
        );
    }
}

module.exports = Study;
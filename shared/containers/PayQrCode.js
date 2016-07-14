/**
 * 支付页展示支付二维码
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'

if (process.env.BROWSER) {
    require('css/pay.css');
    require('jquery-qrcode');
}

let PayQrCode = React.createClass({

    componentDidMount: function() {
        const $ = require('jquery');
        $('#qrcode').qrcode({
            text: this.props.location.query.l || '',
            render:  !!document.createElement('canvas').getContext ? 'canvas' : 'table',
            width: 180,
            height: 180
        })
    },

    render: function() {
        return (
            <div className="container">
                <div className="pay bg-white">
                    <div className="pay-qr-box">
                        <h4>实付金额：<em>&yen;{this.props.location.query.m || 0}</em></h4>
                        <div id="qrcode"></div>
                        <p>请使用微信扫描二维码以完成支付</p>
                    </div>
                    <p className="pay-qr-help">请于24小时内完成支付，逾期系统将自动取消订单</p>
                </div>
            </div>
        );

    }
});


module.exports = PayQrCode;


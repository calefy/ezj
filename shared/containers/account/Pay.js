import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
    require('css/account.css')
}

class Account extends Component {

    render() {
        return (
            <div className="account mar40 cl container">
            	<div className="account-left fl shadow">
            		<img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/159f0c367a6e2634bf9e17d3815cd6c1.jpg" />
            		<p>紫荆教育</p>
            	</div>
            	<div className="account-right fl shadow">
            		{this.props.children}
            	</div>
            </div>
        );
    }
}

module.exports = Account;
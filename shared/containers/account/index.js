import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
    require('css/account.css')
}

class Account extends Component {

	// static propTypes = {
 //        location: PropTypes.object.isRequired
 //    };

	static menus = [
        { path: 'index', name: '基本信息' },
        { path: 'pwd', name: '密码修改' },
        { path: 'pay', name: '充值记录' },
        { path: 'recharge', name: '消费记录' }
    ];

    render() {

    	const { menus } = Account;
		const locationPath = this.props.location.pathname;

        return (
            <div className="account mar40 cl container">
            	<div className="account-left fl shadow">
            		<img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/159f0c367a6e2634bf9e17d3815cd6c1.jpg" />
            		<p>紫荆教育</p>
            	</div>
            	<div className="account-right fl shadow">
		            <ul className="nav-tabs cl">
			            {menus.map( (item, index) => {
	                        return  <li className={locationPath === item.path ? 'current' : null} key={index}>
	                        			<Link to={item.path}>{item.name}</Link>
	                        		</li>
	                        		
	                    })}
		            </ul>
            		{this.props.children}
            	</div>
            </div>
        );
    }
}

module.exports = Account;
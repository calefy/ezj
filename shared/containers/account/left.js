import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'

if (process.env.BROWSER) {
    require('css/account.css')
}

class Account extends Component {

	static menus = [
        { path: 'user', name: '基本资料' },
        { path: 'email', name: '邮箱' },
        { path: 'mobile', name: '手机' }
    ];

    render() {

        const { menus } = Account;
		const locationPath = this.props.location.pathname;

        return (

            <div className="container mar40">
                <h1 className="h1-title">修改资料<Link to="index" className="fr">返回我的资料</Link></h1>
                <div className="change-account cl">
                	<div className="content-left shadow bg-white fl">
                		<ul className="content-tabs cl">
                			{menus.map( (item, index) => {
		                        return  <li className={locationPath === item.path ? 'current' : null} key={index}>
		                        			<Link to={item.path}>{item.name}</Link>
		                        		</li>
		                        		
		                    })}
			            </ul>
                	</div>
                	<div className="change-account-right shadow bg-white fr">
                		{this.props.children}
                	</div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({ user: state.user }) )(Account);
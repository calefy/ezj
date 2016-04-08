import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'

if (process.env.BROWSER) {
    require('css/other.css')
}

class Account extends Component {

	static menus = [
        { path: '/other/about', name: '关于我们' },
        { path: '/other/contact', name: '联系我们' },
        { path: '/other/opinion', name: '意见反馈' }
    ];

    render() {

        const { menus } = Account;
		const locationPath = this.props.location.pathname;

        return (

            <div className="container mar40">
                <div className="other cl">
                	<div className="content-left shadow bg-white fl">
                		<ul className="content-tabs cl">
                			{menus.map( (item, index) => {
		                        return  <li className={locationPath === item.path ? 'current' : null} key={index}>
		                        			<Link to={item.path}>{item.name}</Link>
		                        		</li>
		                        		
		                    })}
			            </ul>
                	</div>
                	<div className="other-right shadow bg-white fr">
                		{this.props.children}
                	</div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({ user: state.user }) )(Account);
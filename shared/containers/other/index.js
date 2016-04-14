import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'

if (process.env.BROWSER) {
    require('css/other.css')
}

class HelpIndex extends Component {

    static menus = [
        { path: '/help/about', name: '关于我们' },
        { path: '/help/contact', name: '联系我们' },
        { path: '/help/opinion', name: '意见反馈' }
    ];

    render() {

        const { menus } = HelpIndex;
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

module.exports = connect( state => ({}) )(HelpIndex);

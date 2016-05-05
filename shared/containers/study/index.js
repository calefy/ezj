import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'

if (process.env.BROWSER) {
    require('css/study.css')
}

class Index extends Component {

    static menus = [
        { path: '/study/all', name: '我的课程' },
        { path: '/study/collect', name: '收藏的课程' },
        { path: '/study/test', name: '我的测验' }
    ];

    render() {

        const { menus } = Index;
        const locationPath = this.props.location.pathname;

        return (

            <div className="container mar40">
                <div className="study-center cl">
                    {locationPath === '/study/intro' ? null :
                        <div className="content-left shadow bg-white fl">
                            <ul className="content-tabs cl">
                                {menus.map( (item, index) => {
                                    return  <li className={locationPath === item.path ? 'current' : null} key={index}>
                                                <Link to={item.path}>{item.name}</Link>
                                            </li>
                                })}
                            </ul>
                        </div>
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}

module.exports = Index;

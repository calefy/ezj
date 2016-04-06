import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Study extends Component {

    static menus = [
        { path: 'all', name: '全部课程' },
        { path: 'study', name: '只看学习' },
        { path: 'buy', name: '只看购买' }
    ];

    render() {

        const { menus } = Study;
        const locationPath = this.props.location.pathname;

        return (
            <div className="">
                <ul className="nav-tabs cl">
                    {menus.map( (item, index) => {
                        return  <li className={locationPath === item.path ? 'current' : null} key={index}>
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                                
                    })}
                </ul>
                {this.props.children}
            </div>
        );
    }
}

module.exports = Study;
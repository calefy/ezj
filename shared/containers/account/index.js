import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import {Link} from 'react-router';
import Formsy from 'formsy-react';

import {avatar} from '../../libs/utils';
import FormsyUpload from '../../components/formsy/FormsyUpload.jsx';
import UserAction from '../../actions/UserAction';

if (process.env.BROWSER) {
    require('css/account.css')
}

class Account extends Component {

    static menus = [
        { path: '/account/index', name: '基本信息' },
        //{ path: '/account/avatar', name: '头像修改' },
        { path: '/account/pwd', name: '密码修改' },
        { path: '/account/recharge', name: '充值记录' },
        { path: '/account/orders', name: '消费记录' }
    ];

    onFileSuccess = res => {
        //console.log(res);
        const userAction = new UserAction();
        this.props.dispatch( userAction.updateAvatar(res.data.avatar) );
    };

    render() {
        const { menus } = Account;
        const locationPath = this.props.location.pathname;
        const user = this.props.user.data || {};

        return (
            <div className="account mar40 cl container">
                <div className="account-left fl shadow">
                    <img src={avatar(user.avatar, 'pipe3')} alt={user.nickname} />
                    <Formsy.Form>
                        <FormsyUpload
                            id="upload_avatar"
                            fileVal="avatar"
                            name="avatar"
                            label="上传新头像"
                        />
                    </Formsy.Form>
                    <p>{user.nickname}</p>
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

module.exports = connect( state => ({
    user: state.user,
}) )(Account);

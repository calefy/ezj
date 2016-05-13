import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'
import Address from '../../libs/address';

import UserAction from '../../actions/UserAction';

class Info extends Component {

    // 初始加载数据
    static fetchData({dispatch, apiClient}) {
        const userAction = new UserAction({ apiClient: apiClient });
        return Promise.all([
            dispatch(userAction.loadAccount())
        ]);
    }

    componentDidMount() {
        this.userAction = new UserAction();
        if (this.props.user.isFetching) {
            Info.fetchData(this.props);
        }
    }

    render() {
        const user = this.props.user.data || {};

        return (
            <div className="account-info">
                <dl>
                    <dt>昵称：</dt>
                    <dd>{user.nickname}</dd>
                </dl>
                <dl>
                    <dt>注册邮箱：</dt>
                    <dd>{user.email || '暂无'}</dd>
                </dl>
                <dl>
                    <dt>手机号码：</dt>
                    <dd>{user.mobile || '暂无'}</dd>
                </dl>
                <dl>
                    <dt>用户名：</dt>
                    <dd>{user.username}</dd>
                </dl>
                <dl>
                    <dt>性别：</dt>
                    <dd>{user.gender == 1 ? '男' : user.gender == 2 ? '女' : '未知'}</dd>
                </dl>
                <dl>
                    <dt>出生日期：</dt>
                    <dd>{user.birthday || '暂无'}</dd>
                </dl>
                <dl>
                    <dt>所在地区：</dt>
                    <dd>
                        {user.province && Address[user.province] ?
                            Address[user.province].name +
                                (user.city && Address[user.province][user.city] ?
                                    '-' + Address[user.province][user.city].name +
                                    (user.county && Address[user.province][user.city][user.county] ?
                                        '-' + Address[user.province][user.city][user.county].name : '')
                                    : '')
                            : '暂无'
                        }
                    </dd>
                </dl>
                <Link to="/account/user">修改我的资料></Link>
            </div>
        );
    }
}

module.exports = connect( state => ({ user: state.user }) )(Info);

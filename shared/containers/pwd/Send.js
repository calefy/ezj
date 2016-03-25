import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import FormsyText from '../../components/formsy/FormsyText.jsx';

class Pwd extends Component {

    // 初始加载数据
    static fetchData({dispatch, params={}, location={}, apiClient}) {
        return Promise.all([
            // 默认首页取5个
            //dispatch( noticeAction.loadNotices({pageSize: 5}, getOwnRequestIdentity(location)) )
        ]);
    }

    state = {
        errorMsg: null
    };

    componentDidMount() {
    }

    onEnter = () => {
        // 检查输入
        if (this._validName()) {
            // this.props.onSubmit({
            //     username: this.refs.username.getValue().trim(),
            //     password: this.refs.password.getValue(),
            //     remember: this.refs.remember.isChecked() ? 1 : 0
            // });
            // this._setState({ modified: false }); // 登录请求发出后，重置modified
            console.log(errorMsg);
        }
    };
    _validName = () => {
        const val = this.refs.name.getValue().trim();
        const email = "/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*(\.[a-zA-Z0-9_-]{2,4}){1,2}$/";
        const mobile = "/^1[3-9]\d{9}$/";
        this._setState({ errorMsg : val.match(email) || val.match(mobile) ? '' : '账号格式错误' });

        return !!val;
    };

    enableButton = () => {
        this.setState({
            canSubmit: true,
            bgColor: '#a22645'
        });
    };

    disableButton = () => {
        this.setState({
            canSubmit: false,
            bgColor: 'rgb(229,229,229)'
        });
    };
    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    render() {
        return (
            <div className="content">
                <Formsy.Form
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    onValidSubmit={this.onEnter}
                    className="pwd-form pwd-write-form">
                    <FormsyText 
                        name="name" 
                        ref="name"
                        title="输入注册手机号/邮箱"
                        type="text"
                        required />
                    <div className="pop-btn pwd-btn">
                        <button type="submit" disabled={!this.state.canSubmit} 
                            className={ this.state.canSubmit ? "" : "disabled"} >发送验证码</button>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Pwd);


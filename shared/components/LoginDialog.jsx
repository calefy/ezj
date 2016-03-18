import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


module.exports = class LoginDialog extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        error: PropTypes.object // 返回的错误信息
    };

    state = {
        open: false,
        modified: false, // 当登录失败后，标记第一次修改
        errorUsername: null,
        errorPassword: null
    };

    open = () => {
        this._setState({ open: true });
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

    onEnter = () => {
        // 检查输入
        if (this._validUsername() && this._validPassword()) {
            this.props.onSubmit({
                username: this.refs.username.getValue().trim(),
                password: this.refs.password.getValue(),
                remember: this.refs.remember.isChecked() ? 1 : 0
            });
            this._setState({ modified: false }); // 登录请求发出后，重置modified
        }
    };
    close = () => {
        this._setState({ open: false });
    };

    _modify = () => {
        return !!this.props.error;
    };
    _validUsername = () => {
        const val = this.refs.username.getValue().trim();
        this._setState({ errorUsername: val ? null : '请输入邮箱或ID', modified: this._modify() });

        return !!val;
    };
    _validPassword = () => {
        const val = this.refs.password.getValue();
        this._setState({ errorPassword: val ?  null : '请输入密码', modified: this._modify() });

        return !!val;
    };

    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    render() {


        return (
            <div style={{ display: "none" }}>
                <div className="pop login-pop" open={this.state.open}>
                    <i className="iconfont icon-close"></i>
                    <div className="login-pop-content">
                        <div className="login-pop-top">
                            紫荆教育
                        </div>
                        <div className="login-text">
                            <dl>
                                <dt><i className="iconfont icon-"></i></dt>
                                <dd>
                                    <input type="text" placeholder="" />
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="screen-bg"></div>
            </div>
        );
    }
};

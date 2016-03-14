import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Dialog, TextField, Checkbox, FlatButton, RaisedButton } from 'material-ui';
import { FormsyText } from 'formsy-material-ui'


module.exports = class LoginDialog extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        error: PropTypes.object // 返回的错误信息
    };

    static styles = {
        body: {
            width: '400px',
            padding: '0 30px 15px',
            margin: '0 auto'
        },
        checkbox: {
            width: '50%',
        },
        textStyle: {
            width: '100%'
        },
        password: {
            margin: '-10px 0 15px'
        },
        error: {
            position: 'static',
            marginTop: '-15px',
        },
        titleStyle: {
            // color: '#fff',
            padding: 24
        }
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
        const styles = LoginDialog.styles;

        const actions = [
            <FlatButton
                label="登录"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.onEnter}
            />,
            <FlatButton
                label="取消"
                secondary={true}
                onClick={this.close}
            />
        ];

        return (
            <Dialog
                open={this.state.open}
                title="用户登录"
                actions={actions}
                actionsContainerStyle={{ marginBottom: 0 }}
                autoDetectWindowHeight={false}
                titleStyle={ styles.titleStyle }
                titleClassName="login-title"
                contentClassName="login-content"
                bodyClassName="login-body"
                bodyStyle={ styles.body }
                {...this.props}>
                <div>
                    <TextField
                        ref="username"
                        floatingLabelText="邮箱/ID："
                        hintText="请输入邮箱或ID"
                        type="text"
                        errorStyle={ styles.error }
                        fullWidth={true}
                        errorText={this.state.errorUsername}
                        onChange={this._validUsername}
                        onEnterKeyDown={this.onEnter} />
                </div>
                <div>
                    <TextField
                        ref="password"
                        floatingLabelText="密码："
                        hintText="请输入密码"
                        type="password"
                        style={ styles.password }
                        errorStyle={ styles.error }
                        fullWidth={true}
                        errorText={this.state.errorPassword || (!this.state.modified && this.props.error && (this.props.error.message || '登录失败'))}
                        onChange={this._validPassword}
                        onEnterKeyDown={this.onEnter} />
                </div>
                <div className="clearfix" style={{ marginTop: 10 }}>
                    <Checkbox
                        ref="remember"
                        label="记住登录状态"
                        className="fl"
                        style={ styles.checkbox }
                        defaultChecked={true} />
                    <Link to="/pwd/set" className="fr" onClick={this.close}>忘记密码？</Link>
                </div>
            </Dialog>
        );
    }
};

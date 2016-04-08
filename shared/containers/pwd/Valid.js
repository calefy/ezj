import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import UserAction from '../../actions/UserAction';
import OperateAction from '../../actions/OperateAction';
import FormsyText from '../../components/formsy/FormsyText.jsx';

import { getRequestTypes } from '../../libs/utils';

class ResetPwd extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
    };

    state = {
        errorSendMsg: null,
        sendText: '再次发送验证码',
        errorCodeMsg: null
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

    componentDidMount() {
        this.userAction = new UserAction();
        this.operateAction = new OperateAction();
    };

    handleSubmit = () => {
        const contact = this.refs.contact.innerText.trim();
        const code = this.refs.code.getValue().trim();
        this.props.dispatch(this.operateAction.pwdCode( contact, code ));
    };

    sendEmail = () => {
        // 检查输入
        const contact = this.refs.contact.innerText.trim();
        this.props.dispatch(this.operateAction.sendPwd(contact));
        
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.action.type.indexOf("SEND")>-1){
            const sendType = getRequestTypes("send");
                    
            if (nextProps.action.type === UserAction.SEND) {
                // this.refs.snackbar.show(nextProps.action.message, nextProps.action.label);
            } else if (nextProps.action.type === sendType.success) {
                this._setState({ 
                    errorSendMsg: nextProps.action.response ? '发送成功' : '',
                    sendText: '60s后重发',
                    submit: false
                });
                // this._setState({ submit: false });
            }
            else if (nextProps.action.type === sendType.failure) {
                this._setState({ 
                    errorSendMsg: nextProps.action.error.message || '发送失败',
                    sendText: '发送验证码'
                });
            }
        }
        else{
            const codeType = getRequestTypes("code");
            const contact = this.refs.contact.innerText.trim();
            const code = this.refs.code.getValue();
            if (nextProps.action.type === UserAction.SEND) {
                // this.refs.snackbar.show(nextProps.action.message, nextProps.action.label);
            } else if (nextProps.action.type === codeType.success) {
                this._setState({ 
                    errorCodeMsg: nextProps.action.response ? '验证成功' : '',
                });
                this.refs.submit.innerText="下一步"
                setTimeout(this.props.history.push('/pwd/set?contact='+contact+'&code='+code),2000);
            }
            else if (nextProps.action.type === codeType.failure) {
                this._setState({ 
                    errorCodeMsg: nextProps.action.error.message || '验证失败',
                });
                this.refs.submit.innerText="下一步"
            }
            else if (nextProps.action.type === codeType.request){
                this.refs.submit.innerText="验证中……"
            }
        }
        
    }
    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    render() {
        const { action } = this.props;
        const locationPath = this.props.location.query.contact;

        return (
            <div>
                <div className="bg-white pwd">
                    <div className="stepflex">
                        <dl className="first">
                            <dt className="s-num">1</dt>
                            <dd className="s-text">输入账号</dd>
                        </dl>
                        <dl className="normal doing">
                            <dt className="s-num">2</dt>
                            <dd className="s-text">验证账号</dd>
                        </dl>
                        <dl className="normal last">
                            <dt className="s-num">3</dt>
                            <dd className="s-text">设置密码</dd>
                        </dl>
                    </div>
                </div>
                <div className="content">
                    <Formsy.Form
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        onValidSubmit={this.handleSubmit}
                        className="pwd-form pwd-write-form">
                        <div className="formsy-list pwd-valid">
                            验证码已发送至您的
                            {locationPath.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*(\.[a-zA-Z0-9_-]{2,4}){1,2}$/) ? "邮箱" : "手机"}
                            <em ref="contact">{locationPath}</em>
                            <button className="valid-btn" onClick={this.sendEmail}>{this.state.sendText}</button>
                            <p className="send-msg">{this.state.errorSendMsg}</p>
                        </div>
                        <FormsyText 
                            name="code"
                            ref="code"
                            title="短信验证码"
                            type="text"
                            required />
                        <div className="pop-btn pwd-btn">
                            <Link to=""> 《 返回</Link>
                            <button type="submit" ref="submit" disabled={!this.state.canSubmit} 
                                className={ this.state.canSubmit ? "" : "disabled"} >下一步</button>
                            <p className="valid-msg">{this.state.errorCodeMsg}</p>
                        </div>
                    </Formsy.Form>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({ action: state.action }) )(ResetPwd);


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import UserAction from '../../actions/UserAction';
import OperateAction from '../../actions/OperateAction';
import FormsyText from '../../components/formsy/FormsyText.jsx';

import { getRequestTypes } from '../../libs/utils';

class ResetPwd extends Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    state = {
        errorMsg: null
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

    componentDidMount() {
        this.operateAction = new OperateAction();
    }
    componentWillReceiveProps(nextProps) {
        this.handleActionProps(this.props, nextProps, OperateAction.ACTION_SUBMIT_EMAIL);
    }

    handleActionProps = (thisProps, nextProps, action) => {
        // const thisAction = thisProps.action && thisProps.action[action];
        const nextAction = nextProps.action;
        let contact = this.refs.contact.getValue();
        const sendType = getRequestTypes("send");
        if (nextAction.type === UserAction.SEND) {
                // this.refs.snackbar.show(nextAction.message, nextAction.label);
        } 
        else if (nextAction.type === sendType.success) {
            this.setState({
                errorMsg: nextAction.error.message || '发送失败'
            });
        } 
        else if (nextAction.type === sendType.failure){
            this.setState({
                errorMsg: '发送成功'
            });
            this.props.history.push('/pwd/valid?contact='+contact);
        }
    };

    handleSubmit = () => {
        let contact = this.refs.contact.getValue();
        this.props.dispatch(this.operateAction.sendPwd(contact));
    };

    render() {
        return (
            <div>
                <div className="bg-white pwd">
                    <div className="stepflex">
                        <dl className="first doing">
                            <dt className="s-num">1</dt>
                            <dd className="s-text">输入账号</dd>
                        </dl>
                        <dl className="normal">
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
                        <FormsyText 
                            name="contact" 
                            ref="contact"
                            title="输入注册手机号/邮箱"
                            type="text"
                            required />
                        <div className="pop-btn pwd-btn">
                            <button type="submit" disabled={!this.state.canSubmit} 
                                className={ this.state.canSubmit ? "" : "disabled"} >发送验证码</button>
                            <p className="valid-msg">{this.state.errorMsg}</p>
                        </div>
                    </Formsy.Form>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({ action: state.action }) )(ResetPwd);


import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import OperateAction from '../../actions/OperateAction';
import FormsyText from '../../components/formsy/FormsyText.jsx';

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
        if (nextAction.error) {
            this.setState({
                errorMsg: nextAction.error.message || '发送失败'
            });
            // this.showSnackbar(nextAction.error.message || '发送失败', 'ERROR');
        } else {
            this.setState({
                errorMsg: '发送成功'
            });
            // this.showSnackbar('发送成功', 'SUCCESS');
            document.location = 'valid';
        }
    };

    handleSubmit = () => {
        let contact = this.refs.contact.getValue();
        this.props.dispatch(this.operateAction.sendPwd(contact));
    };

    render() {
        return (
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
                        error={this.props.errorMsg}
                        required />
                    <p>{this.props.errorMsg}</p>
                    <div className="pop-btn pwd-btn">
                        <button type="submit" disabled={!this.state.canSubmit} 
                            className={ this.state.canSubmit ? "" : "disabled"} >发送验证码</button>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}


module.exports = connect( state => ({ action: state.action }) )(ResetPwd);


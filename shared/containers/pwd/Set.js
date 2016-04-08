import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import UserAction from '../../actions/UserAction';
import OperateAction from '../../actions/OperateAction';
import FormsyText from '../../components/formsy/FormsyText.jsx';

import { getRequestTypes } from '../../libs/utils';

class ResetPwd extends Component {

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
        this.userAction = new UserAction();
        this.operateAction = new OperateAction();
    };

    componentWillReceiveProps(nextProps) {
        const setType = getRequestTypes("set");
                    
        if (nextProps.action.type === UserAction.SEND) {
            // ss
        } 
        else if (nextProps.action.type === setType.success) {
            this.props.history.push('/pwd/success');
            
        }
        else if (nextProps.action.type === setType.failure) {
            this._setState({ 
                errorMsg: nextProps.action.error.message || '发送失败'
            });
        }
    };

    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
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

    handleSubmit = () => {
        const contact = this.props.location.query.contact;
        const code = this.props.location.query.code;
        const new_password = this.refs.newpass.getValue();
        const repass = this.refs.repass.getValue();
        if(new_password==repass){
           this.props.dispatch(this.operateAction.setPwd( contact, code, new_password )); 
        }
        else{
            this._setState({ 
                errorMsg: '两次密码输入不一致'
            });
        }
    };

    render() {
        return (
            <div>
                <div className="bg-white pwd">
                    <div className="stepflex">
                        <dl className="first">
                            <dt className="s-num">1</dt>
                            <dd className="s-text">输入账号</dd>
                        </dl>
                        <dl className="normal">
                            <dt className="s-num">2</dt>
                            <dd className="s-text">验证账号</dd>
                        </dl>
                        <dl className="normal last doing">
                            <dt className="s-num">3</dt>
                            <dd className="s-text">设置密码</dd>
                        </dl>
                    </div>
                </div>
                <div className="content" ref="pwd">
                    <Formsy.Form
                        onValid={this.enableButton}
                        onInvalid={this.disableButton}
                        onValidSubmit={this.handleSubmit}
                        className="pwd-form pwd-write-form">
                        <FormsyText 
                            name="newpass"
                            ref="newpass"
                            title="新密码"
                            type="password"
                            validations={{
                                minLength: 6,
                                maxLength: 10
                            }}
                            validationErrors={{
                                minLength: '请输入6-10个字符',
                                maxLength: '请输入6-10个字符'
                            }}
                            required />
                        <FormsyText 
                            name="repass"
                            ref="repass" 
                            title="重复密码"
                            type="password"
                            validations={{
                                minLength: 6,
                                maxLength: 10
                            }}
                            validationErrors={{
                                minLength: '请输入6-10个字符',
                                maxLength: '请输入6-10个字符'
                            }}
                            required />
                        <div className="pop-btn pwd-btn">
                            <button type="submit" disabled={!this.state.canSubmit} 
                                className={ this.state.canSubmit ? "" : "disabled"} >完成</button>
                            <p className="valid-msg">{this.state.errorMsg}</p>
                        </div>
                    </Formsy.Form>
                </div>
            </div>
        );
    }
}


module.exports = connect( state => ({ action: state.action }) )(ResetPwd);


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
        
    };

    componentDidMount() {
    }

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


    render() {
        return (
            <div className="content">
                <Formsy.Form
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    className="pwd-form pwd-write-form">
                    <div className="formsy-list pwd-valid">
                        验证码已发送至您的手机<em>15200001234</em><button className="valid-btn yz-btn">60s后重发</button>
                    </div>
                    <FormsyText 
                        name="name" 
                        title="短信验证码"
                        type="text"
                        required />
                    <div className="pop-btn pwd-btn">
                        <button type="submit" disabled={!this.state.canSubmit} 
                            className={ this.state.canSubmit ? "" : "disabled"} ><Link to="/pwd/set">下一步</Link></button>
                    </div>
                </Formsy.Form>
            </div>
        );
    }
}


module.exports = connect( state => ({ notices: state.notices }) )(Pwd);


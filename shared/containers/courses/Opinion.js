import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'

class Account extends Component {

    render() {

        return (

            <div>
                <h4 className="h4-title">意见反馈</h4>
                <div className="other-opinion">
                    <input type="text" placeholder="我的手机" /><input type="email" placeholder="我的邮箱" />
                    <textarea>
                        我要提问或意见反馈
                    </textarea><br />
                    <button className="btn" name="" value="提交" type="submit">提交</button>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({ user: state.user }) )(Account);
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux'


class Account extends Component {

    render() {

        return (

            <div>
                <h4 className="h4-title">联系我们</h4>
                <div className="other-contact cl">
                    <div className="other-contact-left fl">
                        <address>
                            联系地址：<br />
                            北京市海淀区成府路43号2号楼234室<br /><br />
                            电话：<br />
                            4008-363-463<br /><br />
                            邮箱：<br />
                            service@ezijing.com
                        </address>
                    </div>
                    <div className="other-contact-right fl">
                        <img src={require('../../assets/img/map.jpg')} />
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = connect( state => ({ user: state.user }) )(Account);

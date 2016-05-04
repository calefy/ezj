import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';

import UserAction from '../../actions/UserAction';
import FormsyUpload from '../../components/formsy/FormsyUpload.jsx';

class Avatar extends Component {

    render() {
        const user = this.props.user.data || {};

        return (
            <div className="account-avatar">
                <Formsy.Form>
                    <FormsyUpload
                        id="upload_avatar"
                        fileVal = "avatar"
                        name="avatar"
                        label="上传新头像"
                    />
                </Formsy.Form>
            </div>
        );
    }
}

module.exports = connect( state => ({ user: state.user }) )(Avatar);


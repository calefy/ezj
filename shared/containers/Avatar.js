import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardHeader, FlatButton, RaisedButton } from 'material-ui'

import UserAction from '../actions/UserAction';
import OperateAction from '../actions/OperateAction';
import Formsy from 'formsy-react';
import FormsyUpload from '../components/FormsyUpload.jsx';
import styles from '../assets/styles';

class Avatar extends Component {

    handleFileSuccess = (res) => {
        const userAction = new UserAction();
        this.props.dispatch( userAction.updateAvatar(res.data.avatar) )
    };

    handleFileError = (res) => {
        const operateAction = new OperateAction();
        this.props.dispatch( operateAction.showErrorMessage(res || '上传头像失败') );
    };

    render() {
        const { user } = this.props;

        return (
            <div className="container mar20">
                <h1 className="h1-title">修改头像</h1>
                <Card className="avatar">
                    <CardTitle
                        title={<img src={user.data && user.data.avatar || '/static/images/user.jpg'} alt="" width="180" />}
                        className="avatar-left fl" />
                    <CardText
                        className="avatar-right" >
                        <Card
                            style={ styles.boxShadowStyle }>
                            <CardHeader
                                title="支持jpg、gif、png或bmp格式的图片，建议文件小于5M"
                                style={{ height: 'auto' }} />
                            <CardText>
                                <Formsy.Form>
                                    <FormsyUpload
                                        id="avatarUpload"
                                        label="上传新头像"
                                        name="file"
                                        ref="file"
                                        server="/api/v1/account/avatar"
                                        onFileSuccess={this.handleFileSuccess}
                                        onFileError={this.handleFileError}
                                        fileSingleSizeLimit={1024 * 1024 * 5}
                                        accept={[
                                            {
                                                title: 'Images',
                                                extensions: 'gif,jpg,jpeg,bmp,png',
                                                mimeTypes: 'image/*'
                                            }
                                        ]}
                                    >
                                        <RaisedButton
                                            label="上传新头像"
                                            id="avatarUpload"
                                            primary={true}
                                            backgroundColor="#a22645"
                                            containerElement="div"
                                            linkButton={true}
                                        />
                                    </FormsyUpload>
                                </Formsy.Form>
                            </CardText>
                        </Card>
                    </CardText>
                </Card>
            </div>
        );
    }
}

module.exports = connect( state => ({ user: state.user }) )(Avatar);

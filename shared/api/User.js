import Base from './Base';
import ApiClient from './apiClient';
import { paramify } from '../libs/utils';

class User extends Base {

    /**
     * 当前登录用户
     */
    info() {
        return this.apiClient.post('sso/get_user_info');
    }
    show() {
        return this.info();
    }

    /**
     * 登录
     */
    login(data) {
        return this.apiClient.post('sso/login', data);
    }
    // login({username, password, remember = true}) {
    //     return this.apiClient.post('http://101.6.244.29:8004/v1/account/login', {
    //         username,
    //         pass: password,
    //         remember
    //     });
    // }

    /**
     * 注册发送验证码
     */
    send(contact) {
        return this.apiClient.post('sso/send_register_code', { contact: contact });
    }
    /**
     * 注册
     */
    reg(data) {
        return this.apiClient.post('sso/register', data);
    }

    /**
     * 退出登录
     */
    logout() {
        return this.apiClient.post('sso/logout');
    }

    /**
     * 修改密码
     */
    changePasswd(data) {
        return this.apiClient.post('sso/change_password', data);
    }

    /**
     * 重置密码发邮件
     */
    sendPwd(contact) {
        return this.apiClient.post('sso/send_reset_password_code',  { contact: contact });
    }

    /**
     * 重置密码校验密码
     */
    pwdCode(contact,code) {
        return this.apiClient.post('sso/validate_code',  { contact: contact, code: code });
    }

    /**
     * 修改手机、邮箱验证码发送
     */
    sendCodeForContact(contact) {
        return this.apiClient.post('sso/send_change_contact_code', {contact});
    }
    /**
     * 修改手机、邮箱
     */
    updateContact(params = { password, contact, code }) {
        return this.apiClient.post('sso/update_user_contact', params);
    }

    /**
     * 重置密码
     */
    resetPwd(contact,code,new_password) {
        return this.apiClient.post('sso/reset_password',  {
            contact: contact,
            code: code,
            new_password: new_password
        });
    }

    avatar(formData) {
        return this.apiClient.post('account/avatar', formData, {'Content-Type': ApiClient.CONTENT_TYPE_MULTI});
    }

    student(uid, params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get('els/students/' + uid + params);
    }

}

module.exports = User;

import Base from './Base';
import ApiClient from './apiClient';

class User extends Base {

    /**
     * 当前登录用户
     */
    info(ticket) {
        return this.apiClient.post('sso/get_user_info',{ ticket: ticket });
    }
    show() {
        return this.info();
    }

    /**
     * 登录
     */
    login({name, pass}) {
        return this.apiClient.post('sso/login', {
            login_name:name,
            password: pass
        });
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
    reg({nickname,password,contact,code}) {
        return this.apiClient.post('sso/register', { 
            nickname: nickname,
            password: password,
            contact: contact,
            code: code
        });
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
    changePwd(oldPassword, newPassword) {
        return this.apiClient.post('account/pass-new', {
            pass:oldPassword,
            newpass: newPassword
        });
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

}

module.exports = User;

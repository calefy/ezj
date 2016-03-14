import Base from './Base';
import ApiClient from './apiClient';

class User extends Base {

    /**
     * 当前登录用户
     */
    info() {
        return this.apiClient.get('account/info');
    }
    show() {
        return this.info();
    }

    /**
     * 登录
     */
    login({username, password, remember = true}) {
        return this.apiClient.post('account/login', {
            username,
            pass: password,
            remember
        });
    }

    /**
     * 退出登录
     */
    logout() {
        return this.apiClient.post('account/logout');
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
    sendPwd(email) {
        return this.apiClient.post('account/pass-mail',  { email: email });
    }

    /**
     * 重置密码
     */
    resetPwd(token,pass) {
        return this.apiClient.post('account/pass-reset',  {
            token: token,
            pass: pass
        });
    }

    avatar(formData) {
        return this.apiClient.post('account/avatar', formData, {'Content-Type': ApiClient.CONTENT_TYPE_MULTI});
    }

}

module.exports = User;

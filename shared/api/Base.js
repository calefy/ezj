/**
 * api 定义基类
 */

class Base {

    constructor({apiClient = null}) {
        if (!apiClient) {
            throw new Error('缺少 apiClient 参数！');
        }
        this.apiClient = apiClient;
    }

}

module.exports = Base;

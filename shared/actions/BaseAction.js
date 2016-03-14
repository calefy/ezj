/**
 * action 基类
 */
import apiClientFetch from '../api/apiClientFetch';
import { dispatchRequest, getOwnRequestIdentity, isOwnRequest } from '../libs/utils';

module.exports = class BaseAction {

    static dispatchRequest = dispatchRequest;
    static getOwnRequestIdentity = getOwnRequestIdentity;
    static isOwnRequest = isOwnRequest;

    api = null;
    apiClient = null;

    /**
     * @var apiClient 默认采用apiClientFetch对象
     */
    constructor({ apiClient }) {
        this.apiClient = apiClient ? apiClient : new apiClientFetch();
    }

    /**
     * 根据传入的类构造api
     */
    getApi(className) {
        return new className({ apiClient: this.apiClient });
    }

}

import Base from './Base';
import { paramify } from '../libs/utils';

class Other extends Base {

    /**
     * 广告获取
     */
    ads(params = {}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`marketing/advertisements${params}`);
    }

    /**
     * 用户行为数据采集
     */
    uploadAnalysis(params = {}) {
        params.actions = JSON.stringify(params.actions);
        return this.apiClient.post('dc/upload/log', params);
    }

    /**
     * 用户提交sheet采集
     */
    uploadAnalysisSheet(params = {}) {
        return this.apiClient.post('dc/upload/answer-sheet', params);
    }

}

module.exports = Other;

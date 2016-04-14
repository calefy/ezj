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

}

module.exports = Other;

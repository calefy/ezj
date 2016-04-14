import BaseAction from './BaseAction';
import OtherApi from '../api/Other';

module.exports = class OtherAction extends BaseAction {

    constructor(config = {}) {
        super(config);
        this.api = this.getApi(OtherApi);
    }

    // 首页广告加载
    static ADS_INDEX = 'ads_index';
    loadIndexAds() {
        return BaseAction.dispatchRequest(OtherAction.ADS_INDEX,
                this.api.ads({terminal_type: 'WWW', ad_position_uri: 'www.ezijing.com' }));
    }

}



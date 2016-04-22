import Base from './Base';
import { paramify } from '../libs/utils';

class Commerce extends Base {

    /**
     * 账号信息
     */
    account() {
        return this.apiClient.get('commerce/coins/account');
    }

    /**
     * 充值记录查询
     */
    recharges(params = {}) {
        params.txn_type = 2; // 充值类型记录
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get('commerce/coins/records' + params);
    }
    /**
     * 订单
     */
    orders(params={}) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get('commerce/orders' + params);
    }

    pay(params={}) {
        return this.apiClient.post('commerce/orders', params);
    }

}

module.exports = Commerce;


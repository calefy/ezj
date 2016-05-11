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
    cancelOrder(orderId) {
        return this.apiClient.delete(`commerce/orders/${orderId}`);
    }

    pay(params={}) {
        return this.apiClient.post('commerce/orders', params);
    }

    product(productId) {
        return this.apiClient.get(`commerce/products/${productId}`);
    }
    products(params) {
        params = paramify(params);
        params = params ? '?' + params : '';
        return this.apiClient.get(`commerce/products${params}`);
    }

    productLecturers(ids) {
        return this.apiClient.get('commerce/products/lecturers?ids=' + ids.join(','));
    }
}

module.exports = Commerce;


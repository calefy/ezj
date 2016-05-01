import BaseAction from './BaseAction';
import CommerceApi from '../api/Commerce';

module.exports = class CommerceAction extends BaseAction {

    constructor(config = {}) {
        super(config);
        this.api = this.getApi(CommerceApi);
    }

    static LOAD_ACCOUNT = 'ec_account';
    loadAccount() {
        return BaseAction.dispatchRequest(CommerceAction.LOAD_ACCOUNT, this.api.account());
    }

    static LOAD_RECHARGES = 'ec_recharges';
    loadRecharges(params) {
        return BaseAction.dispatchRequest(CommerceAction.LOAD_RECHARGES, this.api.recharges(params), params);
    }

    static LOAD_ORDERS = 'ec_orders';
    loadOrders(params) {
        return BaseAction.dispatchRequest(CommerceAction.LOAD_ORDERS, this.api.orders(params), params);
    }
    static PAY = 'ec_pay';
    pay(params) {
        return BaseAction.dispatchRequest(CommerceAction.PAY, this.api.pay(params), params);
    }

    static LOAD_PRODUCT = 'ec_product';
    loadProduct(productId) {
        return BaseAction.dispatchRequest(CommerceAction.LOAD_PRODUCT, this.api.product(productId), { productId });
    }
    static LOAD_PRODUCTS = 'ec_products';
    loadProducts(params) {
        return BaseAction.dispatchRequest(CommerceAction.LOAD_PRODUCTS, this.api.products(params), params);
    }
}




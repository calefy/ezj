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
    loadRecharges() {
        return BaseAction.dispatchRequest(CommerceAction.LOAD_RECHARGES, this.api.recharges());
    }

    static LOAD_ORDERS = 'ec_orders';
    loadOrders() {
        return BaseAction.dispatchRequest(CommerceAction.LOAD_ORDERS, this.api.orders());
    }
}




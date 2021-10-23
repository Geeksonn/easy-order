import OrderDAO from '../dao/orderDAO';

export default class OrderController {
    static async getOrders(sort) {
        return await OrderDAO.getOrders(sort);
    }

    static async addOrder(order) {
        const { ops } = await OrderDAO.addOrder(order);
        return ops[0];
    }

    static async deleteOrder(orderID) {
        const result = await OrderDAO.deleteOrder(orderID);

        let res;
        if (result.deletedCount === 1) {
            res = {
                status: 200,
                response: {
                    message: "Order successfuly deleted."
                }
            };
        }
        else {
            res = {
                status: 204
            };
        }

        return res;
    }
}
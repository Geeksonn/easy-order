import OrderDAO from '../dao/orderDAO';

export default class OrderController {
    static async getOrders(sort) {
        return await OrderDAO.getOrders(sort);
    }

    static async addOrder(order) {
        order.date = new Date();
        return await OrderDAO.addOrder(order);
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
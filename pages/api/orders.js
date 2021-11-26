import OrderController from '../../controllers/order.controller';
import TokenController from '../../controllers/token.controller';

export default async function handler(req, res) {
    if (!await TokenController.checkHeaders(req.headers)) {
        res.status(401).json({ message: 'You are not authorized to perform this API call' });
    }
    else {
        if (req.method === 'GET') {
            res.status(200).json(await OrderController.getOrders(req.body.sort));
        }
        else if (req.method === 'POST') {
            res.status(201).json(await OrderController.addOrder(req.body));
        }
        else if (req.method === 'DELETE') {
            const result = await OrderController.deleteOrder(req.body.orderID);

            res.status(result.status).json(result.response);
        }
        else {
            res.status(405).json({ message: 'Unrecognised HTTP method for this API' });
        }
    }
}
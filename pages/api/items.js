import ItemController from '../../controllers/item.controller';
import TokenController from '../../controllers/token.controller';

export default async function handler(req, res) {
    const availableMethods = ['GET', 'POST', 'DELETE'];

    if (!await TokenController.checkHeaders(req.headers)) {
        res.status(401).json({ message: 'You are not authorized to perform this API call' });
    }
    else {
        if (req.method === 'GET') {
            res.status(200).json(await ItemController.getItems());
        }
        else if (req.method === 'POST') {
            res.status(201).json(await ItemController.addItems(req.body));
        }
        else if (req.method === 'DELETE') {
            const result = await ItemController.deleteItem(req.body.itemID);

            res.status(result.status).json(result.response);
        }
        else {
            res.status(405).json({ message: 'Unrecognised HTTP method for this API' });
        }
    }
}
import ItemController from '../../controllers/item.controller';

export default async function handler(req, res) {
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
import ItemDAO from '../dao/itemDAO';

export default class ItemController {
    static async getItems() {
        return await ItemDAO.getItems();
    }

    static async addItems(items) {
        return await ItemDAO.addItems(items);
    }

    static async deleteItem(itemID) {
        const result = await ItemDAO.deleteItem(itemID);

        let res;
        if (result.deletedCount === 1) {
            res = {
                status: 200,
                response: {
                    message: "Item successfuly deleted."
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
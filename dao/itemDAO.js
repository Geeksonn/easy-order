import { connectToDatabase, ObjectID } from '@geekson/mongodb-connector';

/*
    Items = [
        {
            _id: xxx,
            name: xxx,
            image: xxx,
            price: xxx
            currency: xxx
        }
    ]

*/

export default class ItemDAO {
    static getCollectionName() {
        return 'items';
    }

    static async getItems() {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .find()
            .toArray();
    }

    static async addItems(items) {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .insertMany(items);
    }

    static async deleteItem(itemID) {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .deleteOne({ _id: ObjectID(itemID) });
    }
}
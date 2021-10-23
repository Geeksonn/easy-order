import { connectToDatabase, ObjectID } from '@geekson/mongodb-connector';

/*
    Orders = [
        {
            _id: xxx,
            date: xxx,
            totalPrice: xxx,
            items: [ Items ]
        }
    ]

*/

export default class OrderDAO {
    static getCollectionName() {
        return 'orders';
    }

    static async getOrders(sort = { date: -1 }) {
        console.log('sort ? ', sort);
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .find()
            .sort(sort)
            .toArray();
    }

    static async addOrder(order) {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .insertOne(order);
    }

    static async deleteOrder(orderID) {
        const { db } = await connectToDatabase();

        return await db
            .collection(this.getCollectionName())
            .deleteOne({ _id: ObjectID(orderID) });
    }
}
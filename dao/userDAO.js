import { connectToDatabase, ObjectID } from '@geekson/mongodb-connector';

/*
    User = {
        dateCreated: [date]
        lastConnected: [date]
        firstname: xxx
        lastname: xxx
        email: xxx
        username: xxx
        password: xxx
    }
*/

export default class UserDAO {
    static getCollectionName() {
        return 'users';
    }

    static async getUser(username) {
        const { db } = await connectToDatabase();

        return db
            .collection(this.getCollectionName())
            .findOne({ username: username });
    }

    static async getUserByEmail(email) {
        const { db } = await connectToDatabase();

        return db
            .collection(this.getCollectionName())
            .findOne({ email: email });
    }

    static async updateConnectionDate(userID) {
        const { db } = await connectToDatabase();
        const newDatetime = {
            $set: { lastConnected: new Date() }
        };

        return db
            .collection(this.getCollectionName())
            .updateOne({ _id: ObjectID(userID)}, newDatetime);
    }

    static async createUser(user) {
        const { db } = await connectToDatabase();
        
        return db
            .collection(this.getCollectionName())
            .insertOne(user);
    }
}
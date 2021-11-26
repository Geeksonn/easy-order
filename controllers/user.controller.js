import slugify from 'slugify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserDAO from '../dao/userDAO';

export default class UserController {
    static async getUser(username) {
        return await UserDAO.getUser(username);
    }

    static async updateConnectionDate(userID) {
        return await UserDAO.updateConnectionDate(userID);
    }

    static async createUser(user) {
        const saltRounds = 10;
        const { username, password, email } = user;

        if (!username) {
            return {
                status: 400,
                error: 'Username is mandatory'
            };
        }

        if (!password) {
            return {
                status: 400,
                error: 'Password is mandatory'
            };
        }

        if (!email) {
            return {
                status: 400,
                error: 'Email is mandatory'
            };
        }

        user.username = slugify(username);

        if (await this.getUser(user.username)) {
            return {
                status: 409,
                error: 'Username already exists'
            };
        }

        if (await UserDAO.getUserByEmail(user.email)) {
            return {
                status: 409,
                error: 'E-mail already exists'
            };
        }

        user.dateCreated = new Date();
        user.password = bcrypt.hashSync(password, saltRounds);

        const { ops } = await UserDAO.createUser(user);

        return {
            status: 201,
            user: ops[0]
        };
    }

    static async authUser(username, password) {
        if (!username) {
            return {
                status: 400,
                error: 'Username is mandatory.'
            };
        }

        if (!password) {
            return {
                status: 400,
                error: 'Password is mandatory.'
            };
        }

        const user = await this.getUser(username);

        if (!user) {
            return {
                status: 401,
                error: 'Incorrect login information'
            };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return {
                status: 401,
                error: 'Incorrect login information'
            }
        }

        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10h' });

        this.updateConnectionDate(user._id);

        return {
            status: 200,
            token: token
        };
    }

    static async checkToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded._id) {
                return true;
            }
            else {
                return false;
            }
        }
        catch(err) {
            return false;
        }
    }
}
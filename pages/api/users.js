import UserController from '../../controllers/user.controller';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const result = await UserController.createUser(req.body);
        
        const response = result.status === 201 ? result.user : result.error;

        res.status(result.status).json(response);
    }
    else if (req.method === 'GET') {
        const user = await UserController.getUser(req.body.username);

        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404);
        }
    }
    else {
        res.status(405).json({ message: 'Unrecognised HTTP method for this API' });
    }
}
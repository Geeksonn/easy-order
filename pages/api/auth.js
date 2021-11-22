import UserController from '../../controllers/user.controller';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;
        const result = await UserController.authUser(username, password);
        
        const response = result.status === 200 ? result.token : result.error;

        res.status(result.status).json(response);
    }
    else {
        res.status(405).json({ message: 'Unrecognised HTTP method for this API' });
    }
}
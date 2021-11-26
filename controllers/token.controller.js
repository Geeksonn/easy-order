import UserController from "./user.controller";

export default class TokenController {
    static async checkHeaders(headers) {
        if (!headers.authorization) {
            return false;
        }
        
        const token = headers.authorization.split(' ')[1];

        if (!await UserController.checkToken(token)) {
            return false;
        }

        return true;
    }
}
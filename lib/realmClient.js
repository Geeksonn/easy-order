import * as Realm from 'realm-web';

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const REALM_GRAPHQL_ENDPOINT = `https://eu-west-1.aws.realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;

const app = new Realm.App({ id: APP_ID });

const generateHeaders = async () => {
    if (!app.currentUser) {
        throw 'User must be logged in !';
    }
    await app.currentUser.refreshCustomData();

    const { accessToken } = app.currentUser;

    return {
        Authorization: 'Bearer ' + accessToken,
    };
};

const authenticateUser = async (email, password) => {
    const cred = Realm.Credentials.emailPassword(email, password);
    await app.logIn(cred);

    return app.currentUser;
};

const sendResetPasswordEmail = async (email) => {
    await app.emailPasswordAuth.sendResetPasswordEmail({ email: email });
};

const resetPassword = async (password, token, tokenId) => {
    try {
        await app.emailPasswordAuth.resetPassword({
            password: password,
            token: token,
            tokenId: tokenId,
        });
    } catch (error) {
        return { error: error };
    }
    
    return ;
};

export { REALM_GRAPHQL_ENDPOINT, generateHeaders, authenticateUser, sendResetPasswordEmail, resetPassword };
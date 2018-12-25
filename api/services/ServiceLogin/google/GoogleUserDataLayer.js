const GoogleAuth = require('./GoogleAuth');
const {google} = require('googleapis');

    class GoogleUserService extends GoogleAuth {
    constructor(config, scope) {
        super(config, scope);
    }

    async getGooglePlusApi(auth) {
        return await google.plus({version: 'v1', auth});
    }

    /**
     * Extract the email and id of the google account from the "code" parameter.
     */

    async getGoogleAccountFromCode(code) {
        // get the auth "tokens" from the request
        const auth = await super.createConnection();
        const data = await auth.getToken(code); //TODO: Create getAuth function in GoogleAuth?
        const tokens = data.tokens;

        // add the tokens to the google api so we have access to the account
        //const auth = super.auth.createConnection();
        auth.setCredentials(tokens);

        // connect to google plus - need this to get the user's email
        const plus = await this.getGooglePlusApi(auth);
        const me = await plus.people.get({userId: 'me'});

        // get the google id and email
        const userGoogleId = me.data.id;
        const userGoogleName = me.data.name;
        const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

        // return so we can login or sign up the user
        return {
            id: userGoogleId,
            name: userGoogleName,
            email: userGoogleEmail,
            tokens: tokens, // you can save these to the user if you ever want to get their details without making them log in again
        };
    }
}
module.exports = GoogleUserService;
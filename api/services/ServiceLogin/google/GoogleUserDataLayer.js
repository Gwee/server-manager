const GoogleAuthService = require('./GoogleAuth'),
    {google} = require('googleapis'),
    mongoose = require('mongoose'),
    User = mongoose.model('Users');
    class GoogleUserService extends GoogleAuthService {
    constructor(config, scope) {
        super(config, scope);
        // this.userModel = mongoose.model('Users');
    }

    async getGooglePlusApi(auth) {
        return await google.plus({version: 'v1', auth});
    }

    userLogin (user, code){
        this.getGoogleAccountFromCode(code)
            .then((res)=>{
                return res
            })
            .catch((err)=>{

            });
    }
    async getNewUser(code){
        return await this.getGoogleAccountFromCode(code)
            .then((newUser)=>{
                return new User ({
                    _id: newUser.id,
                    first_name: newUser.name.givenName,
                    last_name: newUser.name.familyName,
                    email: newUser.email,
                    // tokens: newUser.tokens.map(function(token){ //TODO: test this
                    //     return token
                    // })
                });
            })
            .catch((err)=>{
                console.log(err)
            });
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
        auth.setCredentials(tokens);

        // connect to google plus - need this to get the user's email
        const plus = await this.getGooglePlusApi(auth);
        return await this.getUserFromGoogleApi(plus, tokens)
            .then((res)=>{
                return res
        })
            .catch((err)=>{
                console.log("Failed to get user from plus API - %v", err)
            })
    }

    async getUserFromGoogleApi(api, tokens){
        const me = await api.people.get({userId: 'me'});

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
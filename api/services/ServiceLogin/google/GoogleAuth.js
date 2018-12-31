const {google} = require('googleapis');


class GoogleAuthService{
    constructor(config,scope){
        this.config = config;
        this.scope = scope;
    }
    async createConnection() {
        return await new google.auth.OAuth2(
            this.config.clientId,
            this.config.clientSecret,
            this.config.redirect
        );
        // return this.auth;
    }
    /**
     * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
     */
    getConnectionUrl(auth) {
        return auth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
            scope: this.scope
        });
    }


    /**
     * Create the google url to be sent to the client.
     */
    async getGoogleUrl() {
        const auth = await this.createConnection(this.config); // this is from previous step
        return await this.getConnectionUrl(auth);
    }

}
module.exports = GoogleAuthService;

// const googleConfig = {
//     clientId: '1016798324260-bba0ir8efu5qd30ajuulpogqototugpc.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
//     clientSecret: 'ashtkFhSmw1o-Vg69cb1eaH3', // e.g. _ASDFA%DFASDFASDFASD#FAD-
//     redirect: 'http://localhost:3000/google-auth' // this must match your google api settings
// };
//
// const defaultScope = [
//     'https://www.googleapis.com/auth/plus.me',
//     'https://www.googleapis.com/auth/userinfo.email',
// ];
//let ga = new GoogleAuthService(googleConfig,defaultScope);
//console.log(ga.getGoogleUrl());

//
// const GoogleUserService = require('./GoogleUserDataLayer');
// let gu = new GoogleUserService(googleConfig,defaultScope);
// gu.getGoogleUrl().then((res)=> {console.log(res);}).catch((err)=> {console.log(err);});
// // gu.getNewUser('4/wQDhD99IBQ0DVukNinNWePvWYi4q3qUeEsr8s8eu47gLKOoHvugsNfLthIMQ2VCa5IVuGoAMC1lDI_-qFOSrm34').then((res)=> {console.log(res);}).catch((err)=> {console.log(err);});
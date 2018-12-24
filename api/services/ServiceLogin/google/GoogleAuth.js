import { google } from 'googleapis';


class GoogleAuthService{
    constructor(config,scope){
        this.config = config;
        this.scope = scope;
    }
    createConnection(googleConfig) {
        return new google.auth.OAuth2(
            googleConfig.clientId,
            googleConfig.clientSecret,
            googleConfig.redirect
        )
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
    getGoogleUrl() {
        const auth = createConnection(); // this is from previous step
        return this.getConnectionUrl(auth);
    }

}

const googleConfig = {
    clientId: '1016798324260-bba0ir8efu5qd30ajuulpogqototugpc.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: 'ashtkFhSmw1o-Vg69cb1eaH3', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'https://your-website.com/google-auth' // this must match your google api settings
};

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];
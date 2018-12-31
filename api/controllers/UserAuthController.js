//'use strict';
require("../db/models/UserModel");
var mongoose = require('mongoose'),
    User = mongoose.model('Users');

const googleConfig = {
    clientId: '1016798324260-bba0ir8efu5qd30ajuulpogqototugpc.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: 'ashtkFhSmw1o-Vg69cb1eaH3', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'http://localhost:3000/google-auth' // this must match your google api settings
}, defaultGoogleScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];
const GoogleUserService = require("../services/ServiceLogin/google/GoogleUserDataLayer");

exports.registerNewUser = function(req, res) {
    let code = req.body.code;
    let gu = new GoogleUserService(googleConfig,defaultGoogleScope);
    //get new user object to save in DB
    gu.getNewUser(code)
        .then((newUser) => {
            console.log(newUser._id);
            //save user in DB
            newUser.save(function (err, task) {
                if (err) res.send(err);
                res.json(task)
            });
        })
        .catch((err) => {
            console.log(err)
        });
};

exports.getRegisteredUsers = function(req, res) {
    User.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
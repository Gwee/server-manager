'use strict';
module.exports = function(app) {
    var serverController = require('../controllers/ServerManagerController');
         var userController = require('../controllers/UserAuthController');

    //serverManager Routes
    app.route('/servers')
        .get(serverController.getServers)
        .post(serverController.updateServers);

    app.route('/users')
        .get(userController.getRegisteredUsers);
    app.route('/register/')
        .post(userController.registerNewUser);

    app.route('/servers/:serverId')
        .get(serverController.getServer)
        .put(serverController.updateServer)
        .delete(serverController.removeServer);
};
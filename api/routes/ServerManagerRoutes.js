'use strict';
module.exports = function(app) {
    let serverManager = require('../controllers/ServerManagerController'),
    userAuth = require('../controllers/UserAuthController');

    //serverManager Routes
    app.route('/servers')
        .get(serverManager.getServers)
        .post(serverManager.updateServers);


    app.route('/servers/:serverId')
        .get(serverManager.getServer)
        .put(serverManager.updateServer)
        .delete(serverManager.removeServer);
};
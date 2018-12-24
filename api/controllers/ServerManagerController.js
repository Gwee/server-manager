'use strict';

var mongoose = require('mongoose'),
    Server = mongoose.model('Servers');

exports.getServers = function(req, res) {
    Server.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};




exports.updateServers = function(req, res) {
    let new_server = new Server(req.body);
    new_server.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.getServer = function(req, res) {
    Server.findById(req.params.serverId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.updateServer = function(req, res) {
    Server.findOneAndUpdate({_id: req.params.serverId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.removeServer = function(req, res) {


    Server.remove({
        _id: req.params.serverId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Server successfully removed from inventory' });
    });
};

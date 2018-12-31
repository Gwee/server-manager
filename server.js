var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Servermanagerdb',{ useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//error handling

let routes = require('./api/routes/ServerManagerRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);
console.log('server manager RESTful API server started on: ' + port);
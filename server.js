
var bodyParser = require('body-parser');
var express = require('express'),
  app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;


var routes = require('./routes/Routes'); //importing route
routes(app); //register the route

app.listen(port);


console.log('REC RESTful API server started on: ' + port);

'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const app = express();
const router = express.Router();

// setup parsing of body
app.use(bodyParser.json({ limit: '50mb' }))
app.use(methodOverride())

//auth route
require("./routes/auth.route")(app, router);

//middleware
app.use(require("./middleware/token"));

// connect to mongo
mongoose.connect('mongodb://expressdemo:expressdemo@ds133428.mlab.com:33428/expressdemo')

// add routes to our app
require("./routes/product.route")(app, router);
require("./routes/category.route")(app, router);

app.use(router)


//Server website files
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
});
// launch
app.listen(3500, () => {
    console.log('Express server listening on port ' + 3500);
})

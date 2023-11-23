var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require("./model/movie.js")
var dbURI = 'mongodb://localhost/douban';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
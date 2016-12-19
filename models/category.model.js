'use strict'
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

//all mongo docs have _id as unique identifier
let schema = new mongoose.Schema({
    name: { type: String, required: true } // or just String if no validation
});
let model = mongoose.model("categories",schema); // define which collections this schema applies to

module.exports = model;
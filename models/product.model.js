'use strict'
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

//all mongo docs have _id as unique identifier
let schema = new mongoose.Schema({
    name: { type: String, required: true }, // or just String if no validation
    price: {type: Number, default: 0},
    description: String,
    isValid: {type: Boolean, default: true},
    category: {type : ObjectId, ref: 'categories'}
});
let model = mongoose.model("products",schema); // define which collections this schema applies to

module.exports = model;
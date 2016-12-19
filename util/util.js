'use strict'
let jwt = require('jwt-simple');

let TOKEN_SECRET = "SUPERSECRET";

exports.tokenize = (payload) => {
    return jwt.encode(payload, TOKEN_SECRET);
}

exports.unwrapToken = (token) => {
    return jwt.decode(token, TOKEN_SECRET);
}
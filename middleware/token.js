'use strict'

let util = require("../util/util");
module.exports = (req, res, next) => {
    return next(); //comment this when showing auth routes 

    //validate token
    let token = req.headers['token'] // req.body.token || req.query.token;

    if(!token) 
        return res.status(401).send({message : "PROVIDE TOKEN PLZZ"});

    req.user = util.unwrapToken(token);
    next();
}
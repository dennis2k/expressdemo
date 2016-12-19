let util = require("../util/util");

module.exports = (app, router) => {
    // auth 
  app.post('/auth', (req, res) => {
      let username = req.body.username;
      let password = req.body.password;

      let token = util.tokenize({
          username: username,
          password: password,
          isAdmin: username === "dmo"
      });

      res.send({token: token});
  })
}
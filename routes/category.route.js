'use strict'
const categoryModel = require("../models/category.model");

module.exports = (app, router) => {

  app.all('/categories', function (req, res, next) {
    console.log('Runs for all category routes!')
    next();
  });
  
  // get all
  app.get('/categories', (req, res) => {
    categoryModel
      .find()
      .then(categories => {
        res.send(categories)
      })
      .catch(err => {
        res.status(400).send({ error: err })
      })
  });

  // get single
  app.get('/categories/:id', (req, res) => {
    let id = req.params.id;
    categoryModel
      .findById(id)
      .then(category => {
        if (!category) {
          return res.status(404).send("Category not found!");
        }
        res.send(category)
      })
      .catch(err => {
        res.status(400).send({ error: err })
      })
  });

  // replace
  app.put('/categories/:id', (req, res) => {
    let id = req.params.id;
    let updateCategory = req.body;

    categoryModel
      .findOneAndUpdate({ _id: id }, updateCategory) // also just .update to update multiple, also upsert
      .then(() => res.send("Updated!"))
      .catch(err => {
        res.status(400).send({ error: err })
      })
  });

  // create new 
  app.post('/categories', (req, res) => {
    categoryModel
      .create(req.body)
      .then(category => res.send(category))
      .catch(err => {
        res.status(400).send({ error: err });
      })
  });

  app.delete('/categories/:id', (req, res) => {
    /*if(!req.user || !req.user.isAdmin) {
      return res.status(403).send("Require some admin skillz plzz");
    }*/
    let id = req.params.id
    categoryModel
      .remove({ _id: id })
      .then(() => res.send("Deleted!"))
      .catch(err => {
        res.status(400).send({ error: err });
      })
  });

  app.use(router);
};
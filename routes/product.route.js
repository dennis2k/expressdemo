'use strict'
const productModel = require("../models/product.model");

module.exports = (app, router) => {

  app.get('/products', (req, res) => {
    let shouldPopulate = req.query.withCategory;
    let query = productModel.find();
    if (shouldPopulate)
      query.populate('category')

    query.then(products => res.send(products))
      .catch(err => {
        res.status(400).send({ error: err })
      })
  });

  app.get('/v1/products', (req, res) => {
    let inputPrice = req.query.price;
    let inputName = req.query.name;
    let category = req.query.category;

    // filter
    let query = {};
    if (inputPrice)
      query.price = { $gt: inputPrice };
    if (inputName)
      query.name = inputName;
    if (category)
      query.category = category;

    productModel.find(query).then(products => res.send(products))
      .catch(err => {
        res.status(400).send({ error: err })
      })
  });

  app.post('/products', (req, res) => {
    productModel
      .create(req.body)
      .then(product => res.send(product))
      .catch(err => {
        res.status(400).send({ error: err });
      })
  });

  app.delete('/products/:id', (req, res) => {
    let id = req.params.id
    productModel
      .remove({ _id: id })
      .then(() => res.send("Deleted!"))
      .catch(err => {
        res.status(400).send({ error: err });
      })
  });

  app.use(router);
};
module.exports = app => {
  const articles = require("../controllers/article.controller.js");

  var router = require("express").Router();

  // Create a new article
  router.post("/", articles.create);

  // Retrieve all articles
  router.get("/", articles.findAll);

  // Retrieve a single article with id
  router.get("/:id", articles.findOne);

  // Update a article with id
  router.put("/:id", articles.update);

  // Delete a article with id
  router.delete("/:id", articles.delete);

  app.use('/api/Article', router);
};
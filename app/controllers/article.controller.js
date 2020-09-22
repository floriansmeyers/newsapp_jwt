const db = require("../models");
const Article = db.articles;

// Create and Save a new article
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a article
  const article = new Article({
    Title: req.body.Title,
    SubTitle: req.body.SubTitle,
    ShortSummary: req.body.ShortSummary,
    Body: req.body.Body,
    TagID: req.body.TagID,
    UserID: req.body.UserID,
    ArticleStatusID: req.body.ArticleStatusID
  });

  // Save article in the database
  article
    .save(article)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the article."
      });
    });
};

// Retrieve all articles from the database.
exports.findAll = (req, res) => {
  const title = req.query.Title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Article.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
};

// Find a single article with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Article.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found article with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving article with id=" + id });
    });
};

// Update a article by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update article with id=${id}. Maybe article was not found!`
        });
      } else res.send({ message: "article was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating article with id=" + id
      });
    });
};

// Delete a article with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete article with id=${id}. Maybe article was not found!`
        });
      } else {
        res.send({
          message: "article was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete article with id=" + id
      });
    });
};
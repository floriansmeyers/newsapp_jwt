const db = require("../models");
const ArticleStatus = db.articlestatuses;


// Retrieve all articles from the database.
exports.findAll = (req, res) => {
  const name = req.query.Name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  ArticleStatus.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articlestatuses."
      });
    });
};

// Find a single article with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ArticleStatus.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found articlestatus with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving articlestatus with id=" + id });
    });
};
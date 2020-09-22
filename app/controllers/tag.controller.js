const db = require("../models");
const Tag = db.tags;

// Create and Save a new tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a tag
  const tag = new Tag({
	Name: req.body.Nameq
  });

  // Save tag in the database
  tag
    .save(tag)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tag."
      });
    });
};

// Retrieve all tags from the database.
exports.findAll = (req, res) => {
  const name = req.query.Name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Tag.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tags."
      });
    });
};

// Find a single tag with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tag.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found tag with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving tag with id=" + id });
    });
};

// Update a tag by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Tag.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update tag with id=${id}. Maybe tag was not found!`
        });
      } else res.send({ message: "tag was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating tag with id=" + id
      });
    });
};

// Delete a tag with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tag.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete tag with id=${id}. Maybe tag was not found!`
        });
      } else {
        res.send({
          message: "tag was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete tag with id=" + id
      });
    });
};
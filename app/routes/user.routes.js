module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const { authJwt } = require("../middlewares");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.create);
  
  // Authenticate user
  router.post("/authenticate", users.authenticate);

  // Retrieve a single user with id
  router.get("/:id", [authJwt.verifyToken], users.findOne);

  // Delete a user with id
  router.delete("/:id", users.delete);

  app.use('/api/User', router);
  
};
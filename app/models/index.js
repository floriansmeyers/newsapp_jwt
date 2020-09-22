const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.users = require("./user.model.js")(mongoose);
db.articles = require("./article.model.js")(mongoose);
db.roles = require("./role.model.js")(mongoose);
db.tags = require("./tag.model.js")(mongoose);
db.articlestatuses = require("./articlestatus.model.js")(mongoose);

module.exports = db;
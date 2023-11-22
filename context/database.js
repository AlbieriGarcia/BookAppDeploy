const Sequelize = require("sequelize");

const sequelize = new Sequelize("railway", "root", "aADh2agCcf6dGBFGDa36hD2gDdH1a232", {
  dialect: "mysql",
  host: "monorail.proxy.rlwy.net",
  port: 46961,
});

module.exports = sequelize;
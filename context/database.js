const Sequelize = require("sequelize");

const sequelize = new Sequelize("bkjwfva7vf46bqlev2id", "utb88pt4kioqe7so", "Q10pfuBdBuwvYXsab65t", {
  dialect: "mysql",
  host: "bkjwfva7vf46bqlev2id-mysql.services.clever-cloud.com",
  port: 3306,
});

module.exports = sequelize;
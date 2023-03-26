const Sequelize = require("sequelize");

const sequelize = require("../context/database");

const Books = sequelize.define("book", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pubDate: {
        type: Sequelize.STRING,
        allowNull: false,
    },   
});

module.exports = Books;
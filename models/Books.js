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
    imagePath: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    pubDate: {
        type: Sequelize.STRING,
        allowNull: false,
    },   
});

module.exports = Books;
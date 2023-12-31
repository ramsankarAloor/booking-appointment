const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const UserBookings = sequelize.define('userBookings', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    phone : {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    }
})

module.exports = UserBookings;
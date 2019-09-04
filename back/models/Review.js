const S = require('sequelize');
const db = require ('../config/db')


const Review = db.define('review', {
    comment: {
        type:S.STRING,
        allowNull: false,
    }
})

module.exports = Review
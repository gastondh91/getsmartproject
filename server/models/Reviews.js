const S = require('sequelize');
const db = require('../config/db');

const Reviews = db.define('reviews', {
  Review: {
    type: S.TEXT,
    allowNull: true
  }
})



module.exports = Reviews
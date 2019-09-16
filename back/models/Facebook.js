/* eslint-disable no-unused-vars */
const S = require('sequelize');
const db = require('../config/db');

const Facebook = db.define('facebook', {
  fb_Id: {
    type: S.STRING
  }
})


module.exports = {
  Facebook
};

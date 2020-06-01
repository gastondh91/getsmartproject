/* eslint-disable no-unused-vars */
const S = require('sequelize');
const db = require('../config/db');

const Google = db.define('google', {
  google_Id: {
    type: S.STRING
  }
})


module.exports = {
  Google
};

const S = require('sequelize');
const db = require('../config/db');

const Puntajes = db.define('puntajes', {
  Puntaje: {
    type: S.INTEGER,
    allowNull: true
  }
})



module.exports = Puntajes
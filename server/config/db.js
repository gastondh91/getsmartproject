
var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/getSmartDB', { // define la conexion de sequelize con la base de datos creada en postgres
  logging: false
});

module.exports = db;
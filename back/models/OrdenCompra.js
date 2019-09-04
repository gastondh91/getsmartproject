const S = require('sequelize');
const db = require('../config/db');

const OrdenCompra = db.define('ordencompra', {
  fechaOC: {
    type: S.DATE,
    allowNull: false
  },
  status: {
    type: S.ENUM,
    allowNull: false,
    values: ['CREADO', 'PROCESANDO', 'CANCELADO', 'COMPLETADO']
  }
});

module.exports = OrdenCompra;

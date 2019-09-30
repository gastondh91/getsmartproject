const S = require('sequelize');
const db = require('../config/db');

const OrdenCompra = db.define('ordencompra', {
  datos: {
    type: S.JSON
  },
  cantidades:{
    type: S.JSON
  },
  fecha:{
    type: S.DATE,
    defaultValue: new Date()
  },
  tarjeta:{
    type: S.JSON,
    allowNull: true
  },
  total:{
    type: S.STRING
  },
  status: {
    type: S.ENUM,
    allowNull: false,
    values: ['CREADO', 'PROCESANDO', 'CANCELADO', 'COMPLETADO']
  }
});

module.exports = OrdenCompra;

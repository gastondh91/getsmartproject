const S = require('sequelize');
const db = require ('../config/db')


const Carrito = db.define('carrito', {
    cantidad: {
        type:S.INTEGER,
        allowNull: false,
    }
})


module.exports = Carrito
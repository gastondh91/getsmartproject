const S = require('sequelize');
const db = require('../config/db');

const Producto = db.define('productos', {
  marca: {
    type: S.ENUM,
    values: ['Samsung', 'iPhone', 'Motorola', 'LG', 'Xiaomi', 'Huawei'],
    allowNull: false
  },
  modelo: {
    type: S.STRING,
    allowNull: false,
    unique: true

  },
  descripcion: {
    type: S.TEXT,
    allowNull: false
  },
  stock: {
    type: S.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  precio: {
    type: S.STRING,
    allowNull: false
  },
  imagenes: {
    type: S.ARRAY(S.TEXT),
    allowNull: true
  },
  calificacion:{
    type: S.FLOAT(11)
  }
});

var mayusculas = (producto)=>{

  if (producto.modelo.includes(' ') || producto.modelo[0] === producto.modelo[0].toLowerCase()) {
    newProducto = producto.modelo.split('')
  
    if(newProducto[0] === newProducto[0].toLowerCase()) newProducto[0] = newProducto[0].toUpperCase()
    
    for (i = 0; i < newProducto.length; i++) {
      if (newProducto[i] === ' ') newProducto[i + 1] = newProducto[i + 1].toUpperCase()
    }
    producto.modelo = newProducto.join('')
  
  }}

Producto.addHook('beforeCreate', (producto) => {
  mayusculas(producto)
});

Producto.addHook('beforeUpdate', (producto) => {
  mayusculas(producto)
})


module.exports = Producto;
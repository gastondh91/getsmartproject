const Productos = require('./Producto');
const Categorias = require('./Categorias');
const Carrito = require('./Carrito')
const OrdenCompra = require('./OrdenCompra');
const Usuario = require('./Usuario').Usuario;

const modelos = {
  Categorias,
  Productos,
  Carrito,
  Usuario
};

Categorias.belongsToMany(Productos, { through: 'categorias_productos' });

Productos.belongsToMany(Categorias, { through: 'categorias_productos' });
// Carrito.belongsTo(Usuario,{as:'owner'})
Usuario.belongsToMany(Productos, { through: Carrito });
Productos.belongsToMany(Usuario, { through: Carrito });

const ordenes = {
  OrdenCompra,
  Productos
};

OrdenCompra.belongsToMany(Productos, { through: 'orden_productos' });
Productos.belongsToMany(OrdenCompra, { through: 'orden_productos' });

module.exports = {
  modelos,
  ordenes
};

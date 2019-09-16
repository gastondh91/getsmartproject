const Productos = require('./Producto');
const Categorias = require('./Categorias');
const Carrito = require('./Carrito')
const OrdenCompra = require('./OrdenCompra');
const Usuarios = require('./Usuario').Usuarios;
const { Facebook } = require('./Facebook')

const modelos = {
  Categorias,
  Productos,
  Carrito,
  Usuarios,
  Facebook
};

Categorias.belongsToMany(Productos, { through: 'categorias_productos' });

Productos.belongsToMany(Categorias, { through: 'categorias_productos' });
// Carrito.belongsTo(Usuario,{as:'owner'})
Usuarios.belongsToMany(Productos, { through: Carrito });
Productos.belongsToMany(Usuarios, { through: Carrito });

const ordenes = {
  OrdenCompra,
  Productos
};

OrdenCompra.belongsToMany(Productos, { through: 'orden_productos' });
Productos.belongsToMany(OrdenCompra, { through: 'orden_productos' });

Facebook.belongsTo(Usuarios, { as: 'userid', constraints: false })
Usuarios.belongsTo(Facebook, { foreignKey: 'fbid', constraints: false })

module.exports = {
  modelos,
  ordenes
};

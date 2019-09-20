const Productos = require('./Producto');
const Categorias = require('./Categorias');
const Carrito = require('./Carrito')
const OrdenCompra = require('./OrdenCompra');
const Usuarios = require('./Usuario').Usuarios;
const { Facebook } = require('./Facebook')
const { Google } = require('./Google')
const Puntajes = require('./Puntajes')
const Reviews = require('./Reviews')

const modelos = {
  Categorias,
  Productos,
  Carrito,
  Usuarios,
  Facebook,
  Google,
  Puntajes,
  Reviews
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

Reviews.belongsTo(Usuarios, { constraints: false } )

Puntajes.belongsTo(Reviews, { constraints: false } )
Reviews.belongsTo(Puntajes, { constraints: false } )

OrdenCompra.belongsToMany(Productos, { through: 'orden_productos' });
Productos.belongsToMany(OrdenCompra, { through: 'orden_productos' });

Puntajes.belongsTo(Productos, { as: 'producto', constraints: false})
Productos.belongsToMany(Puntajes, { through: 'puntajes_productos'})
Puntajes.belongsTo(Usuarios, { constraints: false })


Facebook.belongsTo(Usuarios, { as: 'userid', constraints: false })
Usuarios.belongsTo(Facebook, { foreignKey: 'fbid', constraints: false })

Google.belongsTo(Usuarios, { as: 'userid', constraints: false })
Usuarios.belongsTo(Google, { foreignKey: 'googleid', constraints: false })

module.exports = {
  modelos,
  ordenes
};

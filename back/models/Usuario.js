/* eslint-disable no-unused-vars */
const S = require('sequelize');
const crypto = require('crypto');
const db = require('../config/db');

const Usuarios = db.define('usuario', {
  nombre: {
    type: S.STRING,
    allowNull: false
  },
  apellido: {
    type: S.STRING,
    allowNull: false
  },
  domicilio: {
    type: S.STRING,
    allowNull: false
  },
  genero: {
    type: S.ENUM,
    values: ['Masculino', 'Femenino', 'No especificado']
  },
  email: {
    type: S.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: S.STRING,
    allowNull: false
  },
  salt: {
    type: S.STRING
  },
  isAdmin: {
    type: S.BOOLEAN
  },
  avatar: {
    type: S.STRING
  },
  fbid:{
    type: S.DECIMAL,
    constraints: false
  },
  googleid:{
    type: S.DECIMAL,
    constraints: false
  }
}
);

// Usuario.belongsTo(OrdenCompra, { as: 'owner' });

var mayusculasNombre = (usuario) => {

  if (usuario.nombre.includes(' ') || usuario.nombre[0] === usuario.nombre[0].toLowerCase()) {
    newUsuario = usuario.nombre.split('')

    if (newUsuario[0] === newUsuario[0].toLowerCase()) newUsuario[0] = newUsuario[0].toUpperCase()

    for (i = 0; i < newUsuario.length; i++) {
      if (newUsuario[i] === ' ') newUsuario[i + 1] = newUsuario[i + 1].toUpperCase()
    }
    usuario.nombre = newUsuario.join('')

  }
}

var mayusculasApellido = (usuario) => {

  if (usuario.apellido.includes(' ') || usuario.apellido[0] === usuario.apellido[0].toLowerCase()) {
    newUsuario = usuario.apellido.split('')

    if (newUsuario[0] === newUsuario[0].toLowerCase()) newUsuario[0] = newUsuario[0].toUpperCase()

    for (i = 0; i < newUsuario.length; i++) {
      if (newUsuario[i] === ' ') newUsuario[i + 1] = newUsuario[i + 1].toUpperCase()
    }
    usuario.apellido = newUsuario.join('')

  }
}

Usuarios.addHook('beforeCreate', (usuario) => {
  usuario.salt = crypto.randomBytes(20).toString('hex');
  usuario.password = usuario.hashPassword(usuario.password);
  usuario.email = usuario.email.toLowerCase()
  mayusculasNombre(usuario)
  mayusculasApellido(usuario)
});


Usuarios.prototype.hashPassword = function (password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

Usuarios.prototype.validPassword = function (password) {
  return this.password === this.hashPassword(password);
};

module.exports = {
  Usuarios,
  db
};

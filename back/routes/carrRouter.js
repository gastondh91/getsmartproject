const express = require('express');
const router = express.Router();
const modelos = require('../models/index').modelos;
const Productos = require('../models/Producto')
const { Usuarios } = require('../models/Usuario')

router.post('/add', (req, res) => { /* CREA UN CARRITO POR USUARIO */
  modelos.Carrito.create({ cantidad: 1, usuarioId: req.body.idUsuario, productoId: req.body.idProducto })
    .then(() => {
      res.sendStatus(200)
        ;
    })
    .catch(err => console.log(err));
});

router.post('/deletecart/:id', (req, res) => { /* BORRA UN PRODUCTO DEL CARRITO */
  modelos.Carrito.destroy({ where: { productoId: req.params.id } })
    .then(() => {
      res.sendStatus(200)
        ;
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => { /* BUSCAR CARRITOS POR USUARIO Y ME TRAE UN ARREGLO */
  const userid = req.params.id;
  Usuarios.findByPk(userid, { include: [Productos] })
    .then(usuario => res.send(usuario.productos))
})

router.post('/update/:id', (req, res) => { /*  AGREGA PRODUCTOS A UN CARRITO EXISTENTE, PREVIO LO BUSCA POR ID */
    var cantidad = req.body.cantidad

    for (i in cantidad) {

      modelos.Carrito.update({ cantidad : cantidad[i] },{ where: { usuarioId: req.params.id, productoId: i } })
    }
    res.sendStatus(200)
});

module.exports = router;


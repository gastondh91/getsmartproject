const express = require('express');
const router = express.Router();
const modelos = require('../models/index').modelos;

router.post('/add', (req, res) => { /* CREA UN CARRITO POR USUARIO */
  modelos.Carrito.create({ cantidad: 1, usuarioId: req.body.idUsuario, productoId: req.body.idProducto })
    .then(carrito => {
      res.send(carrito)
      ;
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => { /* BUSCAR CARRITOS POR USUARIO Y ME TRAE UN ARREGLO */
  const userid = req.user.id;
  modelos.Carrito.findAll({
    where: { usuarioId: userid }
  })
    .then(carrito => {
      return carrito.map(e => {
        return modelos.Productos.findByPk(e.productoId);
      });
    })
    .then(carrito => {
      Promise.all(carrito)
        .then(carrito => res.send(carrito));
    });
});

router.put('/update/:id', (req, res) => { /*  AGREGA PRODUCTOS A UN CARRITO EXISTENTE, PREVIO LO BUSCA POR ID */
  modelos.Carrito.findOne({ where: { usuarioId: 2, productoId: 2 } })
    .then(carrito => {
      carrito.updateAttributes({ cantidad: carrito.cantidad + 3 });
      res.send(carrito);
    })
    .catch(err => console.log(err));
});

module.exports = router;

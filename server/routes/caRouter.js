const express = require('express');
const router = express.Router();
const Categorias = require('../models/Categorias');
const Producto = require('../models/Producto');

router.post('/add', (req, res) => {
  Categorias.create(req.body)
    .then(cat => res.json(cat))
    .catch(err => console.log(err));
});

router.get('/get', (req, res) => {
  Categorias.findAll()
    .then(categorias => res.send(categorias));
});
router.get('/marcas/:mark', (req, res) => {
  Producto.findAll({ where: { marca: req.params.mark } })
    .then(marcaProduct => res.send(marcaProduct));
});

router.get('/:id', (req, res) => {
  Producto.findByPk(req.params.id, {
    include: [Categorias]
  })
    .then(producto => res.send(producto.categorias));
});

router.post(('/borrarcat'), (req, res, next) => {
  Categorias.destroy({ where: { id: req.body.id } })
  .then(  Categorias.findAll()
  .then(categorias => res.send(categorias)))
    .catch(err => console.log(err));
});

module.exports = router
;

/* eslint-disable no-undef */
const express = require('express')
const Products = require('../models/Producto')

const router = express.Router()
const Categorias = require('../models/Categorias')
const { modelos } = require('../models/index')
const Puntaje = require('../models/Puntajes')
const Reviews = require('../models/Reviews')
const { Usuarios } = require('../models/Usuario')
const Carrito = require('../models/Carrito')
const rimraf = require('rimraf')
const Chalk = require('chalk')

router.post('/add', (req, res, next) => {
  modelos.Productos.create(req.body)
    .then((producto) => {
      producto.setCategorias(req.body.categorias)
      res.send(producto)
    })
    .catch(next)
})

router.put('/edit/:id', (req, res, next) => {
  modelos.Productos.findByPk(req.params.id, { include: [Categorias] })
    .then((producto) => producto.setCategorias(req.body.categorias))
  modelos.Productos.findByPk(req.params.id, { include: [Categorias] })
    .then((producto) => producto.update(req.body))
    .then((update) => res.send(update))
    .catch((err) => console.log(err))
})

router.get('/', (req, res) => {
  if (req.query.modelo) {
    modelos.Productos.findAll({
      where: {
        modelo: req.query.modelo,
      },
    }).then((data) => {
      res.send(data)
    })
  } else {
    Products.findAll().then((data) => {
      res.send(data)
    })
  }
})
router.get('/:id', (req, res) => {
  modelos.Productos.findByPk(req.params.id, { include: [Categorias] })
    .then((producto) => {
      res.send(producto)
    })
})

router.post('/descontar', (req, res) => {
  const { carrito } = req.body
  for (i = 0; i < carrito.length; i += 1) {
    modelos.Productos.update({ stock: carrito[i].stock - carrito[i].carrito.cantidad }, { where: { id: carrito[i].id } })
  }
  res.sendStatus(200)
})


const obj = { nombre: 'carlos', apellido: 'mamani' }


router.delete(('/:id'), (req, res) => {
  modelos.Productos.findByPk(req.params.id)
    .then((producto) => rimraf(`public/utils/Telefonos/${producto.marca}/${producto.modelo}`, () => { }))
    .then(() => {
      modelos.Productos.destroy({ where: { id: req.params.id } })
    })
    .then(() => res.sendStatus(200))
    .catch((err) => console.log(err))
})

module.exports = router

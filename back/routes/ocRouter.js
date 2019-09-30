const express = require('express');
const router = express.Router();
const OrdenCompra = require('../models/OrdenCompra');
const { Usuarios } = require('../models/Usuario')
const Productos = require('../models/Producto')


router.get('/getOrden/:id',(req,res)=>{
  OrdenCompra.findByPk(req.params.id, { include: [Productos,Usuarios]})
  .then(orden => res.send(orden))
})
router.get('/getAll',(req,res)=>{
  OrdenCompra.findAll({ include: [Productos, Usuarios] })
  .then(ordenes => res.send(ordenes))
})

router.post('/update/:id',(req,res)=>{
  console.log(req.body)
  OrdenCompra.update({ status: 'PROCESANDO', tarjeta: { brand: req.body.brand, lastnum : req.body.lastnum }},{ where: { usuarioId: req.params.id, status: 'CREADO' } })
})

router.get('/adm/:modify', (req, res) => {
  OrdenCompra.findAll()
    .then(data => res.send(data));
});

router.post(`/crear`,(req,res)=>{
  console.log(req.body.cantidades)
  OrdenCompra.create({
     datos: req.body.datos,
    status: 'CREADO',
    cantidades: req.body.cantidades,
    total: req.body.total,
  })
  .then(orden => {
    orden.setUsuario(req.body.usuario)
    orden.setProductos(req.body.productos)
    .then(()=> res.sendStatus(200))
  })
})

module.exports = router;

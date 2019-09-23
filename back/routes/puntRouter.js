const express = require('express');
const router = express.Router();
const Puntajes = require('../models/Puntajes')
const Producto = require('../models/Producto')
const { Usuarios } = require('../models/Usuario')
const Reviews = require('../models/Reviews')


router.get('/borrarPuntaje/:puntaje/:review', (req, res) => {
  Puntajes.findByPk(req.params.puntaje)
    .then(puntaje => {
      if (puntaje.reviewId) {
        Reviews.destroy({ where: { id: req.params.review } })
      }
      else console.log('No Reviews')
    })
    .then(() => Puntajes.destroy({ where: { id: req.params.puntaje } }))
    .then(() => res.sendStatus(200))
})

router.post(`/reviews`, (req, res) => {
  console.log(req.body)
  Reviews.create({ Review: req.body.Comentarios })
    .then(review => {
      var reviewId = review.id
      review.setPuntaje(req.body.PuntajeId)
        .then(() => {
          Puntajes.findByPk(req.body.PuntajeId)
            .then(puntaje => {
              puntaje.setReview(reviewId)
            })
            .then(() => res.sendStatus(200))
        })
    })
})

router.get(`/getPuntajes/:id`, (req, res) => {
  Puntajes.findAll({ where: { productoId: req.params.id }, include: [Reviews, Usuarios] })
    .then(puntajes => res.send(puntajes))
})

router.get(`/updateCalification/:prodId`, (req, res) => {
  Puntajes.findAll({ attributes: ['Puntaje'], where: { productoId: req.params.prodId } })
    .then(puntajes => puntajes = puntajes.map(arreglo => arreglo.Puntaje))
    .then(puntajes => {
      var promedio
      if (puntajes.length){
        var arrPuntajes = puntajes
        
        puntajes = puntajes.reduce((a, b) => {
          return a + b;
        }, 0);
      puntajes = puntajes / arrPuntajes.length

      promedio = puntajes
      }
      else promedio = 0
      Producto.findByPk(req.params.prodId)
        .then((producto) => {
          producto.update({ calificacion: promedio })
            .then(() => res.sendStatus(200))
        })
    })
})

router.get(`/getPuntaje/:prodId/:userId`, (req, res) => {
  Puntajes.findOne({ where: { productoId: req.params.prodId, usuarioId: req.params.userId } })
    .then(puntajes => res.send(puntajes))
})

router.post('/setPuntaje/:id', (req, res) => {
  Puntajes.create({ Puntaje: req.body.puntaje })
    .then(puntaje => {
      puntaje.setProducto(req.params.id);
      puntaje.setUsuario(req.body.userId)

      var puntajesid = puntaje.id

      Producto.findByPk(req.params.id)
        .then(producto => producto.addPuntaje(puntajesid))
        .then(() => {
          Puntajes.findAll({ attributes: ['Puntaje'], where: { productoId: req.params.id } })
            .then(puntajes => puntajes = puntajes.map(arreglo => arreglo.Puntaje))
            .then(puntajes => {
              var arrPuntajes = puntajes

              puntajes = puntajes.reduce((a, b) => {
                return a + b;
              }, 0);
              puntajes = puntajes / arrPuntajes.length

              var promedio = puntajes
              Producto.findByPk(req.params.id)
                .then((producto) => {
                  producto.update({ calificacion: promedio })
                    .then(() => res.sendStatus(200))
                })
            })
        })
    })
    .catch((err) => console.log(err))
})

module.exports = router
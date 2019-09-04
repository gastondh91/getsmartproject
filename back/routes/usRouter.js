const express = require('express');
const router = express.Router();
const { Usuario } = require('../models/Usuario');
const passport = require('passport');

router.post('/esAdm/:id', (req, res) => {
  Usuario.findByPk(req.params.id)
  .then(data => {if(data.isAdmin) { return data.update({ isAdmin: false }, { where: { isAdmin: true }})}
    else { return data.update({ isAdmin: true }, { where: { isAdmin: false }})}
  // .then(data => {
    //   return data.update({ isAdmin: true }, { where: { isAdmin: false } });
    // })
  })
  .catch(err => console.log(err))
})

router.get('/todos', (req, res) => {
  if (!req.user.dataValues.nombre) res.send(404, 'cantfindthat');
  res.send(req.user.dataValues.nombre);
});

router.post('/crea', (req, res) => {

  Usuario.create(req.body.user)
    .then(data => res.status(201).send(data));
});

router.get('/failurelogin', (req, res) => {
  res.send('cantfindthat');
});

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/user/:id', (req, res) => {
  Usuario.findByPk(req.params.id)
  .then(usuario => res.send(usuario))
});

router.get('/logOut', (req, res) => {
  req.logout();
  res.send({});
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  }
});

router.get('/all', (req, res) => {
  Usuario.findAll()
    .then(usuarios => res.send(usuarios));
});

router.delete('/:id', (req, res) => {
  Usuario.destroy({ where: { id: req.params.id } });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Usuarios } = require('../models/Usuario');
const passport = require('passport');
var rimraf = require("rimraf");

router.post('/esAdm/:id', (req, res) => {
  Usuarios.findByPk(req.params.id)
    .then(data => {
      if (data.isAdmin) { return data.update({ isAdmin: false }, { where: { isAdmin: true } , hooks: false }); }
      else { return data.update({ isAdmin: true }, { where: { isAdmin: false }, hooks : false }); }
      // .then(data => {
      //   return data.update({ isAdmin: true }, { where: { isAdmin: false } });
      // })
    })
    .catch(err => console.log(err));
});

router.post('/updSessionCount/:id',(req,res) => {
  Usuarios.findByPk(req.params.id)
  .then(option => option.increment('sessionCount'))
  .then(()=> res.sendStatus(200));
});

router.get('/todos', (req, res) => {
  if (!req.user.dataValues.nombre) res.send(404, 'cantfindthat');
  res.send(req.user.dataValues.nombre);
});

router.post('/crea', (req, res) => {

  Usuarios.create(req.body.user)
    .then(data => res.status(201).send(data));
});

router.get('/failurelogin', (req, res) => {
  res.send('cantfindthat');
});

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/user/:id', (req, res) => {
  Usuarios.findByPk(req.params.id)
    .then(usuario => res.send(usuario));
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
  Usuarios.findAll()
    .then(usuarios => res.send(usuarios));
});

router.get('/:id', (req, res) => {
  Usuarios.findByPk(req.params.id)
    .then(usuario => rimraf(`back/public/utils/Usuarios/${usuario.email}`, () => { }))
    .then(() => {
      Usuarios.destroy({ where: { id: req.params.id } })
        .then((ok) => res.sendStatus(200));
    });
});

router.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email']},));

router.get('/auth/facebook/callback',passport.authenticate('facebook'), (req,res)=>{
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
});

router.put('/edit/:id', (req, res, next) => {
  Usuarios.findByPk(req.params.id)
  // .then(usuario => console.log(usuario))
    .then(usuario => usuario.update(req.body))
    .then(update => res.send(update))
    .catch(err => console.log(err));
});


router.get('/auth/google', passport.authenticate('google',{
  scope: ['profile','email']
}));

router.get('/auth/google/callback',passport.authenticate('google'), (req,res)=>{
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
});

module.exports = router;

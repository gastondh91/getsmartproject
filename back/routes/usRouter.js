const express = require('express');
const router = express.Router();
const { Usuarios } = require('../models/Usuario');
const passport = require('passport');
var rimraf = require("rimraf");

router.post('/esAdm/:id', (req, res) => {
  Usuarios.findByPk(req.params.id)
    .then(data => {
      if (data.isAdmin) { return data.update({ isAdmin: false }, { where: { isAdmin: true } }) }
      else { return data.update({ isAdmin: true }, { where: { isAdmin: false } }) }
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
  Usuarios.findAll()
    .then(usuarios => res.send(usuarios));
});

router.delete('/:id', (req, res) => {
  Usuarios.findByPk(req.params.id)
    .then(usuario => rimraf(`back/public/utils/Usuarios/${usuario.email}`, () => { }))
    .then(() => {
      Usuarios.destroy({ where: { id: req.params.id } })
        .then((ok) => res.sendStatus(200))
    })
})

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email']}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',passport.authenticate('facebook'), (req,res)=>{
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.redirect('/')
    // if(req.user) res.redirect('/')
    // else(res.redirect('/login'))
  }
});

module.exports = router;

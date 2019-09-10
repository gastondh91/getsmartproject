const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Usuarios } = require('../models/Usuario')

const storage = multer.diskStorage({
  destination: `./back/public/utils/uploads/avatars`,
  filename: (req, file, cb) => {
    cb(null, "Avatar " + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

router.post('/upload', (req, res) => {
  console.log('rrrrrrrrrrrrrrrrreeeeeeeeeeeeeeeeeeqqqqqqqqq',req)
  upload(req, res, (err) => {

    console.log("Request file ---", req.file);//Here you get file.
    console.log('req body', req.user.id)
    /*Now do where ever you want to do*/
    Usuarios.findByPk(req.user.id )
      .then(usuario => usuario.update({avatar : `/utils/uploads/avatars/${req.file.filename}`}))
    if (!err)
      return res.sendStatus(200).end();

  })
})

module.exports = router
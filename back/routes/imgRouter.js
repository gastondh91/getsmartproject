const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Producto = require('../models/Producto');
const { Usuarios } = require('../models/Usuario')

// const accepted_extensions = ['jpg', 'png', 'gif','png','jpeg'];




router.post('/tempUpload', (req, res) => {

  var storage = multer.diskStorage({
    destination: `./back/public/temp`,
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },

  }).single("myImage");

  upload(req, res, (err) => {

console.log(req.file)

    if (!err)
      return res.send(req.file.path)

  })
})

router.post('/prodImage', (req, res) => {

  var storage = multer.diskStorage({
    destination: `./back/public/temp`,
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },

  }).array("myImage",10);

  upload(req, res, (err) => {

console.log(req.file)
Producto.findByPk(Number(req.file.originalname))
.then(producto => producto.update({ imagenes: req.file}))


    if (!err)
      return res.send(req.file.path)

  })
  .catch(err => console.log(err))
})

router.post('/upload', (req, res) => {

  var storage = multer.diskStorage({
    destination: `./back/public/utils/uploads/avatars`,
    filename: (req, file, cb) => {
      cb(null, "Avatar " + Date.now() + path.extname(file.originalname));
    }
  });

  var upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    // fileFilter: (req, file, cb) => {
    //   // if the file extension is in our accepted list
    //   if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
    //       return cb(null, true);
    //   }

    //   return cb(new Error('Only ' + accepted_extensions.join(", ") + ' files are allowed!'));
    //   }

  }).single("myImage");

  upload(req, res, (err) => {

    Usuarios.findByPk(Number(req.file.originalname))
      .then(usuario => usuario.update({ avatar: `/utils/uploads/avatars/${req.file.filename}` }))
    if (!err)
      return res.sendStatus(200).end();

  })
})

module.exports = router
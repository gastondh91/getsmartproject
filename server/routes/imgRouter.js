const express = require('express')

const router = express.Router()
const multer = require('multer')
const path = require('path')
const Producto = require('../models/Producto')
const { Usuarios } = require('../models/Usuario')

// const accepted_extensions = ['jpg', 'png', 'gif','png','jpeg'];

const ruta = []
let rutaUsuarios


router.post('/tempUpload', (req, res) => {
  const storage = multer.diskStorage({
    destination: './public/temp',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    },
  })

  const upload = multer({
    storage,
    limits: { fileSize: 1000000 },

  }).single('myImage')

  upload(req, res, (err) => {
    if (!err) return res.send(req.file.path)
  })
})


router.post('/defRutaUsuarios', (req, res) => {
  console.log('BODYYYYYYY', req.body)
  rutaUsuarios = `/utils/Usuarios/${req.body.email}`
  res.sendStatus(200)
})

router.post('/defRuta', (req, res) => {
  ruta[0] = `./public/utils/Telefonos/${req.body.marca}/${req.body.modelo}`
  ruta[1] = `/utils/Telefonos/${req.body.marca}/${req.body.modelo}/`
})

router.post('/prodImage', (req, res) => {
  const storage = multer.diskStorage({
    destination: ruta[0],
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    },
  })

  const upload = multer({
    storage,
    limits: { fileSize: 1000000 },

  }).array('myImage', 10)

  upload(req, res, (err) => {
    const singOrPlur = () => {
      if (req.files.length) return req.files[0]
      return req.file
    }

    const fileLength = () => {
      if (req.files.length) return req.files.map((elem) => ruta[1] + elem.filename)

      return [ruta[1] + req.file.filename]
    }

    Producto.findByPk(Number(singOrPlur().originalname))
      .then((producto) => producto.update({ imagenes: fileLength() }))


    if (!err) return res.send(req.files.path)
  })
  // .catch(err => console.log(err))
})


router.post('/upload', (req, res) => {
  const storage = multer.diskStorage({
    destination: `./public/${rutaUsuarios}`,
    filename: (req, file, cb) => {
      cb(null, `Avatar ${Date.now()}${path.extname(file.originalname)}`)
    },
  })

  const upload = multer({
    storage,
    limits: { fileSize: 1000000 },
    // fileFilter: (req, file, cb) => {
    //   // if the file extension is in our accepted list
    //   if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
    //       return cb(null, true);
    //   }

    //   return cb(new Error('Only ' + accepted_extensions.join(", ") + ' files are allowed!'));
    //   }

  }).single('myImage')

  upload(req, res, (err) => {
    Usuarios.findByPk(Number(req.file.originalname))
      .then((usuario) => usuario.update({ avatar: `${rutaUsuarios}/${req.file.filename}` }, { hooks: false }))
    if (!err) return res.sendStatus(200).end()
  })
})

module.exports = router

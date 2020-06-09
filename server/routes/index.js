const express = require('express');
const router = express.Router();

const usRouter = require('./usRouter');
const prRouter = require('./prRouter');
const caRouter = require('./caRouter');
const ocRouter = require('./ocRouter');
const carrRouter = require('./carrRouter');
const imgRouter = require('./imgRouter');
const puntRouter = require('./puntRouter');

router.use('/usuarios', usRouter);
router.use('/productos', prRouter);
router.use('/categorias', caRouter);
router.use('/ordencompra', ocRouter);
router.use('/carrito', carrRouter);
router.use('/imagenes', imgRouter);
router.use('/puntajes', puntRouter);

module.exports = router;

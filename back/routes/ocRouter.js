const express = require('express');
const router = express.Router();
const OrdenCompra = require('../models/OrdenCompra');

router.get('/adm/:modify', (req, res) => {
  OrdenCompra.finAll()
    .then(data => res.send(data));
});

module.exports = router;

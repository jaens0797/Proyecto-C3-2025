const express = require('express');
const router = express.Router();
const Diccionario = require('../models/diccionario.model');

// REGISTRAR TÉRMINO
// POST  http://localhost:3000/api/registrar-termino
router.post('/registrar-termino', async (req, res) => {
  try {
    let nuevo = new Diccionario({
      terminoEspanol: req.body.terminoEspanol,
      terminoLengua: req.body.terminoLengua,
      pueblo: req.body.pueblo,
      audioPronunciacion: req.body.audioPronunciacion
    });

    await nuevo.save();

    res.json({
      msj: 'Término registrado correctamente',
      termino: nuevo
    });
  } catch (error) {
    res.json({
      msj: 'No se pudo registrar el término',
      error: error
    });
  }
});

// LISTAR TODOS LOS TÉRMINOS
// GET  http://localhost:3000/api/listar-terminos
router.get('/listar-terminos', async (req, res) => {
  try {
    let lista = await Diccionario.find();
    res.json(lista);
  } catch (error) {
    res.json({
      msj: 'No se pudieron listar los términos',
      error: error
    });
  }
});

// BUSCAR TÉRMINO
// GET  http://localhost:3000/api/buscar-termino?texto=agua
router.get('/buscar-termino', async (req, res) => {
  try {
    let texto = req.query.texto || '';

    let filtro = {
      $or: [
        { terminoEspanol: { $regex: texto, $options: 'i' } },
        { terminoLengua: { $regex: texto, $options: 'i' } }
      ]
    };

    let lista = await Diccionario.find(filtro);
    res.json(lista);
  } catch (error) {
    res.json({
      msj: 'No se pudo buscar el término',
      error: error
    });
  }
});

module.exports = router;



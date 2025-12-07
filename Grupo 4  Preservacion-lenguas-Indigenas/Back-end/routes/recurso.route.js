// routes/recursoRoutes.js
const express = require('express');
const router = express.Router();
const Recurso = require('../models/Recurso');

// POST /api/registrar-recurso
router.post('/registrar-recurso', async (req, res) => {
  try {
    const recurso = new Recurso(req.body);
    const guardado = await recurso.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error('Error al registrar recurso:', error);
    res.status(400).json({ error: 'Error al registrar recurso', detalle: error.message });
  }
});

// GET /api/listar-recursos
router.get('/listar-recursos', async (req, res) => {
  try {
    const recursos = await Recurso.find().sort({ fechaRegistro: -1 });
    res.json(recursos);
  } catch (error) {
    console.error('Error al listar recursos:', error);
    res.status(500).json({ error: 'Error al listar recursos', detalle: error.message });
  }
});

// PUT /api/actualizar-recurso/:id
router.put('/actualizar-recurso/:id', async (req, res) => {
  try {
    const actualizado = await Recurso.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizado) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }
    res.json(actualizado);
  } catch (error) {
    console.error('Error al actualizar recurso:', error);
    res.status(400).json({ error: 'Error al actualizar recurso', detalle: error.message });
  }
});

// DELETE /api/eliminar-recurso/:id
router.delete('/eliminar-recurso/:id', async (req, res) => {
  try {
    const borrado = await Recurso.findByIdAndDelete(req.params.id);
    if (!borrado) {
      return res.status(404).json({ error: 'Recurso no encontrado' });
    }
    res.json({ mensaje: 'Recurso eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar recurso:', error);
    res.status(400).json({ error: 'Error al eliminar recurso', detalle: error.message });
  }
});

module.exports = router;
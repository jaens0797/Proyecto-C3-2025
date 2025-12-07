// routes/comunidad.route.js
const express = require('express');
const Comunidad = require('../models/comunidad.model');
const router = express.Router();

// ==============================================
//  POST  /api/registrar-comunidad
// ==============================================
router.post('/registrar-comunidad', async (req, res) => {
  try {
    const nuevaComunidad = new Comunidad({
      nombre:       req.body.nombre,
      pueblo:       req.body.pueblo,
      provincia:    req.body.provincia,
      canton:       req.body.canton,
      distrito:     req.body.distrito,
      estadoLengua: req.body.estadoLengua,
      descripcion:  req.body.descripcion
    });

    await nuevaComunidad.save();

    res.json({
      ok: true,
      msj: 'La comunidad se registró correctamente',
      comunidad: nuevaComunidad
    });

  } catch (error) {
    console.error('Error registrando comunidad:', error);
    res.status(500).json({
      ok: false,
      error: 'Error en el servidor al registrar la comunidad'
    });
  }
});

// ==============================================
//  GET  /api/listar-comunidades
// ==============================================
router.get('/listar-comunidades', async (req, res) => {
  try {
    const comunidades = await Comunidad.find();
    res.json(comunidades); // el front espera un array
  } catch (error) {
    console.error('Error listando comunidades:', error);
    res.status(500).json({
      ok: false,
      error: 'Error en el servidor al listar comunidades'
    });
  }
});

// ==============================================
//  PUT  /api/editar-comunidad/:id
// ==============================================
router.put('/editar-comunidad/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const datos = {
      nombre:       req.body.nombre,
      pueblo:       req.body.pueblo,
      provincia:    req.body.provincia,
      canton:       req.body.canton,
      distrito:     req.body.distrito,
      estadoLengua: req.body.estadoLengua,
      descripcion:  req.body.descripcion
    };

    await Comunidad.findByIdAndUpdate(id, datos, { new: true });

    res.json({
      ok: true,
      msj: 'La comunidad se actualizó correctamente'
    });

  } catch (error) {
    console.error('Error editando comunidad:', error);
    res.status(500).json({
      ok: false,
      error: 'Error en el servidor al editar la comunidad'
    });
  }
});

// ==============================================
//  DELETE  /api/eliminar-comunidad/:id
// ==============================================
router.delete('/eliminar-comunidad/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await Comunidad.findByIdAndDelete(id);

    res.json({
      ok: true,
      msj: 'La comunidad se eliminó correctamente'
    });

  } catch (error) {
    console.error('Error eliminando comunidad:', error);
    res.status(500).json({
      ok: false,
      error: 'Error en el servidor al eliminar la comunidad'
    });
  }
});

module.exports = router;



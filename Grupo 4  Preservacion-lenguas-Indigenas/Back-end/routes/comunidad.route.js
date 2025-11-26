const express = require('express');
const Comunidad = require('../models/comunidad.model');
const router = express.Router();

// http://localhost:3000/api/registrar-comunidad
router.post('/registrar-comunidad', async (req, res) => {
    try {
        let nuevaComunidad = new Comunidad({
            nombre: req.body.nombre,
            pueblo: req.body.pueblo,
            provincia: req.body.provincia,
            canton: req.body.canton,
            distrito: req.body.distrito,
            estadoLengua: req.body.estadoLengua,
            descripcion: req.body.descripcion
        });

        await nuevaComunidad.save();
        res.json({ msj: 'La comunidad se registró correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/listar-comunidades
router.get('/listar-comunidades', async (req, res) => {
    try {
        const comunidades = await Comunidad.find();
        res.json(comunidades);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/editar-comunidad/:id
router.put('/editar-comunidad/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datos = {
            nombre: req.body.nombre,
            pueblo: req.body.pueblo,
            provincia: req.body.provincia,
            canton: req.body.canton,
            distrito: req.body.distrito,
            estadoLengua: req.body.estadoLengua,
            descripcion: req.body.descripcion
        };

        await Comunidad.findByIdAndUpdate(id, datos, { new: true });
        res.json({ msj: 'La comunidad se actualizó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/eliminar-comunidad/:id
router.delete('/eliminar-comunidad/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Comunidad.findByIdAndDelete(id);
        res.json({ msj: 'La comunidad se eliminó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;



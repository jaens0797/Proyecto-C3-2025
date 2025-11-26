const express = require('express');
const Evento = require('../models/evento.model');
const router = express.Router();

// http://localhost:3000/api/registrar-evento
router.post('/registrar-evento', async (req, res) => {
    try {
        let nuevoEvento = new Evento({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            lugar: req.body.lugar,
            pueblo: req.body.pueblo,
            tipoEvento: req.body.tipoEvento
        });

        await nuevoEvento.save();
        res.json({ msj: 'El evento se registró correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/listar-eventos
router.get('/listar-eventos', async (req, res) => {
    try {
        const eventos = await Evento.find().sort({ fecha: 1 }); // del más cercano al más lejano
        res.json(eventos);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/editar-evento/:id
router.put('/editar-evento/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datos = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            lugar: req.body.lugar,
            pueblo: req.body.pueblo,
            tipoEvento: req.body.tipoEvento
        };

        await Evento.findByIdAndUpdate(id, datos, { new: true });
        res.json({ msj: 'El evento se actualizó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/eliminar-evento/:id
router.delete('/eliminar-evento/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Evento.findByIdAndDelete(id);
        res.json({ msj: 'El evento se eliminó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;



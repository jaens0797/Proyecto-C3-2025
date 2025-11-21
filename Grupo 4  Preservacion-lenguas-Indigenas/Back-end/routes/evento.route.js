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
        let eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/buscar-evento/:id
router.get('/buscar-evento/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let evento = await Evento.findById(id);
        res.json(evento);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/actualizar-evento/:id
router.put('/actualizar-evento/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await Evento.updateOne(
            { _id: id },
            {
                $set: {
                    titulo: req.body.titulo,
                    descripcion: req.body.descripcion,
                    fecha: req.body.fecha,
                    lugar: req.body.lugar,
                    pueblo: req.body.pueblo,
                    tipoEvento: req.body.tipoEvento
                }
            }
        );

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


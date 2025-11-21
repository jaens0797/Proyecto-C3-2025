const express = require('express');
const Recurso = require('../models/recurso.model');
const router = express.Router();

// http://localhost:3000/api/registrar-recurso
router.post('/registrar-recurso', async (req, res) => {
    try {
        let nuevoRecurso = new Recurso({
            titulo: req.body.titulo,
            tipoRecurso: req.body.tipoRecurso,
            pueblo: req.body.pueblo,
            comunidad: req.body.comunidad,
            descripcion: req.body.descripcion,
            url: req.body.url,
            narrador: req.body.narrador,
            esAnciano: req.body.esAnciano,
            validadoCulturalmente: req.body.validadoCulturalmente
        });

        await nuevoRecurso.save();
        res.json({ msj: 'El recurso se registró correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/listar-recursos
router.get('/listar-recursos', async (req, res) => {
    try {
        let recursos = await Recurso.find();
        res.json(recursos);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/buscar-recurso/:id
router.get('/buscar-recurso/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let recurso = await Recurso.findById(id);
        res.json(recurso);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/actualizar-recurso/:id
router.put('/actualizar-recurso/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await Recurso.updateOne(
            { _id: id },
            {
                $set: {
                    titulo: req.body.titulo,
                    tipoRecurso: req.body.tipoRecurso,
                    pueblo: req.body.pueblo,
                    comunidad: req.body.comunidad,
                    descripcion: req.body.descripcion,
                    url: req.body.url,
                    narrador: req.body.narrador,
                    esAnciano: req.body.esAnciano,
                    validadoCulturalmente: req.body.validadoCulturalmente
                }
            }
        );

        res.json({ msj: 'El recurso se actualizó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/eliminar-recurso/:id
router.delete('/eliminar-recurso/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Recurso.findByIdAndDelete(id);
        res.json({ msj: 'El recurso se eliminó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;


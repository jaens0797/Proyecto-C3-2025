const express = require('express');
const Diccionario = require('../models/diccionario.model');
const router = express.Router();

// http://localhost:3000/api/registrar-termino
router.post('/registrar-termino', async (req, res) => {
    try {
        let nuevoTermino = new Diccionario({
            terminoEspanol: req.body.terminoEspanol,
            terminoLengua: req.body.terminoLengua,
            pueblo: req.body.pueblo,
            audioPronunciacion: req.body.audioPronunciacion
        });

        await nuevoTermino.save();
        res.json({ msj: 'El término se registró correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/listar-terminos
router.get('/listar-terminos', async (req, res) => {
    try {
        const terminos = await Diccionario.find();
        res.json(terminos);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/buscar-termino?palabra=hola
router.get('/buscar-termino', async (req, res) => {
    try {
        const palabra = req.query.palabra;

        if (!palabra) {
            return res.json(null);
        }

        const termino = await Diccionario.findOne({ terminoEspanol: palabra });
        // puede devolver null si no existe → el front muestra "No se encontraron resultados"
        res.json(termino);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/editar-termino/:id
router.put('/editar-termino/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datos = {
            terminoEspanol: req.body.terminoEspanol,
            terminoLengua: req.body.terminoLengua,
            pueblo: req.body.pueblo,
            audioPronunciacion: req.body.audioPronunciacion
        };

        await Diccionario.findByIdAndUpdate(id, datos, { new: true });
        res.json({ msj: 'El término se actualizó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/eliminar-termino/:id
router.delete('/eliminar-termino/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Diccionario.findByIdAndDelete(id);
        res.json({ msj: 'El término se eliminó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;


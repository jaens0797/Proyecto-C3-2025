const express = require('express');
const Curso = require('../models/curso.model');
const router = express.Router();

// http://localhost:3000/api/registrar-curso
router.post('/registrar-curso', async (req, res) => {
    try {
        let nuevoCurso = new Curso({
            nombre: req.body.nombre,
            pueblo: req.body.pueblo,
            nivel: req.body.nivel,
            descripcion: req.body.descripcion,
            duracionHoras: req.body.duracionHoras,
            tieneAudio: req.body.tieneAudio,
            tieneEscritura: req.body.tieneEscritura,
            tieneEvaluaciones: req.body.tieneEvaluaciones
        });

        await nuevoCurso.save();
        res.json({ msj: 'El curso se registró correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/listar-cursos
router.get('/listar-cursos', async (req, res) => {
    try {
        const cursos = await Curso.find();
        res.json(cursos);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/editar-curso/:id
router.put('/editar-curso/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datos = {
            nombre: req.body.nombre,
            pueblo: req.body.pueblo,
            nivel: req.body.nivel,
            descripcion: req.body.descripcion,
            duracionHoras: req.body.duracionHoras,
            tieneAudio: req.body.tieneAudio,
            tieneEscritura: req.body.tieneEscritura,
            tieneEvaluaciones: req.body.tieneEvaluaciones
        };

        await Curso.findByIdAndUpdate(id, datos, { new: true });
        res.json({ msj: 'El curso se actualizó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/eliminar-curso/:id
router.delete('/eliminar-curso/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Curso.findByIdAndDelete(id);
        res.json({ msj: 'El curso se eliminó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;



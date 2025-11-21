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
        let cursos = await Curso.find();
        res.json(cursos);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/buscar-curso/:id
router.get('/buscar-curso/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let curso = await Curso.findById(id);
        res.json(curso);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/actualizar-curso/:id
router.put('/actualizar-curso/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await Curso.updateOne(
            { _id: id },
            {
                $set: {
                    nombre: req.body.nombre,
                    pueblo: req.body.pueblo,
                    nivel: req.body.nivel,
                    descripcion: req.body.descripcion,
                    duracionHoras: req.body.duracionHoras,
                    tieneAudio: req.body.tieneAudio,
                    tieneEscritura: req.body.tieneEscritura,
                    tieneEvaluaciones: req.body.tieneEvaluaciones
                }
            }
        );

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


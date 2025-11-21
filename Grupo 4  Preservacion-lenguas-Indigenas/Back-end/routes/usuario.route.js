const express = require('express');
const Usuario = require('../models/usuario.model');
const router = express.Router();

// http://localhost:3000/api/registrar-usuario
router.post('/registrar-usuario', async (req, res) => {
    try {
        let nuevoUsuario = new Usuario({
            nombre: req.body.nombre,
            correo: req.body.correo,
            rol: req.body.rol,
            contrasenna: req.body.contrasenna
        });

        await nuevoUsuario.save();
        res.json({ msj: 'El usuario se registró correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/listar-usuarios
router.get('/listar-usuarios', async (req, res) => {
    try {
        let usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/buscar-usuario/:id
router.get('/buscar-usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let usuario = await Usuario.findById(id);
        res.json(usuario);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/actualizar-usuario/:id
router.put('/actualizar-usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await Usuario.updateOne(
            { _id: id },
            {
                $set: {
                    nombre: req.body.nombre,
                    correo: req.body.correo,
                    rol: req.body.rol,
                    contrasenna: req.body.contrasenna
                }
            }
        );

        res.json({ msj: 'El usuario se actualizó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/eliminar-usuario/:id
router.delete('/eliminar-usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Usuario.findByIdAndDelete(id);
        res.json({ msj: 'El usuario se eliminó correctamente' });
    } catch (error) {
        res.json({ error });
    }
});

module.exports = router;

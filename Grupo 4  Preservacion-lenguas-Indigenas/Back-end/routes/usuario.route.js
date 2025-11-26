const express = require('express');
const Usuario = require('../models/usuario.model');
const router = express.Router();

// http://localhost:3000/api/registrar-usuario
router.post('/registrar-usuario', async (req, res) => {
    try {
        const rolesPermitidos = ['admin', 'lider', 'docente', 'publico'];

        if (!rolesPermitidos.includes(req.body.rol)) {
            return res.json({ error: 'Rol no válido' });
        }

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
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.json({ error });
    }
});

// http://localhost:3000/api/editar-usuario/:id
router.put('/editar-usuario/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const datos = {
            nombre: req.body.nombre,
            correo: req.body.correo,
            rol: req.body.rol
        };

        await Usuario.findByIdAndUpdate(id, datos, { new: true });
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


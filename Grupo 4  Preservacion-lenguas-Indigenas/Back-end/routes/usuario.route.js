// routes/usuario.route.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.model'); // ajusta la ruta si tu modelo está en otra carpeta

// ================================
// LOGIN (POST /api/login)
// ================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ejemplo muy simple, sin hash ni nada (ajusta según tu lógica real)
    const usuario = await Usuario.findOne({ correo: email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    // Aquí validarías password. De momento, solo comprobamos que venga algo:
    if (!password) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Contraseña inválida'
      });
    }

    // Si todo ok:
    res.json({
      ok: true,
      mensaje: 'Login correcto',
      usuario: {
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error('Error en /login:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error interno en login'
    });
  }
});

// ================================
// LISTAR USUARIOS (GET /api/usuarios)
// ================================
router.get('/usuarios', async (req, res) => {
  try {
    const lista = await Usuario.find();
    res.json(lista);
  } catch (error) {
    console.error('Error listando usuarios:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al listar usuarios'
    });
  }
});

// ================================
// CREAR USUARIO (POST /api/usuarios)
// ================================
router.post('/usuarios', async (req, res) => {
  try {
    const { nombre, correo, rol, password } = req.body;

    const nuevo = new Usuario({
      nombre,
      correo,
      rol,
      password   // Ojo: aquí deberías encriptar en la vida real
    });

    await nuevo.save();

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario creado',
      usuario: nuevo
    });
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al crear usuario'
    });
  }
});

// ================================
// EDITAR USUARIO (PUT /api/usuarios/:id)
// ================================
router.put('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, rol, password } = req.body;

    const cambios = { nombre, correo, rol };
    if (password && password.trim().length > 0) {
      cambios.password = password; // ideal: hash
    }

    const actualizado = await Usuario.findByIdAndUpdate(id, cambios, {
      new: true
    });

    if (!actualizado) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.json({
      ok: true,
      mensaje: 'Usuario actualizado',
      usuario: actualizado
    });
  } catch (error) {
    console.error('Error editando usuario:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al editar usuario'
    });
  }
});
// ==================================================
//  OBTENER UN USUARIO POR ID (GET /api/usuarios/:id)
// ==================================================
router.get('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.json({
      ok: true,
      usuario
    });

  } catch (error) {
    console.error('Error en GET /usuarios/:id:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error en el servidor'
    });
  }
});

// ================================
// ELIMINAR USUARIO (DELETE /api/usuarios/:id)
// ================================
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await Usuario.findByIdAndDelete(id);

    if (!eliminado) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Usuario no encontrado'
      });
    }

    res.json({
      ok: true,
      mensaje: 'Usuario eliminado',
      usuario: eliminado
    });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error al eliminar usuario'
    });
  }
});

module.exports = router;



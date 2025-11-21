const mongoose = require('mongoose');

let schemaUsuario = new mongoose.Schema({
    nombre : { type: String, required: true },
    correo : { type: String, required: true, unique: true },
    rol : { type: String, required: true },
    contrasenna : { type: String, required: true }
});

module.exports = mongoose.model('Usuario', schemaUsuario, 'usuarios');

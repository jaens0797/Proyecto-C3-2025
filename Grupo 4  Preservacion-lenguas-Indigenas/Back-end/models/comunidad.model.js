// models/comunidad.model.js
const mongoose = require('mongoose');

const comunidadSchema = new mongoose.Schema({
  nombre:         { type: String, required: true },
  pueblo:         { type: String, required: true },
  provincia:      { type: String, required: true },
  canton:         { type: String, required: true },
  distrito:       { type: String, required: true },
  estadoLengua:   { type: String, required: true },
  descripcion:    { type: String }   // opcional
});

module.exports = mongoose.model('Comunidad', comunidadSchema, 'comunidades');

// models/Recurso.js
const mongoose = require('mongoose');

const recursoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  tipoRecurso: { type: String, required: true },   // audio, video, texto, imagen
  pueblo: { type: String, required: true },
  comunidad: { type: String },
  descripcion: { type: String },
  url: { type: String, required: true },
  narrador: { type: String },
  esAnciano: { type: Boolean, default: false },
  validadoCulturalmente: { type: Boolean, default: false },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('recurso', recursoSchema);
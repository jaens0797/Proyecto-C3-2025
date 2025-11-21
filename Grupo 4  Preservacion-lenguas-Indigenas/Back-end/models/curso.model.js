const mongoose = require('mongoose');

let schemaCurso = new mongoose.Schema({
    nombre : { type: String, required: true },  // Bribri básico 1
    pueblo : { type: String, required: true },
    nivel : { type: String },                   // Inicial, Intermedio, etc.
    descripcion : { type: String },
    duracionHoras : { type: Number },
    tieneAudio : { type: Boolean, default: true },
    tieneEscritura : { type: Boolean, default: true },
    tieneEvaluaciones : { type: Boolean, default: true }
});

module.exports = mongoose.model('Curso', schemaCurso, 'cursos');

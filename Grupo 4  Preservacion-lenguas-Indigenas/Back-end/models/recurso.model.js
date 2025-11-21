const mongoose = require('mongoose');

let schemaRecurso = new mongoose.Schema({
    titulo : { type: String, required: true },
    tipoRecurso : { type: String, required: true },   // audio, video, texto
    pueblo : { type: String, required: true },
    comunidad : { type: String },
    descripcion : { type: String },
    url : { type: String, required: true },
    narrador : { type: String },
    esAnciano : { type: Boolean, default: false },
    validadoCulturalmente : { type: Boolean, default: false }
});

module.exports = mongoose.model('Recurso', schemaRecurso, 'recursos');

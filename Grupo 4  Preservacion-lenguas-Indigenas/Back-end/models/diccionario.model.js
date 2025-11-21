const mongoose = require('mongoose');

let schemaDiccionario = new mongoose.Schema({
    terminoEspanol : { type: String, required: true },
    terminoLengua : { type: String, required: true },
    pueblo : { type: String, required: true },
    audioPronunciacion : { type: String }  // URL opcional
});

module.exports = mongoose.model('Diccionario', schemaDiccionario, 'diccionario');

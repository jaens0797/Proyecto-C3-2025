const mongoose = require('mongoose');

let schemaEvento = new mongoose.Schema({
    titulo : { type: String, required: true },
    descripcion : { type: String, required: true },
    fecha : { type: Date, required: true },
    lugar : { type: String, required: true },
    pueblo : { type: String, required: true }, // Pueblo indígena asociado
    tipoEvento : { type: String }              // Festival, Ceremonia, Taller, etc.
});

module.exports = mongoose.model('Evento', schemaEvento, 'eventos');

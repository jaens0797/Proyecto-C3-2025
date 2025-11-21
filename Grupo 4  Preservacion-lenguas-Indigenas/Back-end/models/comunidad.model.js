const mongoose = require('mongoose');

let schemaComunidad = new mongoose.Schema({
    nombre : { type: String, required: true },
    pueblo : { type: String, required: true },
    provincia : { type: String, required: true },
    canton : { type: String, required: true },
    distrito : { type: String, required: true },
    estadoLengua : { type: String, required: true },
    descripcion : { type: String }
});

module.exports = mongoose.model('Comunidad', schemaComunidad, 'comunidades');

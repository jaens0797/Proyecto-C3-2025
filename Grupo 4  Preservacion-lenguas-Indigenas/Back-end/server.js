const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la BD
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Conectado a MongoDB');
})
.catch((error) => {
    console.error('❌ Error al conectar a MongoDB', error);
});

// Rutas
app.use('/api', require('./routes/usuario.route'));
app.use('/api', require('./routes/comunidad.route'));
app.use('/api', require('./routes/recurso.route'));
app.use('/api', require('./routes/curso.route'));
app.use('/api', require('./routes/diccionario.route'));
app.use('/api', require('./routes/evento.route'));

// Ruta base de prueba
app.get('/', (req, res) => {
    res.json({ msj: 'API Preservación Lenguas Indígenas funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Cargar variables de entorno (.env)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ================================
// MIDDLEWARES
// ================================
app.use(cors());                // Permite peticiones desde 127.0.0.1:5500, etc.
app.use(express.json());        // Reemplaza body-parser para JSON
app.use(express.urlencoded({    // Para formularios (si hicieras POST desde forms)
  extended: true
}));

// ================================
// CONEXIÓN A MONGODB
// ================================
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

// ================================
// RUTAS PRINCIPALES
// ================================

// Todas las rutas de la API comienzan con /api
app.use('/api', require('./routes/usuario.route'));
app.use('/api', require('./routes/comunidad.route'));
app.use('/api', require('./routes/recurso.route'));
app.use('/api', require('./routes/curso.route'));
app.use('/api', require('./routes/diccionario.route'));
app.use('/api', require('./routes/evento.route'));

// Ruta base de prueba (GET http://localhost:3000/)
app.get('/', (req, res) => {
  res.json({ msj: 'API Preservación Lenguas Indígenas funcionando' });
});

// ================================
// INICIAR SERVIDOR
// ================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});



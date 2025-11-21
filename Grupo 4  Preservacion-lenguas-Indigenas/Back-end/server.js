const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Middleware de CORS (igual estilo que el ejemplo)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, Accept, Content-Type, X-Requested-With'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Conexión a la BD
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology : true
});

//Rutas

app.use('/api', require('./routes/usuario.route'));
app.use('/api', require('./routes/comunidad.route'));
app.use('/api', require('./routes/recurso.route'));
app.use('/api', require('./routes/curso.route'));
app.use('/api', require('./routes/diccionario.route'));
app.use('/api', require('./routes/evento.route'));


//Iniciar servidor
app.listen(PORT, ()=>{
    console.log('Servidor corriendo en http://localhost:3000');
});

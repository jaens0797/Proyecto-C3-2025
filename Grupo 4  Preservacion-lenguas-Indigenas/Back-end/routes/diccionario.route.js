const express = require('express');
const Diccionario = require('../models/diccionario.model');
const router = express.Router();

//http://localhost:3000/api/registrar-termino
router.post('/registrar-termino', async (req, res)=>{
    try{
        let nuevoTermino = new Diccionario({
            terminoEspanol : req.body.terminoEspanol,
            terminoLengua : req.body.terminoLengua,
            pueblo : req.body.pueblo,
            audioPronunciacion : req.body.audioPronunciacion
        });

        await nuevoTermino.save();
        res.json({msj: "El término se registró correctamente"});
    }catch(error){
        res.json({error});
    }
});

//http://localhost:3000/api/listar-terminos
router.get('/listar-terminos', async (req, res)=>{
    try{
        let terminos = await Diccionario.find();
        res.json(terminos);
    }catch(error){
        res.json({error});
    }
});

//http://localhost:3000/api/buscar-termino/:id
router.get('/buscar-termino/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        let termino = await Diccionario.findById(id);
        res.json(termino);
    }catch(error){
        res.json({error});
    }
});

//http://localhost:3000/api/actualizar-termino/:id
router.put('/actualizar-termino/:id', async (req, res)=>{
    try{
        const id = req.params.id;

        await Diccionario.updateOne(
            {_id: id},
            {
                $set: {
                    terminoEspanol : req.body.terminoEspanol,
                    terminoLengua : req.body.terminoLengua,
                    pueblo : req.body.pueblo,
                    audioPronunciacion : req.body.audioPronunciacion
                }
            }
        );

        res.json({msj: "El término se actualizó correctamente"});
    }catch(error){
        res.json({error});
    }
});

//http://localhost:3000/api/eliminar-termino/:id
router.delete('/eliminar-termino/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        await Diccionario.findByIdAndDelete(id);
        res.json({msj: "El término se eliminó correctamente"});
    }catch(error){
        res.json({error});
    }
});

module.exports = router;

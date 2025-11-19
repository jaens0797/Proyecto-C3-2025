const express = require('express');
const Usuario = require('../models/usuario.model');
const router = express.Router();

//http://localhost:3000/api/registrar-usuario
router.post('/registrar-usuario', async (req, res)=>{
    //Toma los valores que vienen del formulario y los usa para crear un nuevo usuario
    
    try{
        let nuevoUsuario = new Usuario({
            nombre : req.body.nombre,
            correo : req.body.correo,
            contrasenna : req.body.contrasenna
        });

        await nuevoUsuario.save();
        res.json({
            msj : "El usuario fue registrado correctamente"
        });

    }catch(error){
        res.json({error});
    }
    
});

router.get('/listar-usuarios' , async(req,res)=>{
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios);
    }catch(error){
        res.json({error});
    }
});
router.get("/buscar-usuario/:correo",async(req,res)=>{
    try{
        let correo = req.params.correo;
        const usuario = await Usuario.findOne({correo:correo});

        if(!usuario){
            res.json({msj:"Usuario no ecnontrado"});
        }else{
            res.json(usuario);
        }
    }catch(error){
         res.json({error});
    }
});

router.put("/actualizar-usuario/:id", async(req,res)=>{
    try{
        const id = req.params.id;
        let datosActualizados = {
            nombre : req.body.nombre,
            correo : req.body.correo,
            contrasenna : req.body.contrasenna
        };

        await Usuario.findByIdAndUpdate(id, datosActualizados);
        res.json({msj: "Los datos se actualizaron correctamente"});

    }catch(error){
        res.json({error});
    }

});

router.delete("/eliminar-usuario/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        await Usuario.findByIdAndDelete(id);
        res.json({msj: "El usuario se eliminó correctamente"});
    }catch(error){
        res.json({error});
    }
});



module.exports = router;
const express = require('express');
const tareaSchema = require('../model/tarea');
const router = express.Router();

//crear tarea
router.post('/crearTarea', (req, res) => {

    const tareas = tareaSchema(req.body);
    tareas
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));

});


//ver tareas
router.get('/getTareas', (req, res) => {
    tareaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});



//ver uno por nombre
router.get('/tareaName/:nombre', (req, res) => {
    const { nombre } = req.params;
    tareaSchema
        .find({ "nombre": nombre })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// actualizar tarea por id
router.put('/updateTarea/:id', (req, res) => {
    const { id } = req.params;
    tareaSchema
        .findByIdAndUpdate(id, req.body, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// eliminar tarea por id
router.delete('/deleteTarea/:id', (req, res) => {
    const { id } = req.params;
    tareaSchema
        .findByIdAndDelete(id)
        .then(() => res.json({ message: "Tarea eliminada correctamente" }))
        .catch((error) => res.json({ message: error }));
});



module.exports = router;
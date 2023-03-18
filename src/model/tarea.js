const mongoose = require('mongoose');

const tareasSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Tarea', tareasSchema);
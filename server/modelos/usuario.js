const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");


let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['Admin', 'Normal'],
    message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    edad: {
        type: Number,
    },
    password: {
        type: String,
        required: [true, "La constraseña es necesaria"],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        default: "Normal",
        enum: rolesValidos,
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} ya esta registrado' });
module.exports = mongoose.model("Usuario", usuarioSchema);
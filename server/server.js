const express = require('express')
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
require('./config/config');
app.use(require('./rutas/usuario'));



// conectar = async(err, res) => {

//     await mongoose.connect(
//         "mongodb://localhost:27017/cafe", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }
//     );

// }

conectar = async(err, res) => {

    await mongoose.connect(
        "Cadena de coneccion", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

}





app.listen(process.env.PORT, () =>
    console.log(`Escuchando puerto ${process.env.PORT}`)
);
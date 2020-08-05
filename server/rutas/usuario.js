const express = require("express");
const app = express();
const Usuario = require('../modelos/usuario');
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const _ = require("underscore");

app.get("/usuario", function(req, res) {
    conectar();
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({ estado: true }, 'nombre email google img estado rol')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            } else {
                Usuario.count({ estado: true }, (err, cuantos) => {
                    return res.json({
                        ok: true,
                        usuarios,
                        cuantos,
                    });
                });
            }
        });
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/usuario", function(req, res) {
    conectar();
    let body = req.body;

    let usuarios = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol,
    });
    usuarios.save((err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        } else {
            return res.json({
                ok: true,
                usuario: resp.nombre,
            });
        }
    });

});

app.put("/usuario/:id", function(req, res) {
    conectar();
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'edad', 'rol', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        } else {
            res.status(200).json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});

app.delete("/usuario/:id", function(req, res) {
    conectar();
    let id = req.params.id;
    let body = req.body;
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        } else if (usuarioBorrado == null) {
            return res.status(400).json({
                ok: false,
                err: "Usuario no encontrado",
            });
        } else {
            res.status(200).json({
                ok: true,
                mensaje: "El usuario ha sido borrado con exito",
            });
        }
    });
})

// app.delete("/usuario/:id", function (req, res) {
//   conectar();
//   let id = req.params.id;
//   Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
//     if (err) {
//       return res.status(400).json({
//         ok: false,
//         err,
//       });
//     } else if (usuarioBorrado == null) {
//       return res.status(400).json({
//         ok: false,
//         err: "Usuario no encontrado",
//       });
//     } else {
//       res.status(200).json({
//         ok: true,
//         mensaje: "El usuario ha sido borrado con exito",
//       });
//     }
//   });
// })

module.exports = app;
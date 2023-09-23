require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuarioModel");
const { verificarToken } = require("../middlewares/authMiddleware");

const app = express();

app.post("/usuario", verificarToken, (req, res) => {
  let body = req.body;
  console.log(body);
  console.log(process.env.BCRYPT_PASSW_SALTS);

  if (body.password == null)
    return res.status(400).json({
      ok: false,
      err: "No se ingresaron los campos requeridos",
    });

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(
      body.password,
      parseInt(process.env.BCRYPT_PASSW_SALTS)
    ),
    activo: false,
  });

  usuario
    .save()
    .then((usuarioDB) => {
      return res.status(200).json({
        ok: true,
        usuario: usuarioDB,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        ok: false,
        err,
      });
    });
});

module.exports = app;

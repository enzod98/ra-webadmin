const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verificarToken } = require("../middlewares/authMiddleware");

const Usuario = require("../models/usuarioModel");

const app = express();

app.post("/login", (req, res) => {
  let body = req.body;

  if (!body.email || !body.password)
    return res.status(400).json({
      ok: false,
      error: {
        message: "Debe ingresar un correo y una contraseña",
      },
    });

  Usuario.findOne({ email: body.email })
    .then((usuarioDB) => {
      if (
        !usuarioDB ||
        !bcrypt.compareSync(body.password, usuarioDB.password)
      ) {
        return res.status(400).json({
          ok: false,
          error: {
            message: "Usuario o contraseña incorrectos",
          },
        });
      }

      if (!usuarioDB.activo)
        return res.status(400).json({
          ok: false,
          error: {
            message: "Usuario inhabilitado",
          },
        });

      let token = jwt.sign({ usuario: usuarioDB }, process.env.SEED, {
        expiresIn: parseInt(process.env.TOKEN_EXPIRATION),
      });

      return res.json({
        ok: true,
        usuario: usuarioDB,
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        ok: false,
        err,
      });
    });
});

app.post("/login/validar-token", verificarToken, (req, res) => {
  return res.status(200).json({
    ok: true,
  });
});

module.exports = app;

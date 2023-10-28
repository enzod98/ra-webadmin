const express = require("express");
const app = express();

const Contenido = require("../models/contenidoModel");

app.get("/contenido/:id", async (req, res) => {
  let contenidoId = parseInt(req.params.id);

  await Contenido.findOne({ _id: contenidoId, activo: true })
    .then((contenido) => {
      // console.log(contenido);
      if (contenido == null)
        return res.status(400).json({
          ok: false,
          err: "Contendio no disponible.",
        });

      return res.status(200).json({
        ok: true,
        contenido,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        ok: false,
      });
    });
});

module.exports = app;

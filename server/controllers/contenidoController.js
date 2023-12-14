const express = require("express");
const app = express();

const Contenido = require("../models/contenidoModel");
const Visita = require("../models/visitaModel");

app.get("/contenido/:id", async (req, res) => {
  let contenidoId = parseInt(req.params.id);

  await Contenido.findOne({ _id: contenidoId, activo: true })
    .then(async (contenido) => {
      // console.log(contenido);
      if (contenido == null)
        return res.status(400).json({
          ok: false,
          err: "Contendio no disponible.",
        });

      let visita = new Visita({
        fecha: new Date(),
        id_contenido: contenido._id,
      });
      console.log(contenido);
      await visita
        .save()
        .then((visitaDB) => {
          return res.status(200).json({
            ok: true,
            contenido,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            ok: false,
            err: "Se produjo un error al registrar la visita: " + err,
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        ok: false,
      });
    });
});

module.exports = app;

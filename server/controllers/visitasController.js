const express = require("express");
const app = express();

const Contenido = require("../models/contenidoModel");
const Visita = require("../models/visitaModel");

app.get("/visitas/get-for-reports", async (req, res) => {
  await Contenido.find()
    .then(async (contenidos) => {
      let visitas = [];
      for (const contenido of contenidos) {
        await Visita.find({ id_contenido: contenido._id }).then(
          async (visitasDB) => {
            if (visitasDB == null || visitasDB.length === 0) {
              visitas.push({
                descripcion: contenido.descripcion,
                hoy: 0,
                ayer: 0,
                semana: 0,
                mes: 0,
                anio: 0,
              });
            } else {
              const currentDate = new Date();
              const yesterday = new Date(currentDate);
              yesterday.setDate(currentDate.getDate() - 1);

              const hoy = visitasDB.filter((visita) => {
                return (
                  visita.fecha.getDate() === currentDate.getDate() &&
                  visita.fecha.getMonth() === currentDate.getMonth() &&
                  visita.fecha.getFullYear() === currentDate.getFullYear()
                );
              }).length;

              // Lógica para la semana (asumiendo que una semana comienza en domingo)
              const firstDayOfWeek =
                currentDate.getDate() - currentDate.getDay();
              const semana = visitasDB.filter((visita) => {
                const visitaDay = visita.fecha.getDate();
                return (
                  visitaDay >= firstDayOfWeek &&
                  visitaDay < firstDayOfWeek + 7 &&
                  visita.fecha.getMonth() === currentDate.getMonth() &&
                  visita.fecha.getFullYear() === currentDate.getFullYear()
                );
              }).length;

              const ayer = visitasDB.filter((visita) => {
                return (
                  visita.fecha.getDate() === yesterday.getDate() &&
                  visita.fecha.getMonth() === yesterday.getMonth() &&
                  visita.fecha.getFullYear() === yesterday.getFullYear()
                );
              }).length;

              const mes = visitasDB.filter((visita) => {
                return (
                  visita.fecha.getMonth() === currentDate.getMonth() &&
                  visita.fecha.getFullYear() === currentDate.getFullYear()
                );
              }).length;

              const anio = visitasDB.filter((visita) => {
                return visita.fecha.getFullYear() === currentDate.getFullYear();
              }).length;

              visitas.push({
                descripcion: contenido.descripcion,
                hoy,
                ayer,
                semana,
                mes,
                anio,
              });
            }
          }
        );
      }

      return res.status(200).json({
        ok: true,
        visitas,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        ok: false,
      });
    });
});

module.exports = app;

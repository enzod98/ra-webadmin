const express = require("express");
const app = express();

//      RUTAS API
app.use("/api", require("./loginController"));
app.use("/api", require("./usuarioController"));
app.use("/api", require("./contenidoController"));
app.use("/api", require("./visitasController"));

module.exports = app;

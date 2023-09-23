const express = require("express");
const app = express();

//      RUTAS API
app.use("/api", require("./UserController"));

module.exports = app;

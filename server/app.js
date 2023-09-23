//      IMPORTACIONES Y DEFINICIONES
require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

//      MIDDLEWARES: ACTIVAR SÓLO EN AMBIENTE DE DESARROLLO
// app.use(morgan('tiny'));
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//      RUTAS API
app.use(require("./controllers/index"));

// Middleware para Vue.js router modo history
const history = require("connect-history-api-fallback");
app.use(history());
app.use(express.static(path.join(__dirname, "../dist/spa")));

app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, function () {
  console.log("Peticiones en puerto" + process.env.PORT + "!");
});

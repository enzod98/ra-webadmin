//      IMPORTACIONES Y DEFINICIONES
require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const morgan = require("morgan");
const cors = require("cors");

//      MIDDLEWARES: ACTIVAR SÓLO EN AMBIENTE DE DESARROLLO
app.use(morgan("tiny"));
app.use(
  cors({
    credentials: true,
    origin: [
      "https://localhost:" + process.env.Q_PORT,
      "https://" + process.env.Q_HOSTNAME + ":" + process.env.Q_PORT,
      process.env.Q_HOSTNAME,
    ],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//      RUTAS API
app.use(require("./controllers/index"));

// Middleware para Vue.js router modo history
const history = require("connect-history-api-fallback");
app.use(history());
app.use(express.static(path.join(__dirname, "../dist/spa")));

mongoose
  .connect(process.env.URL_DB)
  .then(() => {
    console.log("Conexión exitosa a la DB");
    app.listen(process.env.PORT, function () {
      console.log("Peticiones en puerto: " + process.env.PORT + "!");
    });
  })
  .catch((err) => console.log(err));

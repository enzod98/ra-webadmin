const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let visitaSchema = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  id_contenido: {
    type: Number,
    ref: "Contenido",
    required: true,
  },
});

module.exports = mongoose.model("Visita", visitaSchema);

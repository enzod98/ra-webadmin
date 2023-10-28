const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let contenidoSchema = new Schema({
  _id: {
    type: Number,
  },
  bloque: {
    type: String,
    required: [true, "El bloque es necesario"],
  },
  nivel: {
    type: String,
    required: [true, "El nivel es necesario"],
  },
  descripcion: {
    type: String,
    required: [true, "Debe ingresar una descripción"],
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Contenido", contenidoSchema);

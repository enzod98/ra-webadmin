const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let entidadSchema = new Schema({
  id_contenido: {
    type: Number,
    ref: "Contenido",
  },
  id_entidad: {
    type: Schema.Types.ObjectId,
    ref: "Entidade",
  },
  propiedades: {
    type: Array,
  },
});

module.exports = mongoose.model("Entidade", entidadSchema);

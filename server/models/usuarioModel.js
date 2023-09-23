const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"],
  },
  password: {
    type: String,
    required: [true, "Debe ingresar una contraseña"],
  },
  activo: {
    type: Boolean,
    default: false,
  },
});

//Este método se ejecuta siempre que hacemos una llamada a JSON del esquema
//Lo modificaremos para convertir nuestro JSON en un objeto y eliminar la propiedad password del mismo
usuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  delete userObject.password;
  return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("Usuario", usuarioSchema);

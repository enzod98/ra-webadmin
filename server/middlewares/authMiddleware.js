/* VErificación de Tokens */
const jwt = require("jsonwebtoken");

let verificarToken = async (req, res, next) => {
  let token = req.cookies.userTokenSession;

  if (token == null) token = req.get("Authorization");

  await jwt.verify(token, process.env.SEED, (error, devolucion) => {
    if (error) {
      return res.status(401).json({
        ok: false,
        error: "Token no válido",
      });
    }
    next();
  });
};

module.exports = {
  verificarToken,
};

const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    try {
      if (!req.token) {
        return res.status(400).send({
          success: false,
          message: "You do not have a token",
        });
      } else {
        const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
        if (!verifyData) {
          return res.status(401).send({
            success: false,
            message: "Unauthorized request",
          });
        }
        req.userData = verifyData;
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send("Invalid Token");
    }
  },
};
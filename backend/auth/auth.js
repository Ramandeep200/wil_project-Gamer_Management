const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function verifyToken(req, res, next) {
  console.log(req.headers);
  var authheader = req.headers["authorization"];
  if (!authheader)
    return res.status(403).send({ auth: false, message: "No token provided." });
  //between the "Bearer " and the ","
  var token = authheader;

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, "test", function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything good, save to request for use in other routes
    console.log("test", decoded._id);
    req.userId = decoded._id;
    console.log("verify");
    next();
  });
}

//admin auth
function verifyAdmin(req, res, next) {
  console.log(req.headers);
  var token = req.headers["authorization"];
  console.log(token);
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, "test", function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    console.log("test", decoded.Role);
    //if admin, save to request for use in other routes
    if (decoded.Role == "Admin") {
      req.userId = decoded._id;
      next();
    } else {
      res.status(403).send({ auth: false, message: "No token provided." });
    }
  });
}

//host auth
function verifyHost(req, res, next) {
  var token = req.headers["authorization"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, "test", function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    //if host, save to request for use in other routes
    if (decoded.Role === "Host") {
      req.userId = decoded._id;
      next();
    } else {
      res.status(403).send({ auth: false, message: "No token provided." });
    }
  });
}

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyHost,
};

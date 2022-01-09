const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    const validateUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = validateUser.id;

    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = auth;

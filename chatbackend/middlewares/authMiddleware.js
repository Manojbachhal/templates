const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");

      next();
    } catch (error) {
      res.status(401).send(new Error("Not authorized, token failed"));
    }
  }

  if (!token) {
    res.status(401).send(new Error("Not authorized, token failed"));
  }
};

module.exports = { protect };

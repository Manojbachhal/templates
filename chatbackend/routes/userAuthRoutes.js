const expres = require("express");
const {
  userRegistration,
  userLogin,
  getUsers,
  searchUser,
} = require("../controllers/UserauthController");
const { protect } = require("../middlewares/authMiddleware");
const router = expres.Router();

// userAuthentication Routes

router.post("/register", async (req, res) => {
  let response = await userRegistration(req.body);
  res.status(response.statuscode).send(response.message);
});

router.post("/login", async (req, res) => {
  let response = await userLogin(req.body);

  const { statusCode, token, message, user } = response;
  res.status(statusCode).json({ token, message, user });
});

router.get("/allusers", protect, getUsers);
router.get("/", protect, searchUser);

module.exports = router;

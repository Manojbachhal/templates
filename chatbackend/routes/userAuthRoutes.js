const expres = require("express");
const {
  userRegistration,
  userLogin,
  getUsers,
  searchUser,
  editDetails,
} = require("../controllers/UserauthController");
const { protect } = require("../middlewares/authMiddleware");
const router = expres.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

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
router.post("/edit-details", protect, upload.single("file"), editDetails);

module.exports = router;

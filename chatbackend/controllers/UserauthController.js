const userModal = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal");

const isEmpty = (Array) => {
  if (Array.length == 0) {
    return true;
  }
  return false;
};

const generateToken = ({ _id, name, email }) => {
  const payload = { _id, name, email };
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const userRegistration = async ({ name, email, password }) => {
  const alreadyExisitingUser = await userModal.find({ email });

  if (isEmpty(alreadyExisitingUser)) {
    let response = await userModal.create({
      name,
      email,
      password: bcrypt.hashSync(password),
    });
    if (response) {
      return { statuscode: 201, message: "User created Successfully" };
    }
  } else {
    return { statuscode: 400, message: "User creation failed" };
  }
};

const userLogin = async ({ email, password }) => {
  try {
    let user = await userModal.findOne({ email });

    if (!user) {
      return { statusCode: 404, message: "User not found" };
    }

    if (bcrypt.compareSync(password, user.password)) {
      
      userData = await userModal.findOne({ email }).select("-password");
    
      return { statusCode: 200, token: generateToken(user), user: userData };
    } else {
      return { statusCode: 401, message: "Incorrect password" };
    }
  } catch (error) {
    return { statusCode: 500, message: "Internal Server Error" };
  }
};

// get all users

const getUsers = async (req, res) => {
  const currentuser = req.user;
  const response = await User.find({ _id: { $ne: currentuser._id } }).select(
    "-password"
  );
  res.status(200).send(response);
};

const searchUser = async (req, res) => {
  const searchQuery = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const response = await User.find({
    ...searchQuery,
    _id: { $ne: req.user._id },
  }).select("-password");
  // console.log(response);
  res.send(response);
};

const editDetails = async (req, res) => {
  console.log("first");
  const { name } = req.body;
  const image = req.file;
  const updateObject = {};
  console.log(process.env.BASEURL);
  if (name !== undefined && name !== "") {
    updateObject.name = name;
  }
  if (image !== undefined && image !== "") {
    updateObject.pic = image.filename;
  }

  let response = await User.findOneAndUpdate(
    { _id: req.user._id },
    updateObject,
    { new: true }
  ).select("-password");
  return response;
};
module.exports = {
  userRegistration,
  userLogin,
  getUsers,
  searchUser,
  editDetails,
};

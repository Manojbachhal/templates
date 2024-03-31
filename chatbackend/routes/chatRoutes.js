const express = require("express");
const Router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
} = require("../controllers/chatController");

Router.post("/", protect, accessChat);
Router.get("/", protect, fetchChats);
Router.post("/group", protect, createGroup);
Router.put("/rename-group", protect, renameGroup);
Router.put("/remove-from-group", protect, removeFromGroup);
Router.put("/add-to-group", protect, addToGroup);

module.exports = Router;

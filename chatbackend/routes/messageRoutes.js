const express = require("express");
const Router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { sendMessage, allMessage } = require("../controllers/messageController");

Router.post("/", protect, sendMessage);
Router.get("/:chatId", protect, allMessage);

module.exports = Router;

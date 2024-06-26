const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModal");
const User = require("../models/userModal");
const Chat = require("../models/chatModal");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  console.log(content, chatId);

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");

    // const chat = await Chat.findOne({ _id: chatId });
    // console.log(chatId);
    // console.log(chat);
    message = await message.populate({
      path: "chat.users",
      select: "name pic email",
    });
    // message = await User.populate(message, {
    //   path: "chat.users",
    //   select: "name pic email",
    // });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//

const allMessage = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.send(messages);
  } catch (error) {
    res.status(400).send(new Error(error.message));
  }
});
module.exports = {
  sendMessage,
  allMessage,
};

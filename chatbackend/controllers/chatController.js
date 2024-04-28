const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModal");
const User = require("../models/userModal");

// access single chat
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userid not exist");
    return res.sendStatus(400);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage", "-password");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    // res.send(isChat[0]);
    res.send({ message: "Chat already Exist" });
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// access all chats
const fetchChats = asyncHandler(async (req, res) => {
  Chat.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (result) => {
      result = await User.populate(result, {
        path: "latestMessage.sender",
        select: "name pic email",
      });

      res.status(200).send(result);
    });
  // res.send("gkdfn");
});

// genrate group chat
const createGroup = asyncHandler(async (req, res) => {
  // checking if users and group name is presend in req.body
  if (!req.body.users || !req.body.name) {
    res.send({ message: "Please fill all the details" });
  }

  // if users are less than 3 group cant be created
  const users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res.send({ message: "A group need more than 2 members" });
  }

  // pushing logged in user to group users list
  users.push(req.user);

  let existingGroup = await Chat.find({ chatName: req.body.name });
  if (existingGroup.length > 0) {
    res.send({ message: "Group already exist" });
  } else {
    try {
      const groupchat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
      });

      const fullGroupChat = await Chat.findOne({ _id: groupchat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      res.send(fullGroupChat);
    } catch (error) {
      res.status(400).send(new Error(error.message));
    }
  }
});

//

const renameGroup = asyncHandler(async (req, res) => {
  const { chatName, chatId } = req.body;
  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedGroup) {
    res.status(400).send(new Error("Group not found"));
  } else {
    res.send(updatedGroup);
  }
});

//

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, removedUser } = req.body;
  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: removedUser },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedGroup) {
    return res.status(404).send({ message: "Group chat not found" });
  } else {
    res.send(updatedGroup);
  }
});

//

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const updatedGroup = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  console.log(updatedGroup);

  if (!updatedGroup) {
    res.status(400).send(new Error("Require at least one use to add to group"));
  }

  res.send(updatedGroup);
});
module.exports = {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
};

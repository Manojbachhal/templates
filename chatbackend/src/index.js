const express = require("express");
// const { Server } = require("socket.io");
const http = require("http");

//
const userAuthRoutes = require("../routes/userAuthRoutes");
const chatRoutes = require("../routes/chatRoutes");
const messageRoutes = require("../routes/messageRoutes");
const contactRoutes = require("../routes/contactRoutes");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const User = require('../models/userModal')

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

const connectDb = require("../config/db");

// cors option
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:5173"], //  "http://localhost:80"
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use("/users", userAuthRoutes);
app.use("/api", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/contacts", contactRoutes);
app.use(express.static("public"));

// routes
app.get("/", async (req, res) => {
  res.send("working");
});

const PORT = process.env.PORT;


// server port
server.listen(PORT, async () => {
  await connectDb();
  console.log(`Listening to port http://localhost:${PORT}`);
});



io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("setup", async (userData) => {
    try {
      socket.join(userData._id);
      socket.emit("connected");
      
      await User.findByIdAndUpdate(userData._id, { lastActive: new Date().toLocaleString()});
      await User.findByIdAndUpdate(userData._id, { online: true});
    } catch (error) {}
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`user joined room No ${room}`);
  });

  socket.on('typing',(room)=>socket.in(room).emit('typing'))
  socket.on('stop typing',(room)=>socket.in(room).emit('stop typing'))


  socket.on("new message", (newMessage, users) => {
    let chat = newMessage.chat;
    if (!users) {
      return console.log("chat users not defined");
    }

    users.forEach((user) => {
      if (user._id !== newMessage.sender._id)
        socket.in(user._id).emit("message received", newMessage);
    });
  });

  socket.on('disconnected', async () => {
    const userData = socket.userData;
    if (userData) {
      try {
        await User.findByIdAndUpdate(userData._id, { lastActive: new Date().toLocaleString(), online: false });
        console.log("first")
      } catch (error) {
        console.error(error);
      }
    }
    console.log('A user disconnected');
  });
  
});

const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

//
const userAuthRoutes = require("../routes/userAuthRoutes");
const chatRoutes = require("../routes/chatRoutes");
const messageRoutes = require("../routes/messageRoutes");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const cors = require("cors");
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

// routes
app.get("/", async (req, res) => {
  res.send("working");
});

//
io.on("connection", (socket) => {
  console.log("a user connected");
});

const PORT = process.env.PORT;

// server port
server.listen(PORT, async () => {
  await connectDb();
  console.log(`Listening to port http://localhost:${PORT}`);
});

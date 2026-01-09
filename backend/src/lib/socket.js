import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// // used to store online users
// // ✅ Define handler di luar (REUSABLE)
// const handleChatMessage = (message, socket) => {
//   // Process message logic here
//   console.log(`💬 Message from ${socket.id}:`, message);

//   // Broadcast ke user lain atau simpan ke database
//   socket.broadcast.emit("newMessage", message);
// };

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // socket.on("chatMessage", (message) => {
  //   console.log(`💬 Message from ${socket.id}:`, message);
  // });

  // socket.on("chatMessage", (message) => handleChatMessage(message, socket));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };

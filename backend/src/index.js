import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// FIX CORS - allow semua origin untuk sementara
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// TEST ROUTE - tambah ini
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

server.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});

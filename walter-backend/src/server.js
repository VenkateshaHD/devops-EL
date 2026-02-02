import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import groupRoutes from "./routes/group.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // req.body

// Configure CORS to allow multiple origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://192.168.49.2:30948",
  ENV.CLIENT_URL, // fallback to environment variable
].filter(Boolean); // remove any undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // if (!origin) return callback(null, true);

    callback(null, true);
    // if (allowedOrigins.includes(origin)) {
    // } else {
    //   console.log(`CORS blocked origin: ${origin}`);
    //   callback(new Error('Not allowed by CORS'));
    // }
  },
  credentials: true
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/groups", groupRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.get("/", (req, res) => {
  console.log("server runnning")
  res.send("server running");
})

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});

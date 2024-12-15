import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js'; //middleware any request that comes to /api/auth will be redirected to authRoutes
import messageRoutes from './routes/message.route.js'; //middleware any request that comes to /api/auth will be redirected to authRoutes
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import bodyParser from 'body-parser';
import { app, server } from './lib/socket.js';

import path from 'path';


import cors from "cors";
dotenv.config();

const PORT = process.env.PORT
const __dirname = path.resolve();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Payload too large' });
  }
  res.status(500).json({ message: 'Internal Server Error' });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));

  });
}

server.listen(PORT, () => {
  console.log('Server is running on port :' + PORT);
  connectDB();
});
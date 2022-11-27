// import http, express, dotenv-defaults, mongoose, WebSocket... etc.
import mongo from "./mongo";
import wsConnect from "./wsConnect";
import express from "express";
import dotenv from "dotenv-defaults";
import mongoose from "mongoose";
import http from "http";
import websocket from "ws";
import { v4 as uuidv4 } from "uuid";
mongo.connect();
dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new websocket.Server({ server });
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connected!");
  wss.on("connection", (ws) => {
    // ws.id = uuidv4();
    // ws.box = "";
    // Define WebSocket connection logic
    ws.onmessage = wsConnect.onMessage(wss, ws);
  });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

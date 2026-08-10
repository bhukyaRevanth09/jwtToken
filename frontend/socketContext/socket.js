import { io } from "socket.io-client";

console.log("socket.js loaded");

const socket = io("http://localhost:9999");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("Connect Error:", err.message);
});

export default socket;
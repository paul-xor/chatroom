const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

//Run when client connects
io.on("connection", socket => {
  console.log("New WS Connection ...");

  //Welcome current user.
  socket.emit("message", "Welcome to ChatCord!");

  // BroadCast when a user connects
  socket.broadcast.emit("message", "A user has joined the chat.");

  //Runs when clien disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat.");
  });

  //Listen for chat message
  socket.on("chatMessage", msg => {
    io.emit("message", msg);
  });
});

const PORT = 7777 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

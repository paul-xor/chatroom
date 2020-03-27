/* jshint -W117 */
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  getRoomUsers,
  userLeave
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";

//Run when client connects
io.on("connection", socket => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    //Welcome current user.
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // BroadCast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat.`)
      );
  });

  //Listen for chat message
  socket.on("chatMessage", msg => {
    const user = getCurrentUser(socket.id);
    console.log(user.room);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
  //Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat.`)
      );
    }
  });
});

const PORT = 7777 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

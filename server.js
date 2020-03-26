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
});

const PORT = 7777 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

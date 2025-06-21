const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// Server setup
const server = http.createServer(app);
const io = new Server(server, {
 cors: {
  origin: "*",
}

});

// Real-time events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Drawing
  socket.on("draw", (data) => {
    io.to(socket.room).emit("draw", data);
  });

  // Clear
  socket.on("clear", () => {
    io.to(socket.room).emit("clear");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
// server.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


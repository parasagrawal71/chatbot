import { Server } from "socket.io";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;
const httpServer = app.listen(PORT, () => {
  console.log(`Server is now listening to ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`connection established with ID: ${socket.id}`);

  // Upon connection - only to current user
  socket.emit(
    "message",
    `Welcome to Chat App (User Id: ${socket.id.substring(0, 5)})`,
  );

  // Upon connection - to all other users
  socket.broadcast.emit(
    "message",
    `User ${socket.id.substring(0, 5)} connected`,
  );

  // capturing the activity event
  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });

  socket.on("message", (data) => {
    // console.log("message received: ", Buffer.from(data).toString());
    // socket.send(`${data}`);

    console.log("message received: ", data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });

  socket.on("disconnect", () => {
    // Upon disconnection - to all other users
    socket.broadcast.emit(
      "message",
      `User ${socket.id.substring(0, 5)} disconnected`,
    );
  });
});

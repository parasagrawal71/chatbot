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
  const userId = socket.id.substring(0, 5);
  console.log(`User ${userId} is connected`);

  // handling a user joining a room
  socket.on("user_join_room", ({ username, roomId }) => {
    console.log(`${username} has joined the room ${roomId}`);
    socket.join(roomId); // adds the current user to the room. Maybe identifies user from socket.id

    socket.to(roomId).emit("user_join_room", {
      username,
      msg: `${username} has joined the room`,
    });
  });

  // broadcast the message to everyone in the room
  socket.on("send_message", ({ roomId, ...message }) => {
    socket.to(roomId).emit("message", { ...message, type: "regular" });
  });

  // handling a user leaving a room
  socket.on("user_left_room", ({ username, roomId }) => {
    socket.to(roomId).emit("message", {
      username,
      text: `${username} has left the room`,
      type: "notif",
    });
  });

  // handling activity detection (user typing)
  socket.on("user_typing", ({ username, roomId }) => {
    socket.to(roomId).emit("user_typing", username);
  });
});

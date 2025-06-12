const { Server } = require("socket.io");
const http = require("http");

const httpServer = http.createServer();

httpServer.listen(3001);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`connection established with ID: ${socket.id}`);

  socket.on("message", (data) => {
    // console.log("message received: ", Buffer.from(data).toString());
    // socket.send(`${data}`);

    console.log("message received: ", data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
});

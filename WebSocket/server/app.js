const { WebSocketServer } = require("ws");
const http = require("http");

const httpServer = http.createServer();

httpServer.listen(3001);

const wsServer = new WebSocketServer({
  server: httpServer,
});

wsServer.on("connection", (socket) => {
  console.log(`connection established`);

  socket.on("message", (data) => {
    console.log("message received: ", Buffer.from(data).toString());

    socket.send(`${data}`);
  });
});

# Reference Videos

Build a Chat App in 1 Hour

### Part 1: Fundamentals of WebSockets & Socket.io

Reference - [https://www.youtube.com/watch?v=sws1XBrKBzM]

- WebSockets: ws for node.js and Browser Native Websocket
- Socket.io

WebSockets are pretty low-level and developing real-time applications requires an additional layer over them, like the popular npm package called Socket.io

Features of Socket.io

- Fallback to HTTP long-polling, in case the WebSocket connection cannot be established
- Automatic reconnection, in case the Websocket connect gets closed
- Acknowledgements, to send some data and expect a response from the other side
- Broadcast to all or to a subset of connected clients
- Scale up to multiple instances of the server
- Connection recovery, for short periods of disconnection

A point to remember

If you use socket.io library as the WebSocket wrapper on the server side, you will have to use socket.io on the client side as well.

This is necessary because socket.io implements a custom protocol on top of WebSocket to provide additional features like automatic reconnection, long-polling, broadcasting, cors restrictions etc.

<br />
<br />

### Part 2: React JS, Express JS & Socket.io

Reference - [https://www.youtube.com/watch?v=_IIca0mgH3U]

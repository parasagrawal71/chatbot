# Reference Videos

Build a Chat App in 1 Hour

### Part 1: Fundamentals of WebSockets & Socket.io

Reference - [https://www.youtube.com/watch?v=sws1XBrKBzM]

- WebSockets: the low-level 'ws' package for server side and the native Browser (Websocket) API
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

- working with chat rooms
- connecting to specific rooms with specific people talking about specific topics
- And more importantly, we will now be working with React JS

Features:

- When a user sends a message in a room, it needs to be broadcasted to everyone else in the room
- When a user joins a room, everyone else in the room should be notified
- When a user leaves the room, everyone else in the room should be notified
- Activity detection (eg: John is typing...)

If you're interested in making this Chat App a full-fledged, portfolio project, do feel free to add the below features such as:

- User Authentication
- User Profiles (with profile pictures, display name)
- Multi-media support (images, videos and audio messages)
- Emojis and reactions
- Message editing and deletion

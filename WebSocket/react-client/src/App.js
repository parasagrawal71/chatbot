import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import JoinChatForm from "./components/JoinChatForm/JoinChatForm";
import ChatWindow from "./components/ChatWindow/ChatWindow";

// Initialising the connection
const socket = io("http://localhost:3001");

function App() {
  const [isInRoom, setIsInRoom] = useState(false);
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket conenction has been established");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  function handleJoinRoom({ username, roomId }) {
    // adding user to the room
    socket.emit("user_join_room", { username, roomId }); // Ideally event name should be enum/constant

    // Navigate user to chat window page
    setIsInRoom(true);
  }

  return (
    <div>
      {isInRoom ? (
        <ChatWindow username={username} roomId={roomId} socket={socket} />
      ) : (
        <JoinChatForm
          username={username}
          setUsername={setUsername}
          roomId={roomId}
          setRoomId={setRoomId}
          onJoin={handleJoinRoom}
        />
      )}
    </div>
  );
}

export default App;

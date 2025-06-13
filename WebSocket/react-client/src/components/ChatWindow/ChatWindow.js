import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatWindow.module.css";
import { v4 as uuidv4 } from "uuid";
import { getFormattedTime } from "../../utils";

const ChatWindow = ({ username, roomId, socket }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const hasJoinedMessageBeenAdded = useRef(false);
  const [activityMsg, setActivityMsg] = useState("");

  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);

    // emit the activity detection to the server
    socket.emit("user_typing", { username, roomId });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    // add the message object to the messages array
    const messageId = uuidv4();
    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        username,
        text: currentMessage,
        type: "regular",
      },
    ]);

    // broadcast message to everyone else in the room
    socket.emit("send_message", {
      id: messageId,
      username,
      text: currentMessage,
      roomId,
    });

    setCurrentMessage("");
  };

  useEffect(() => {
    //receiving messages from the server
    socket.on("message", (message) => {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          ...message,
        },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    // notifying users that a user has joined
    socket.on("user_join_room", ({ username, msg }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          username,
          text: msg,
          type: "notif",
        },
      ]);
    });

    return () => {
      socket.off("user_join_room");
    };
  }, [socket]);

  useEffect(() => {
    // notifying users that the current user left
    const handleBeforeUnload = (e) => {
      socket.emit("user_left_room", { username, roomId });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username, roomId, socket]);

  useEffect(() => {
    // user typing detection

    let activityTimer;

    socket.on("user_typing", (username) => {
      setActivityMsg(`${username} is typing...`);

      // clear after 2 seconds
      if (activityTimer) clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        setActivityMsg("");
      }, 2000);
    });

    return () => {
      socket.off("user_typing");
    };
  }, [socket]);

  useEffect(() => {
    // Welcome message
    if (!hasJoinedMessageBeenAdded.current) {
      const uuid = uuidv4();
      setMessages((prev) => [
        ...prev,
        {
          id: uuid,
          type: "notif",
          text: `You have joined the room ${roomId}`,
        },
      ]);
      hasJoinedMessageBeenAdded.current = true;
    }
  }, [roomId]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h2>Room Name: {roomId}</h2>
        <p>
          Welcome, <span>{username}</span>
        </p>
      </div>
      <div className={styles.chatMessages}>
        {messages.map((message) => {
          if (message.type == "notif") {
            return (
              <div key={message.id} className={styles.notif}>
                {message.text}
              </div>
            );
          } else {
            return (
              <div
                key={message.id}
                className={`${styles.chatMessage} ${
                  message.username === username
                    ? styles.myMessage
                    : styles.otherMessage
                }`}
              >
                <div className={styles.messageText}>
                  <span className={styles.messageName}>
                    {message.username}&#x3a;
                  </span>
                  <span>{message.text}</span>
                </div>
                <div className={styles.time}>{getFormattedTime()}</div>
              </div>
            );
          }
        })}
        <div className={styles.activityText}>{activityMsg}</div>
      </div>
      <form onSubmit={handleSendMessage} className={styles.messageForm}>
        <input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={handleInputChange}
          className={styles.messageInput}
          required
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;

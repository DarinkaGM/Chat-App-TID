import React, { useContext, useEffect, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import "../styles.css";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatsContext } from "../context/ChatsContext";

const BubblesScrollable = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatsContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatsId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatsId]);

  console.log(messages);
  return (
    <div className="bubbles-scrollable">
      {messages.map((message) => (
        <ChatBubble message={message} key={message.id} />
      ))}
    </div>
  );
};

export default BubblesScrollable;
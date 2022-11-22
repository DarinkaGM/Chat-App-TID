import React, { useContext, useEffect, useRef } from "react";
import { ChatsContext } from "../context/ChatsContext"
import { AuthContext } from "../context/AuthContext"

const ChatBubble = ({ message, text }) => {
  const { userLogged } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" , block: "end", inline: "nearest" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === userLogged.uid}`}
    >
      <div className={message.senderId === userLogged.uid ? "right-bubble-wrapper" : "left-bubble-wrapper"}>
        <div className={message.senderId === userLogged.uid ? "right-bubble" : "left-bubble"}>
          <span className="messageSent">{message.text}</span>
        </div>
      </div> </div>
  );
};

ChatBubble.defaultProps = {
  text: "This is a message sent",
};

export default ChatBubble;

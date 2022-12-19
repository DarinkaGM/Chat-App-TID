import React, { useContext } from "react";
import Button from "../components/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ChatsContext } from "../context/ChatsContext";
import "../styles.css";
import "../buttons.css";

const ChatHeader = ({ onClick }) => {
  const { data } = useContext(ChatsContext);
  return (
    <header className="chat-header">
      <div className="chat-header-wrapper">
        <div onClick={onClick} className="back-btn">
          <Button
            className="fixed-btn tertiary with-icon"
            text=""
            icon={<ArrowBackIosIcon />}
          ></Button>{" "}
        </div>
        <span className="chat-header-title">
          {data.group?.name != null ?  <div>{data.group?.name}: </div> :""}
          <span className="chat-header-title-users">
          {data.user1?.displayName}{" "}
          {data.user2?.displayName}{" "}
          {data.user3?.displayName}{" "}
          {data.user4?.displayName}{" "}
          {data.user5?.displayName}{""}
          </span>
        </span>
      </div>
    </header>
  );
};

export default ChatHeader;
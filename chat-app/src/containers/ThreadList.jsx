import SingleThread from "../components/SingleThread";
import React, { useState, useContext, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import { db } from "../firebase";

const ThreadList = ({ visibility }) => {
  const [isActive, setIsActive] = useState(null);
  const [chats, setChats] = useState([]);
  const [groups, setGroups] = useState([]);

  const { userLogged } = useContext(AuthContext);
  const { dispatch } = useContext(ChatsContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", userLogged.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    const getGtoupChats = () => {
      const unsub = onSnapshot(doc(db, "groupChat", userLogged.uid), (doc) => {
        setGroups(doc.data());
      });
      return () => {
        unsub();
      };
    };
    userLogged.uid && getChats() && getGtoupChats();
  }, [userLogged.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "ANOTHER_USER", payload: u });
  };
  const handleSelectG = (u, v, w,x,y, z) => {
    console.log("two users method called");

    dispatch({ type: "TWO_USERS", payload: v, payload2: u, payload3: w, payload4: x, payload5: y, payload6: z });
  };
  const handleSelectG2 = (u, v, w,x,y, z) => {
    console.log("owner method called");
    dispatch({ type: "TWO_USER_OWNER", payload: v, payload2: u, payload3: w, payload4: x, payload5: y, payload6: z });
  };

  return (
    //create dynamic thread components
    <div className="thread-list">
      {Object.entries(chats)?.sort((a,b)=>b[1].date?.date - a[1].date?.date).map((chat) => (
        <SingleThread
          key={chat[0]}
          className={`single-thread ${isActive === chat[1] && "active"}`}
          receiver1={chat[1].messageReceiver.displayName}
          receiver2={""}
          message={chat[1]?.lastMessage?.message}
          onClick={() => {
            handleSelect(chat[1].messageReceiver);
            setIsActive(chat[1]);
            visibility && visibility();
          }}
        ></SingleThread>
      ))}
      {Object.entries(groups)?.
      sort((a,b)=>b[1].date?.date - a[1].date?.date).map((group) => (
        <SingleThread
          key={group[0]}
          className={`single-thread ${isActive === group[1] && "active"}`}
          groupName={group[1]?.groupName.name}
          receiver1={group[1]?.messageReceiver0?.displayName}
          receiver2={group[1]?.messageReceiver1?.displayName}
          receiver3={group[1]?.messageReceiver2?.displayName}
          receiver4={group[1]?.messageReceiver3?.displayName}
          receiver5={group[1]?.messageReceiver4?.displayName}
          message={group[1]?.lastMessage?.message}
          onClick={() => {
            userLogged.uid === group[1].groupOwner.uid
              ? handleSelectG2(
                  group[1].messageReceiver0,
                  group[1].messageReceiver1,
                  group[1].messageReceiver2,
                  group[1].messageReceiver3,
                  group[1].messageReceiver4,
                  group[1].groupName
                )
              : handleSelectG(
                group[1].messageReceiver0,
                group[1].messageReceiver1,
                group[1].messageReceiver2,
                group[1].messageReceiver3,
                group[1].messageReceiver4,
                  group[1].groupName
                );
            setIsActive(group[1]);
            visibility && visibility();
          }}
        ></SingleThread>
      ))}
    </div>
  );
};

export default ThreadList;
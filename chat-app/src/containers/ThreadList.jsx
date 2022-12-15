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
      const un = onSnapshot(doc(db, "groupChat", userLogged.uid), (doc) => {
        setGroups(doc.data());
      });
      return () => {
        un();
      };
    };
    userLogged.uid && getChats() && getGtoupChats();
  }, [userLogged.uid]);


  const handleSelect = (u) => {
    dispatch({ type: "ANOTHER_USER", payload: u });
  };
  const handleSelectG = (u, v, t) => {
    console.log("two users method called");

    dispatch({ type: "TWO_USERS",  payload: v, payload2: u, payload3: t});
  };
  const handleSelectG2 = (u, v, t) => {
    console.log("owner method called");
    dispatch({ type: "TWO_USER_OWNER", payload: v, payload2: u, payload3: t});
  };

  return (
    //create dynamic thread components
    <div className="thread-list">
      {Object.entries(chats)?.map((chat) => (
          <SingleThread
            key={chat[0]}
            className={`single-thread ${isActive === chat[1] && "active"}`}
            receiver1={chat[1].messageReceiver.displayName}
            receiver2={""}
            message={chat[1]?.lastMessage?.message}
            onClick={() => {
              handleSelect(chat[1].messageReceiver);
              visibility();
              setIsActive(chat[1]);
            }}
          >
          </SingleThread>
      ))}
         {Object.entries(groups)?.map((g) => (
          <SingleThread
            key={g[0]}
            className={`single-thread ${isActive === g[1] && "active"}`}
            groupName={g[1]?.groupName.name}
            receiver1={g[1]?.messageReceiver1.displayName}
            receiver2={g[1]?.messageReceiver2.displayName}
            message={g[1]?.lastMessage?.message}
            onClick={() => { (userLogged.uid === g[1].groupOwner.uid) ?
              handleSelectG2(g[1].messageReceiver0, g[1].messageReceiver1, g[1].groupName) : handleSelectG(g[1].messageReceiver0, g[1].messageReceiver1, g[1].groupName) ;
              visibility();
              setIsActive(g[1]);
            }}
          >
          </SingleThread>
      ))}

    </div>
  );
};

export default ThreadList;

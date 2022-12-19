import React, { useContext, useState } from "react";
import MessageButton from "../components/MessageButton";
import MessageInput from "../components/MessageInput";
import "../styles.css";
import "../buttons.css";
import { AuthContext } from "../context/AuthContext";
import { ChatsContext } from "../context/ChatsContext";
import { arrayUnion, updateDoc, getDoc, serverTimestamp, Timestamp, doc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";

const SendMessage = () => {
  const [text, setText] = useState("");
  const [err, setErr] = useState(false);
  const { userLogged } = useContext(AuthContext);
  const { data } = useContext(ChatsContext);

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };
  const handleSend = async () => {
    if (text != "") {
      try {
        // const res = await getDoc(doc(db, "chats", data.chatsId));
        // if (res.exists()) {
        //   console.log("exists", res);
        // } else {
        //   console.log("doesnt exist");
        // }

        await updateDoc(doc(db, "chats", data.chatsId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: userLogged.uid,
            senderName: userLogged.displayName,
            date: Timestamp.now(),
          }),
        });

        if (data.user2 == null) {
          await updateDoc(doc(db, "userChats", userLogged.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            },
            [data.chatsId + ".date"]: {
              date: serverTimestamp(),
            },
          });

          await updateDoc(doc(db, "userChats", data.user1.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            },
            [data.chatsId + ".date"]: {
              date: serverTimestamp(),
            },
          });
        } else {
          await updateDoc(doc(db, "groupChat", userLogged.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            },
            [data.chatsId + ".date"]: {
              date: serverTimestamp(),
            },
          });

          await updateDoc(doc(db, "groupChat", data.user1.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            },
            [data.chatsId + ".date"]: {
              date: serverTimestamp(),
            },
          });
          await updateDoc(doc(db, "groupChat", data.user2.uid), {
            [data.chatsId + ".lastMessage"]: {
              message: text,
            },
            [data.chatsId + ".date"]: {
              date: serverTimestamp(),
            },
          });
          if (data.user3 != ""){
            await updateDoc(doc(db, "groupChat", data.user3.uid), {
              [data.chatsId + ".lastMessage"]: {
                message: text,
              },
              [data.chatsId + ".date"]: {
                date: serverTimestamp(),
              },
            });
          }
          if (data.user4 != ""){
            await updateDoc(doc(db, "groupChat", data.user4.uid), {
              [data.chatsId + ".lastMessage"]: {
                message: text,
              },
              [data.chatsId + ".date"]: {
                date: serverTimestamp(),
              },
            });
          }
          if (data.user5 != ""){
            await updateDoc(doc(db, "groupChat", data.user5.uid), {
              [data.chatsId + ".lastMessage"]: {
                message: text,
              },
              [data.chatsId + ".date"]: {
                date: serverTimestamp(),
              },
            });
          }
        }
      } catch (err) {
        console.log("error");
      }
      setText("");
    }
  };

  return (
    <div className="send-message-wrapper">
      <MessageInput
        type="text"
        onKeyDown={handleKey}
        onChange={(event) => setText(event.target.value)}
        value={text}
      ></MessageInput>
      <MessageButton onClick={handleSend}></MessageButton>
    </div>
  );
};

export default SendMessage;
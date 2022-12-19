import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {
  const { userLogged } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatsId: "",
    user1: "",
    user2: "",
    user3: "",
    user4: "",
    user5: "",
    group: "",
    owner: "",
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "ANOTHER_USER":
        return {
          user1: action.payload,
          chatsId:
            userLogged.uid > action.payload.uid
              ? userLogged.uid + action.payload.uid
              : action.payload.uid + userLogged.uid,
        };
      case "TWO_USERS":
        return {
          user1: action.payload,
          user2: action.payload2,
          user3: action.payload3,
          user4: action.payload4,
          user5: action.payload5,
          group: action.payload6,
          chatsId: action.payload6.name.replace(/\s/g, ""),
        };

      case "TWO_USER_OWNER":
        return {
          user1: action.payload,
          user2: action.payload2,
          user3: action.payload3,
          user4: action.payload4,
          user5: action.payload5,
          group: action.payload6,
          chatsId: action.payload6.name.replace(/\s/g, ""),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatsContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
};
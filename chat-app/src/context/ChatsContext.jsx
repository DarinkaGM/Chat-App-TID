import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatsContext = createContext();

export const ChatsContextProvider = ({ children }) => {
    const { userLogged } = useContext(AuthContext);
    const INITIAL_STATE = {
      chatsId: "null",
      user1: null,
      user2: null,
      group: null,
      owner: null,
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "ANOTHER_USER":
          return {
            user1: action.payload,
            chatsId: userLogged.uid > action.payload.uid ? userLogged.uid + action.payload.uid : action.payload.uid + userLogged.uid
          };
          case "TWO_USERS":
            return {
              user1: action.payload,
              user2: action.payload2,
              group: action.payload3,
              chatsId:  action.payload2.uid < action.payload.uid ? action.payload.uid + userLogged.uid + action.payload2.uid : action.payload.uid + action.payload2.uid + userLogged.uid
            };
            
            case "TWO_USER_OWNER":
              return {
                user1: action.payload,
                user2: action.payload2,
                group: action.payload3,

                // chatsId: "vTqdfIcdhpea5NUEWzqVDfyUM1l1EaQzxRrC7rVB0VhLKFCj0IhtHEo2XznOMmvWi1VrJb8LVWmyBhqx9fj1" 
                chatsId: userLogged.uid < action.payload2.uid ? userLogged.uid + action.payload.uid + action.payload2.uid : userLogged.uid + action.payload2.uid + action.payload.uid 
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
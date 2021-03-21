import React, { createContext, useContext, useReducer } from "react";
import { v4 } from "uuid";
import styles from "./notification.module.css";
import Notification from "./Notification";

export const NotificationContext = createContext({});

const NotificationProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, { ...action.payload }];
      case "REMOVE_NOTIFICATION": {
        return state.filter((el: any) => el.id !== action.id);
      }
      default:
        return state;
    }
  }, []);
  return (
    <NotificationContext.Provider value={dispatch}>
      <div className={styles.notificationWrapper}>
        {state.map((note: any) => (
          <Notification
            dispatch={dispatch}
            key={note.id}
            message={note.message}
            header={note.header}
            id={note.id}
            type={note.type}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);
  return (props: any) => {
    // @ts-ignore
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export default NotificationProvider;

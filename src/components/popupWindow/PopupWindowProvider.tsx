import React, { createContext, useContext, useReducer, useState } from "react";
import { v4 } from "uuid";
import PopupWindow from "./PopupWindow";
import { isBlurredVar } from "../../api/client";

interface PropTypes {}

export const PopupWindowContext = createContext({});

const PopupWindowProvider: React.FC<PropTypes> = ({ children }) => {
  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case "PUSH_POPUP_WINDOW": {
        isBlurredVar(true);
        return [...state, { ...action.payload }];
      }
      case "POP_POPUP_WINDOW": {
        if (state.length <= 1) {
          isBlurredVar(false);
        }
        return [...state.slice(0, state.length - 1)];
      }

      default:
        return state;
    }
  }, []);
  return (
    <PopupWindowContext.Provider value={dispatch}>
      {state.map((popup: any) => (
        <PopupWindow
          key={popup.id}
          body={popup.body}
          header={popup.header}
          footer={popup.footer}
          dispatch={dispatch}
        />
      ))}
      {children}
    </PopupWindowContext.Provider>
  );
};

export const usePopupWindow = () => {
  const dispatch = useContext(PopupWindowContext);
  return (props: any) => {
    // @ts-ignore
    dispatch({
      type: "PUSH_POPUP_WINDOW",
      payload: {
        id: v4(),
        ...props,
      },
    });
  };
};

export default PopupWindowProvider;

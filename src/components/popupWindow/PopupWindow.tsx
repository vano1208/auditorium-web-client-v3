import React, { ReactElement, useState } from "react";
import styles from "./popupWindow.module.css";

interface PropTypes {
  header: any;
  body: any;
  footer?: any;
  dispatch: (value: any) => void;
}

const PopupWindow: React.FC<PropTypes> = ({
  header,
  body,
  dispatch,
  footer = "",
}) => {
  const [entering, setEntering] = useState(true);
  const onClose = () => {
    setEntering(false);
    setTimeout(() => {
      dispatch({
        type: "POP_POPUP_WINDOW",
      });
    }, 300);
  };
  const footerWithProps = React.Children.map(footer, (child: ReactElement) => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { dispatch: dispatch });
    }
    return child;
  });

  return (
    <div
      className={[
        styles.popupBackground,
        styles[entering ? "fade-in" : "fade-out"],
      ].join(" ")}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={[
          styles.modal,
          styles[entering ? "slide-in-top" : "slide-out-top"],
        ].join(" ")}
      >
        <div className={styles.modalHeader}>
          {header}
          <span className={styles.modalClose} onClick={onClose} />
        </div>
        <div className={styles.modalBody}>{body}</div>
        <div className={styles.modalFooter}>{footerWithProps}</div>
      </div>
    </div>
  );
};

export default PopupWindow;

import React, { useEffect, useState } from "react";
import styles from "./notification.module.css";

interface PropTypes {
  message: string;
  header: string;
  dispatch: (value: any) => void;
  id: string;
  type?: "ok" | "alert";
}

const Notification: React.FC<PropTypes> = ({
  message,
  type = "default",
  dispatch,
  id,
  header,
}) => {
  const [exit, setExit] = useState(false);
  const [opacity, setOpacity] = useState(100);
  const [intervalId, setIntervalId]: any = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setOpacity((prevState) => {
        if (prevState > 95) {
          return prevState - 0.02;
        } else if (prevState > 1) {
          return prevState - 0.5;
        } else {
          handleCloseNotification();
          return prevState;
        }
      });
    }, 10);
    setIntervalId(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalId);
    setOpacity(100);
  };

  const handleCloseNotification = () => {
    clearInterval(intervalId);
    setExit(true);
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        id: id,
      });
    }, 400);
  };

  useEffect(() => {
    if (opacity < 1) {
      handleCloseNotification();
    }
  }, [opacity]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={[styles.notification, exit ? styles.exit : ""].join(" ")}
      style={{ opacity: `${opacity / 100}` }}
    >
      <span
        className={styles.notificationClose}
        onClick={handleCloseNotification}
      />
      <p
        className={[
          type === "ok"
            ? styles.ok
            : type === "alert"
            ? styles.alert
            : styles.default
        , styles.header].join(" ")}
      >
        {header}
      </p>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default Notification;
